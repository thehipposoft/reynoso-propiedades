import Link from "next/link";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Nosotros } from "@/src/components/Nosotros";
import { PropertyGrid } from "@/src/components/PropertyGrid";
import { getProperties } from "@/src/lib/api/properties";

const PROPIEDADES_HOME = 6;

export default async function Home() {
  const propiedades = await getProperties();

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-headline text-6xl font-extrabold tracking-tight">
            Encontrá el lugar que necesitas
          </h2>
          <p className="text-lg text-on-surface-variant">
            Propiedades seleccionadas.
          </p>
        </div>

        <PropertyGrid propiedades={propiedades} limite={PROPIEDADES_HOME} limiteMobile={3} excluirCategoria="inversion" />

        <div className="mt-12 flex">
          <Link
            href="/propiedades"
            className="rounded-full bg-verde-oscuro hover:underline hover:text-verde-oscuro duration-300 hover:bg-verde-oscuro/35 px-8 py-3 text-sm font-bold uppercase tracking-widest text-on-primary transition-all hover:shadow-xl active:scale-95"
          >
            Ver Todas
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-16 max-w-xl">
          <h2 className="mb-4 font-headline text-6xl font-extrabold tracking-tight">
            Inversión En Pozo
          </h2>
          <p className="text-lg text-on-surface-variant">
            Oportunidades de inversión en desarrollo
          </p>
        </div>

        <PropertyGrid propiedades={propiedades} soloCategoria="inversion" limiteMobile={3} />
      </section>

      <Nosotros />

      <Footer />
    </main>
  );
}
