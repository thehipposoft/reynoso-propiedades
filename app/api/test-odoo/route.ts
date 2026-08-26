// src/app/api/test-odoo/route.ts
import { NextResponse } from 'next/server';
import { odooExecute } from '@/src/lib/odoo/client';
import { ODOO_MODELS, ODOO_FIELDS } from '@/src/lib/odoo/models';

const DEFAULT_TEST_PROPERTY = 'Propiedad prueba - Nueva pagina web';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyName = searchParams.get('name') ?? DEFAULT_TEST_PROPERTY;

  const [testProperty] = await odooExecute<any[]>(
    ODOO_MODELS.PROPIEDAD,
    'search_read',
    [[['x_name', '=', propertyName]], ['id', 'x_name', ODOO_FIELDS.GALERIA]],
    { limit: 1 }
  );

  if (!testProperty) {
    return NextResponse.json(
      { error: `No se encontró la propiedad "${propertyName}"` },
      { status: 404 }
    );
  }

  const lineIds: number[] = testProperty[ODOO_FIELDS.GALERIA] ?? [];

  const lineas = await odooExecute<any[]>(
    ODOO_MODELS.GALERIA_LINE,
    'read',
    [lineIds],
    {
      fields: ['id', 'x_name', ODOO_FIELDS.GALERIA_SEQUENCE],
      context: { bin_size: true }, // solo para ver que hay datos, no traemos el binario acá
    }
  );

  // Ordenamos por secuencia y armamos la URL del proxy para cada foto
  const fotos = lineas
    .sort((a, b) => a[ODOO_FIELDS.GALERIA_SEQUENCE] - b[ODOO_FIELDS.GALERIA_SEQUENCE])
    .map((linea) => ({
      id: linea.id,
      descripcion: linea.x_name || null,
      url: `/api/property-image/${linea.id}`,
    }));

  return NextResponse.json({
    propertyName,
    propertyId: testProperty.id,
    fotos,
  });
}