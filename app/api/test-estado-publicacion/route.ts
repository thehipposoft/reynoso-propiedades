// src/app/api/test-estado-publicacion/route.ts
import { NextResponse } from 'next/server';
import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS } from '@/src/lib/odoo/models';

export async function GET() {
  const fieldsInfo = await odooExecute<Record<string, any>>(
    ODOO_MODELS.PROPIEDAD,
    'fields_get',
    [],
    { attributes: ['string', 'selection'] }
  );

  // Filtra por label para encontrarlo sin saber el nombre técnico todavía
  const candidatos = Object.entries(fieldsInfo).filter(
    ([, def]: [string, any]) => def.string?.toLowerCase().includes('publicaci')
  );

  return NextResponse.json(candidatos);
}