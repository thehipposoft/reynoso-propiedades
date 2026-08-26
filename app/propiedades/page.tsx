import { getProperties, type PropertyFilters } from "@/src/lib/odoo/properties";
import { getCategoriasPropiedad } from "@/src/lib/odoo/categories";
import type { TipoOperacion } from "@/src/lib/odoo/models";
import { PropertyCard } from "@/src/components/PropertyCard";
import { FiltrosPropiedades } from "@/src/components/FiltrosPropiedades";

function parseOperacion(value?: string): TipoOperacion | undefined {
  return value === "venta" || value === "alquiler" ? value : undefined;
}

function parsePrecio(value?: string): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

interface SearchParams {
  operacion?: string;
  categoria?: string;
  q?: string;
  precioMin?: string;
  precioMax?: string;
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const filters: PropertyFilters = {
    operacion: parseOperacion(params.operacion),
    categoriaSlug: params.categoria || undefined,
    busqueda: params.q || undefined,
    precioMin: parsePrecio(params.precioMin),
    precioMax: parsePrecio(params.precioMax),
  };

  const [properties, categorias] = await Promise.all([
    getProperties(filters),
    getCategoriasPropiedad(),
  ]);

  const titulo = `Viendo ${properties.length} ${properties.length === 1 ? "propiedad" : "propiedades"}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-semibold">{titulo}</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <FiltrosPropiedades categorias={categorias} />

        <div className="flex-1">
          {properties.length === 0 ? (
            <p className="text-gray-500">No hay propiedades disponibles con estos filtros.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property.id} propiedad={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}