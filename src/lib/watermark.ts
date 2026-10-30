// src/lib/watermark.ts
import 'server-only';
import sharp from 'sharp';
import { LOGO_BASE64 } from './watermark-logo';

const logoBuffer = Buffer.from(LOGO_BASE64, 'base64');

const LOGO_WIDTH_RATIO = 0.25;

// Detección: template matching (NCC) del alfa del logo sobre la zona central.
// El logo se divide en bloques y se promedia la NCC de cada uno: así un fondo
// con mucho contraste (ej. borde de una puerta) no tapa el resto del logo.
const DETECT_WIDTH = 400;
const DETECT_SCALE_MIN = 0.19;
const DETECT_SCALE_MAX = 0.31;
const DETECT_SCALE_STEP = 0.01;
const DETECT_SEARCH_RATIO = 0.08; // desplazamiento máximo desde el centro
const DETECT_STRIDE = 2;
const DETECT_TILES_X = 6;
const DETECT_TILES_Y = 3;
// Calibrado: con marca ≥ 0.66, sin marca ≤ 0.34.
const DETECT_THRESHOLD = 0.5;
const ALPHA_CHANNEL = 3;
const EPSILON = 1e-9;
const MIN_TILE_VARIANCE = 1e-6; // bloques sin logo (alfa plano) no aportan

type Tile = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  centered: Float32Array; // alfa del bloque menos su media
  variance: number;
};

type Template = {
  width: number;
  height: number;
  tiles: Tile[];
};

const buildTile = (
  alpha: Buffer,
  width: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number
): Tile => {
  const values: number[] = [];
  for (let j = y0; j < y1; j++) {
    for (let i = x0; i < x1; i++) values.push(alpha[j * width + i]);
  }
  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  const centered = Float32Array.from(values, (v) => v - mean);
  const variance = centered.reduce((acc, v) => acc + v * v, 0);

  return { x0, y0, x1, y1, centered, variance };
};

const buildTemplate = async (width: number): Promise<Template> => {
  const { data, info } = await sharp(logoBuffer)
    .resize({ width })
    .extractChannel(ALPHA_CHANNEL)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const tiles: Tile[] = [];
  for (let ty = 0; ty < DETECT_TILES_Y; ty++) {
    for (let tx = 0; tx < DETECT_TILES_X; tx++) {
      const tile = buildTile(
        data,
        info.width,
        Math.floor((tx * info.width) / DETECT_TILES_X),
        Math.floor((ty * info.height) / DETECT_TILES_Y),
        Math.floor(((tx + 1) * info.width) / DETECT_TILES_X),
        Math.floor(((ty + 1) * info.height) / DETECT_TILES_Y)
      );
      if (tile.variance > MIN_TILE_VARIANCE) tiles.push(tile);
    }
  }

  return { width: info.width, height: info.height, tiles };
};

// Templates en memoria: se generan una sola vez por proceso.
let templatesPromise: Promise<Template[]> | null = null;

const getTemplates = (): Promise<Template[]> => {
  if (!templatesPromise) {
    const widths: number[] = [];
    for (let s = DETECT_SCALE_MIN; s <= DETECT_SCALE_MAX + EPSILON; s += DETECT_SCALE_STEP) {
      widths.push(Math.round(DETECT_WIDTH * s));
    }
    templatesPromise = Promise.all(widths.map(buildTemplate));
  }
  return templatesPromise;
};

const tileScore = (
  img: Buffer,
  imgWidth: number,
  x: number,
  y: number,
  tile: Tile
): number => {
  const tileWidth = tile.x1 - tile.x0;
  const size = tileWidth * (tile.y1 - tile.y0);

  let sum = 0;
  for (let j = tile.y0; j < tile.y1; j++) {
    const row = (y + j) * imgWidth + x;
    for (let i = tile.x0; i < tile.x1; i++) sum += img[row + i];
  }
  const mean = sum / size;

  let cov = 0;
  let variance = 0;
  let k = 0;
  for (let j = tile.y0; j < tile.y1; j++) {
    const row = (y + j) * imgWidth + x;
    for (let i = tile.x0; i < tile.x1; i++) {
      const d = img[row + i] - mean;
      cov += d * tile.centered[k++];
      variance += d * d;
    }
  }

  return cov / Math.sqrt(variance * tile.variance + EPSILON);
};

const matchScore = (
  img: Buffer,
  imgWidth: number,
  x: number,
  y: number,
  t: Template
): number =>
  t.tiles.reduce((acc, tile) => acc + tileScore(img, imgWidth, x, y, tile), 0) / t.tiles.length;

export const detectWatermarkScore = async (imageBuffer: Buffer): Promise<number> => {
  const [{ data: img, info }, templates] = await Promise.all([
    sharp(imageBuffer)
      .resize({ width: DETECT_WIDTH })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true }),
    getTemplates(),
  ]);

  const { width, height } = info;
  const rangeX = Math.round(width * DETECT_SEARCH_RATIO);
  const rangeY = Math.round(height * DETECT_SEARCH_RATIO);
  let best = -1;

  for (const t of templates) {
    if (t.width > width || t.height > height) continue;

    const cx = Math.round((width - t.width) / 2);
    const cy = Math.round((height - t.height) / 2);
    const minX = Math.max(0, cx - rangeX);
    const maxX = Math.min(width - t.width, cx + rangeX);
    const minY = Math.max(0, cy - rangeY);
    const maxY = Math.min(height - t.height, cy + rangeY);

    for (let y = minY; y <= maxY; y += DETECT_STRIDE) {
      for (let x = minX; x <= maxX; x += DETECT_STRIDE) {
        best = Math.max(best, matchScore(img, width, x, y, t));
      }
    }
  }

  return best;
};

export const hasWatermark = async (imageBuffer: Buffer): Promise<boolean> =>
  (await detectWatermarkScore(imageBuffer)) >= DETECT_THRESHOLD;

export async function applyWatermark(imageBuffer: Buffer): Promise<Buffer> {
  // Imágenes subidas ya con marca: se devuelven tal cual.
  if (await hasWatermark(imageBuffer)) return imageBuffer;

  const base = sharp(imageBuffer);
  const { width = 1200, height = 800 } = await base.metadata();

  const targetLogoWidth = Math.round(width * LOGO_WIDTH_RATIO);
  const logo = await sharp(logoBuffer).resize({ width: targetLogoWidth }).toBuffer();
  const { width: logoWidth = targetLogoWidth, height: logoHeight = targetLogoWidth } =
    await sharp(logo).metadata();

  // Centrado: mismo margen a cada lado, tanto horizontal como vertical.
  const left = Math.max(Math.round((width - logoWidth) / 2), 0);
  const top = Math.max(Math.round((height - logoHeight) / 2), 0);

  return base.composite([{ input: logo, left, top }]).toBuffer();
}
