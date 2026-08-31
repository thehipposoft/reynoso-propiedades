import 'server-only';
import { unstable_cache } from 'next/cache';
import { odooExecute } from './client';
import {
  ODOO_MODELS,
  ODOO_FIELDS,
  estadosDisponiblesParaOperacion,
  type TipoOperacion,
} from './models';
import { slugify } from '@/src/lib/slug';
import { getAgentePorOdooId } from '@/src/lib/agentes';
import type { OdooPropiedad, OdooPropiedadFoto } from '@/src/types/OdooPropiedad';

const PROPERTY_FIELDS = [
  'id',
  'x_name',
  ODOO_FIELDS.ESTADO,
  ODOO_FIELDS.PRECIO,
  ODOO_FIELDS.MONEDA,
  ODOO_FIELDS.TIPO_PROPIEDAD,
  ODOO_FIELDS.BARRIO,
  ODOO_FIELDS.LOCALIDAD,
  ODOO_FIELDS.DOMICILIO,
  ODOO_FIELDS.AMBIENTES,
  ODOO_FIELDS.DORMITORIOS,
  ODOO_FIELDS.BANOS,
  ODOO_FIELDS.BANOS_ALT,
  ODOO_FIELDS.SUPERFICIE_CUBIERTA,
  ODOO_FIELDS.SUPERFICIE_TOTAL,
  ODOO_FIELDS.DESCRIPCION,
  ODOO_FIELDS.FOTO_PORTADA,
  ODOO_FIELDS.GALERIA,
  ODOO_FIELDS.RESPONSABLE,
  ODOO_FIELDS.ZONA,
];

export interface PropertyFilters {
  operacion?: TipoOperacion;
  categoriaSlug?: string;
  busqueda?: string;
  zonaGeografica?: string;
  moneda?: string;
  precioMin?: number;
  precioMax?: number;
}

function firstNonEmpty(...values: unknown[]): string | null {
  for (const v of values) {
    if (v !== false && v !== null && v !== undefined && v !== '') return String(v);
  }
  return null;
}

function mapMany2One(value: unknown): string | null {
  return Array.isArray(value) ? (value[1] as string) : null;
}

function buildSlug(nombre: string, id: number): string {
  return `${slugify(nombre)}-${id}`;
}

export function idFromSlug(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  return match ? Number(match[1]) : null;
}

async function fetchFotos(lineIds: number[]): Promise<OdooPropiedadFoto[]> {
  if (lineIds.length === 0) return [];

  const lineas = await odooExecute<any[]>(
    ODOO_MODELS.GALERIA_LINE,
    'read',
    [lineIds],
    { fields: ['id', 'x_name', ODOO_FIELDS.GALERIA_SEQUENCE], context: { bin_size: true } }
  );

  return lineas
    .sort((a, b) => a[ODOO_FIELDS.GALERIA_SEQUENCE] - b[ODOO_FIELDS.GALERIA_SEQUENCE])
    .map((linea) => ({
      id: linea.id,
      url: `/api/property-image/${linea.id}`,
      descripcion: linea.x_name || null,
    }));
}

function mapMany2OneId(value: unknown): number | null {
  return Array.isArray(value) ? (value[0] as number) : null;
}

