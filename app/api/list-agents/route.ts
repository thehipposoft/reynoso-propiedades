import { NextResponse } from 'next/server';
import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS } from '@/src/lib/odoo/models';

export async function GET() {
  const usuarios = await odooExecute<any[]>(
    ODOO_MODELS.RES_USERS,
    'search_read',
    [[['active', '=', true]], ['id', 'name', 'email']],
    { order: 'name asc' }
  );

  return NextResponse.json(usuarios);
}