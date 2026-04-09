import Image from "next/image";
import type { Propiedad } from "@/src/types/PropiedadTypes";

interface Props {
  propiedad: Propiedad;
}

const stripHtml = (html: string): string =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const PropertyCard = ({ propiedad }: Props) => {
  const imagen = propiedad.imagen_destacada || propiedad.galeria_urls[0] || "";
  const descripcion = stripHtml(propiedad.descripcion);

  const stats = [
    propiedad.propiedad_dormitorios !== "0" && `${propiedad.propiedad_dormitorios} dorm.`,
    propiedad.propiedad_banos !== "0" && `${propiedad.propiedad_banos} baños`,
    propiedad.propiedad_superficie !== "0" && `${propiedad.propiedad_superficie} m²`,
  ].filter(Boolean) as string[];

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-surface-container-lowest transition-all duration-500 hover:shadow-2xl">
      {/* Imagen */}
      <div className="relative h-72 overflow-hidden bg-surface-container">
        {imagen && (
          <Image
            src={imagen}
            alt={propiedad.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
          {propiedad.categoria}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-grow flex-col p-6">
        {propiedad.propiedad_direccion && (
          <p className="mb-2 text-xs font-bold uppercase tracking-tighter text-secondary">
            {propiedad.propiedad_direccion}
          </p>
        )}

        <h2 className="mb-3 font-headline text-2xl font-bold ">
          {propiedad.titulo}
        </h2>

        {descripcion && (
          <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
            {descripcion}
          </p>
        )}

        {stats.length > 0 && (
          <ul className="mt-4 flex gap-4 text-xs font-medium text-on-surface-variant">
            {stats.map((stat) => (
              <li key={stat}>{stat}</li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-surface-container pt-6">
          <span className={`${propiedad.categoria === "inversion" ? "hidden" : ""} text-lg font-bold text-primary`}>
            {propiedad.propiedad_moneda} {Number(propiedad.propiedad_precio).toLocaleString("es-AR")}
          </span>
          <a
            href={`/propiedades/${propiedad.slug}`}
            className="flex items-center gap-1 text-sm font-bold uppercase tracking-wider duration-300 text-primary transition-transform hover:translate-x-2 hover:text-primary-green"
          >
            Ver detalles →
          </a>
        </div>
      </div>
    </article>
  );
};