function mapPropiedad(raw: any, fotos: OdooPropiedadFoto[]): OdooPropiedad {
  const responsableId = mapMany2OneId(raw[ODOO_FIELDS.RESPONSABLE]);

  return {
    id: raw.id,
    slug: buildSlug(raw.x_name, raw.id),
    nombre: raw.x_name,
    estado: raw[ODOO_FIELDS.ESTADO] || null,
    precio: raw[ODOO_FIELDS.PRECIO] ?? null,
    moneda: raw[ODOO_FIELDS.MONEDA] || null,
    tipoPropiedad: mapMany2One(raw[ODOO_FIELDS.TIPO_PROPIEDAD]),
    zona: firstNonEmpty(raw[ODOO_FIELDS.BARRIO], raw[ODOO_FIELDS.LOCALIDAD]),
    zonaGeografica: raw[ODOO_FIELDS.ZONA] || null,
    direccion: raw[ODOO_FIELDS.DOMICILIO] || null,
    ambientes: raw[ODOO_FIELDS.AMBIENTES] || null,
    dormitorios: raw[ODOO_FIELDS.DORMITORIOS] || null,
    banos: firstNonEmpty(raw[ODOO_FIELDS.BANOS], raw[ODOO_FIELDS.BANOS_ALT]),
    superficieCubierta: raw[ODOO_FIELDS.SUPERFICIE_CUBIERTA] || null,
    superficieTotal: raw[ODOO_FIELDS.SUPERFICIE_TOTAL] || null,
    descripcion: raw[ODOO_FIELDS.DESCRIPCION] || null,
    fotoPortada: raw[ODOO_FIELDS.FOTO_PORTADA] ? `/api/property-cover/${raw.id}` : null,
    fotos,
    responsableNombre: mapMany2One(raw[ODOO_FIELDS.RESPONSABLE]),
    agente: responsableId !== null ? getAgentePorOdooId(responsableId) : null,
  };
}

async function fetchProperties(filters: PropertyFilters = {}): Promise<OdooPropiedad[]> {
  const { operacion, categoriaSlug, busqueda, zonaGeografica, moneda, precioMin, precioMax } = filters;
  const estados = estadosDisponiblesParaOperacion(operacion);

  // Estado, nombre, zona, moneda y precio se filtran directo en Odoo (más eficiente).
  // Categoría se filtra después en JS — ver nota al pie de la función.
  const domain: unknown[] = [[ODOO_FIELDS.ESTADO, 'in', estados]];

  if (busqueda?.trim()) {
    domain.push(['x_name', 'ilike', busqueda.trim()]);
  }
  if (zonaGeografica) {
    domain.push([ODOO_FIELDS.ZONA, '=', zonaGeografica]);
  }
  if (moneda) {
    domain.push([ODOO_FIELDS.MONEDA, '=', moneda]);
  }
  if (precioMin !== undefined) {
    domain.push([ODOO_FIELDS.PRECIO, '>=', precioMin]);
  }
  if (precioMax !== undefined) {
    domain.push([ODOO_FIELDS.PRECIO, '<=', precioMax]);
  }

  const rawList = await odooExecute<any[]>(
    ODOO_MODELS.PROPIEDAD,
    'search_read',
    [domain, PROPERTY_FIELDS],
    { context: { bin_size: true } }
  );

  const propiedades = await Promise.all(
    rawList.map(async (raw) => {
      const lineIds: number[] = raw[ODOO_FIELDS.GALERIA] ?? [];
      const fotos = await fetchFotos(lineIds);
      return mapPropiedad(raw, fotos);
    })
  );

  // Categoría es un many2one — filtramos por su label en JS en vez de
  // resolver el id en Odoo, para no sumar otro roundtrip. Con el volumen
  // actual (~200 propiedades) el costo es despreciable.
  if (!categoriaSlug) return propiedades;

  return propiedades.filter(
    (p) => p.tipoPropiedad && slugify(p.tipoPropiedad) === categoriaSlug
  );
}

async function fetchPropertyBySlug(slug: string): Promise<OdooPropiedad | null> {
  const id = idFromSlug(slug);
  if (id === null) return null;

  const [raw] = await odooExecute<any[]>(
    ODOO_MODELS.PROPIEDAD,
    'search_read',
    [[['id', '=', id]], PROPERTY_FIELDS],
    { limit: 1, context: { bin_size: true } }
  );

  if (!raw) return null;

  const lineIds: number[] = raw[ODOO_FIELDS.GALERIA] ?? [];
  const fotos = await fetchFotos(lineIds);
  return mapPropiedad(raw, fotos);
}

export const getProperties = unstable_cache(fetchProperties, ['odoo-properties'], {
  revalidate: 3600,
  tags: ['properties'],
});

export const getPropertyBySlug = unstable_cache(fetchPropertyBySlug, ['odoo-property-by-slug'], {
  revalidate: 3600,
  tags: ['properties'],
});