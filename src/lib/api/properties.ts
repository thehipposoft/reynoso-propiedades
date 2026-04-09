import type { Propiedad, PropiedadRaw } from '@/src/types/PropiedadTypes';

const API_URL =
  'https://propiedades.reynosobienesraices.com.ar/wp-json/wp/v2/estate_property?_embed&per_page=100';

const extraerClase = (clases: string[], prefijo: string): string => {
  const clase = clases.find((c) => c.startsWith(prefijo));
  return clase ? clase.slice(prefijo.length) : '';
};

const mapPropiedad = (raw: PropiedadRaw): Propiedad => ({
  id: raw.id,
  slug: raw.slug,
  estado: raw.status,
  titulo: raw.title.rendered,
  descripcion: raw.content.rendered,
  imagen_destacada: raw._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '',
  galeria_urls: raw.galeria_urls ?? [],

  propiedad_precio: raw.property_price ?? '',
  propiedad_moneda: raw.property_label_before ?? '',
  propiedad_superficie: raw.property_size ?? '0',
  propiedad_superficie_lote: raw.property_lot_size ?? '0',
  propiedad_ambientes: raw.property_rooms ?? '0',
  propiedad_dormitorios: raw.property_bedrooms ?? '0',
  propiedad_banos: raw.property_bathrooms ?? '0',
  propiedad_direccion: raw.property_address ?? '',
  propiedad_pais: raw.property_country ?? '',
  propiedad_latitud: raw.property_latitude ?? '',
  propiedad_longitud: raw.property_longitude ?? '',
  categoria: extraerClase(raw.class_list ?? [], 'property_category-'),
  tipo: extraerClase(raw.class_list ?? [], 'property_action_category-'),
});

export const getPropertyBySlug = async (slug: string): Promise<Propiedad | null> => {
  const url = `https://propiedades.reynosobienesraices.com.ar/wp-json/wp/v2/estate_property?_embed&slug=${slug}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok) return null;

  const data: PropiedadRaw[] = await res.json();
  return data[0] ? mapPropiedad(data[0]) : null;
};

export const getProperties = async (): Promise<Propiedad[]> => {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error(`Error al obtener propiedades: ${res.status}`);
  }

  const data: PropiedadRaw[] = await res.json();
  return data.map(mapPropiedad);
};

