import Link from "next/link";
import { Footer } from "@/src/components/Footer";
import { Hero } from "@/src/components/Hero";
import { Nosotros } from "@/src/components/Nosotros";
import { PropertyGrid } from "@/src/components/PropertyGrid";
import { getProperties } from "@/src/lib/odoo/properties";
import { getCategoriasPropiedad } from "@/src/lib/odoo/categories";
import { CATEGORIA_EN_POZO } from "@/src/lib/filtros";

const PROPIEDADES_HOME = 6;

export default async function Home() {
  const [propiedades, propiedadesEnPozo, categorias] = await Promise.all([
    getProperties(),
    getProperties({ categoriaSlug: CATEGORIA_EN_POZO }),
    getCategoriasPropiedad(),
  ]);

  return (
    <main>
      <Hero categorias={categorias} />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-5xl">
          <h2 className="mb-4 font-headline text-6xl font-extrabold tracking-tight">
            Propiedades destacadas
          </h2>
          <p className="text-lg text-on-surface-variant">
            Una selección de propiedades que creemos que pueden interesarte
          </p>
        </div>

        <PropertyGrid propiedades={propiedades} limite={PROPIEDADES_HOME} />

        <div className="mt-12 flex">
          <Link
            href="/propiedades"
            className="rounded-full bg-verde-oscuro hover:underline hover:text-title-color duration-300 hover:bg-white px-8 py-3 border border-verde-oscuro text-sm font-bold uppercase tracking-widest text-on-primary transition-all hover:shadow-xl active:scale-95"
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

        <PropertyGrid propiedades={propiedadesEnPozo} />
        <div className="mt-12 flex">
          <Link
            href={`/propiedades?categoria=${CATEGORIA_EN_POZO}`}
            className="rounded-full bg-verde-oscuro hover:underline hover:text-title-color duration-300 hover:bg-white px-8 py-3 border border-verde-oscuro text-sm font-bold uppercase tracking-widest text-on-primary transition-all hover:shadow-xl active:scale-95"
          >
            Ver proyectos
          </Link>
        </div>
      </section>

      <Nosotros />

      <Footer />
    </main>
  );
}