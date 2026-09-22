import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS, ODOO_FIELDS } from '@/src/lib/odoo/models';
import { applyWatermark } from '@/src/lib/watermark';

function detectMimeType(buffer: Buffer): string {
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return 'image/jpeg';
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'image/png';
  if (
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp';
  }
  return 'application/octet-stream';
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lineId: string }> }
) {
  const { lineId: lineIdParam } = await params;
  const lineId = Number(lineIdParam);

  if (!Number.isInteger(lineId)) {
    return new Response('ID inválido', { status: 400 });
  }

  const [line] = await odooExecute<any[]>(
    ODOO_MODELS.GALERIA_LINE,
    'read',
    [[lineId]],
    { fields: [ODOO_FIELDS.GALERIA_IMAGEN] }
  );

  const base64 = line?.[ODOO_FIELDS.GALERIA_IMAGEN];
  if (!base64) {
    return new Response('Imagen no encontrada', { status: 404 });
  }

  const original = Buffer.from(base64, 'base64');

  let output: Buffer;
  try {
    output = await applyWatermark(original);
  } catch (err) {
    console.error('Error aplicando watermark:', err);
    output = original;
  }

  return new Response(new Uint8Array(output), {
    headers: {
      'Content-Type': detectMimeType(output),
      'Cache-Control': 'public, max-age=604800, stale-while-revalidate=2592000',
    },
  });
}