// src/lib/odoo/categories.ts
import 'server-only';
import { unstable_cache } from 'next/cache';
import { odooExecute } from './client';
import { ODOO_MODELS } from './models';
import { slugify } from '@/src/lib/slug';

export interface CategoriaPropiedad {
  label: string;
  slug: string;
}

async function fetchCategorias(): Promise<CategoriaPropiedad[]> {
  const registros = await odooExecute<any[]>(
    ODOO_MODELS.TIPO_PROPIEDAD,
    'search_read',
    [[], ['display_name']],
    { order: 'display_name asc' }
  );

  // El modelo de Odoo tiene registros duplicados (mismo tipo cargado más
  // de una vez, con distinta capitalización/espacios). Deduplicamos por
  // slug para no romper las keys de React en los selects que consumen esto.
  const porSlug = new Map<string, CategoriaPropiedad>();

  for (const r of registros) {
    if (!r.display_name) continue;
    const slug = slugify(r.display_name);
    if (!porSlug.has(slug)) {
      porSlug.set(slug, { label: r.display_name as string, slug });
    }
  }

  return Array.from(porSlug.values());
}

export const getCategoriasPropiedad = unstable_cache(fetchCategorias, ['odoo-categorias'], {
  revalidate: 3600,
  tags: ['categorias-propiedad'],
});