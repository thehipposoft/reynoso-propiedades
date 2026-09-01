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
            className="flex items-center justify-center gap-2 cursor-pointer rounded-full bg-verde-oscuro px-8 py-4 font-poppins text-sm font-semibold text-white shadow-lg backdrop-blur transition-all duration-300 border uppercase border-verder-oscuro hover:-translate-y-1 hover:bg-white/90 hover:text-verde-oscuro hover:shadow-2xl active:scale-95"
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
            className="flex items-center justify-center gap-2 cursor-pointer rounded-full bg-verde-oscuro px-8 py-4 font-poppins text-sm font-semibold text-white shadow-lg backdrop-blur transition-all duration-300 border uppercase border-verder-oscuro hover:-translate-y-1 hover:bg-white/90 hover:text-verde-oscuro hover:shadow-2xl active:scale-95"
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