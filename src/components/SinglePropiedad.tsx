import Link from "next/link";
import type { Propiedad } from "@/src/types/PropiedadTypes";
import { GaleriaPropiedad } from "./GaleriaPropiedad";

interface Props {
  propiedad: Propiedad;
}

const LABEL: Record<string, string> = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  quinta: "Quinta",
  inversion: "Inversión",
  venta: "Venta",
  alquiler: "Alquiler",
};

const capitalize = (s: string) => LABEL[s] ?? s.charAt(0).toUpperCase() + s.slice(1);

interface StatProps { label: string; value: string }
const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col gap-1 rounded-2xl bg-surface-container-low px-5 py-4">
    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</span>
    <span className="text-lg font-bold text-on-surface">{value}</span>
  </div>
);

export const SinglePropiedad = ({ propiedad }: Props) => {
  const todasLasImagenes = [
    propiedad.imagen_destacada,
    ...propiedad.galeria_urls,
  ].filter(Boolean);

  const stats: StatProps[] = [
    propiedad.propiedad_ambientes !== "0" && { label: "Ambientes", value: propiedad.propiedad_ambientes },
    propiedad.propiedad_dormitorios !== "0" && { label: "Dormitorios", value: propiedad.propiedad_dormitorios },
    propiedad.propiedad_banos !== "0" && { label: "Baños", value: propiedad.propiedad_banos },
    propiedad.propiedad_superficie !== "0" && { label: "Superficie", value: `${propiedad.propiedad_superficie} m²` },
    propiedad.propiedad_superficie_lote !== "0" && { label: "Sup. lote", value: `${propiedad.propiedad_superficie_lote} m²` },
  ].filter(Boolean) as StatProps[];

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">

      {/* Volver */}
      <Link
        href="/propiedades"
        className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary-green"
      >
        ← Volver a propiedades
      </Link>

      {/* 1. Categoria + Tipo */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {propiedad.categoria && (
          <span className="rounded-full bg-primary-green/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-verde-oscuro">
            {capitalize(propiedad.categoria)}
          </span>
        )}
        {propiedad.tipo && (
          <span className="rounded-full bg-surface-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            {capitalize(propiedad.tipo)}
          </span>
        )}
      </div>

      {/* 2. Título + Precio */}
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
          {propiedad.titulo}
        </h1>
        {propiedad.categoria !== "inversion" && propiedad.propiedad_precio && (
          <p className="shrink-0 font-headline text-3xl font-extrabold text-verde-oscuro">
            {propiedad.propiedad_moneda}{" "}
            {Number(propiedad.propiedad_precio).toLocaleString("es-AR")}
          </p>
        )}
      </div>

      {/* 3. Galería */}
      <GaleriaPropiedad imagenes={todasLasImagenes} titulo={propiedad.titulo} />

      {/* 4. Stats */}
      {stats.length > 0 && (
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      )}

      {/* 5. Descripción */}
      {propiedad.descripcion && (
        <div
          className="prose prose-lg max-w-none text-on-surface-variant"
          dangerouslySetInnerHTML={{ __html: propiedad.descripcion }}
        />
      )}

      {/* 6. Dirección */}
      {propiedad.propiedad_direccion && (
        <div className="mt-10 flex items-start gap-3 rounded-2xl bg-surface-container-low p-5">
          <span className="mt-0.5 text-verde-oscuro">📍</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Dirección</p>
            <p className="font-medium text-on-surface">{propiedad.propiedad_direccion}, {propiedad.propiedad_pais}</p>
          </div>
        </div>
      )}

    </article>
  );
};
