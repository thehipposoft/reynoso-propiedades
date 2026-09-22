// src/app/api/debug-galeria/route.ts
import { NextResponse } from 'next/server';
import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS, ODOO_FIELDS } from '@/src/lib/odoo/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));

  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'Pasá ?id=<id de la propiedad>' }, { status: 400 });
  }

  const [raw] = await odooExecute<any[]>(
    ODOO_MODELS.PROPIEDAD,
    'read',
    [[id]],
    { fields: ['x_name', ODOO_FIELDS.GALERIA] }
  );

  const lineIds: number[] = raw?.[ODOO_FIELDS.GALERIA] ?? [];

  const lineas = lineIds.length
    ? await odooExecute<any[]>(
        ODOO_MODELS.GALERIA_LINE,
        'read',
        [lineIds],
        {
          fields: ['id', ODOO_FIELDS.GALERIA_SEQUENCE, ODOO_FIELDS.GALERIA_IMAGEN],
          context: { bin_size: true },
        }
      )
    : [];

  return NextResponse.json({
    propiedad: raw?.x_name,
    cantidadLineas: lineIds.length,
    lineas, // fijate ODOO_FIELDS.GALERIA_IMAGEN: debería mostrar algo como "1.2 Mb", no `false`
  });
}