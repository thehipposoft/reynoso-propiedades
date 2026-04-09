import { Suspense } from "react";
// Suspense necesario porque FiltrosPropiedades usa useSearchParams()
import { Footer } from "@/src/components/Footer";
import { FiltrosPropiedades } from "@/src/components/FiltrosPropiedades";
import { PropertyGrid } from "@/src/components/PropertyGrid";
import { getProperties } from "@/src/lib/api/properties";

export const metadata = {
  title: "Propiedades | Reynoso Bienes Raíces",
  description: "Todas las propiedades disponibles.",
};

interface Props {
  searchParams: Promise<{ tipo?: string; categoria?: string }>;
}

export default async function PropiedadesPage({ searchParams }: Props) {
  const { tipo, categoria } = await searchParams;
  const todas = await getProperties();

  const propiedades = todas.filter((p) => {
    if (tipo && p.tipo !== tipo) return false;
    if (categoria && p.categoria !== categoria) return false;
    return true;
  });

  const hayFiltros = tipo || categoria;

  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-8 max-w-xl">
          <h1 className="mb-2 font-headline text-4xl font-extrabold tracking-tight">
            {hayFiltros ? "Resultados de búsqueda" : "Todas las propiedades"}
          </h1>
          <p className="text-lg text-on-surface-variant">
            {propiedades.length} {propiedades.length === 1 ? "propiedad encontrada" : "propiedades encontradas"}
            {tipo && <span> · <span className="capitalize">{tipo}</span></span>}
            {categoria && <span> · <span className="capitalize">{categoria}</span></span>}
          </p>
        </div>

        <Suspense fallback={null}>
          <FiltrosPropiedades />
        </Suspense>

        <PropertyGrid propiedades={propiedades} />
      </section>

      <Footer />
    </main>
  );
}
