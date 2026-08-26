import { NextResponse } from 'next/server';
import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS, ODOO_FIELDS } from '@/src/lib/odoo/models';

export async function GET() {
  // 1. Valores posibles del selection (value técnico + label)
  const fieldsInfo = await odooExecute<Record<string, any>>(
    ODOO_MODELS.PROPIEDAD,
    'fields_get',
    [[ODOO_FIELDS.ESTADO]],
    { attributes: ['string', 'selection'] }
  );

  const selection = fieldsInfo[ODOO_FIELDS.ESTADO]?.selection ?? [];

  // 2. Cantidad de propiedades agrupadas por cada valor de Estado
  const counts = await odooExecute<any[]>(
    ODOO_MODELS.PROPIEDAD,
    'read_group',
    [[], [ODOO_FIELDS.ESTADO], [ODOO_FIELDS.ESTADO]],
    {}
  );

  return NextResponse.json({ selection, counts });
}