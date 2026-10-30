// src/lib/watermark.ts
import 'server-only';
import sharp from 'sharp';
import { LOGO_BASE64 } from './watermark-logo';

const logoBuffer = Buffer.from(LOGO_BASE64, 'base64');

const LOGO_WIDTH_RATIO = 0.25;

// Detección: template matching (NCC) del alfa del logo sobre la zona central.
const DETECT_WIDTH = 400;
const DETECT_SCALE_MIN = 0.19;
const DETECT_SCALE_MAX = 0.31;
const DETECT_SCALE_STEP = 0.01;
const DETECT_SEARCH_RATIO = 0.08; // desplazamiento máximo desde el centro
const DETECT_STRIDE = 2;
// Calibrado: con marca ≥ 0.64, sin marca ≤ 0.39.
const DETECT_THRESHOLD = 0.5;
const ALPHA_CHANNEL = 3;
const EPSILON = 1e-9;

type Template = {
  width: number;
  height: number;
  centered: Float32Array; // alfa menos su media
  variance: number;
};

const buildTemplate = async (width: number): Promise<Template> => {
  const { data, info } = await sharp(logoBuffer)
    .resize({ width })
    .extractChannel(ALPHA_CHANNEL)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const size = info.width * info.height;
  const mean = data.reduce((acc, v) => acc + v, 0) / size;
  const centered = Float32Array.from(data, (v) => v - mean);
  const variance = centered.reduce((acc, v) => acc + v * v, 0);

  return { width: info.width, height: info.height, centered, variance };
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

const matchScore = (
  img: Buffer,
  imgWidth: number,
  x: number,
  y: number,
  t: Template
): number => {
  const size = t.width * t.height;

  let sum = 0;
  for (let j = 0; j < t.height; j++) {
    const row = (y + j) * imgWidth + x;
    for (let i = 0; i < t.width; i++) sum += img[row + i];
  }
  const mean = sum / size;

  let cov = 0;
  let variance = 0;
  for (let j = 0; j < t.height; j++) {
    const row = (y + j) * imgWidth + x;
    for (let i = 0; i < t.width; i++) {
      const d = img[row + i] - mean;
      cov += d * t.centered[j * t.width + i];
      variance += d * d;
    }
  }

  return cov / Math.sqrt(variance * t.variance + EPSILON);
};

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
