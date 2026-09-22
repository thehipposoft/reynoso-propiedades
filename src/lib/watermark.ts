// src/lib/watermark.ts
import 'server-only';
import sharp from 'sharp';
import { LOGO_BASE64 } from './watermark-logo';

const logoBuffer = Buffer.from(LOGO_BASE64, 'base64');

export async function applyWatermark(imageBuffer: Buffer): Promise<Buffer> {
  const base = sharp(imageBuffer);
  const { width = 1200, height = 800 } = await base.metadata();

  const targetLogoWidth = Math.round(width * 0.25);
  const logo = await sharp(logoBuffer).resize({ width: targetLogoWidth }).toBuffer();
  const { width: logoWidth = targetLogoWidth, height: logoHeight = targetLogoWidth } =
    await sharp(logo).metadata();

  // Centrado: mismo margen a cada lado, tanto horizontal como vertical.
  const left = Math.max(Math.round((width - logoWidth) / 2), 0);
  const top = Math.max(Math.round((height - logoHeight) / 2), 0);

  return base.composite([{ input: logo, left, top }]).toBuffer();
}