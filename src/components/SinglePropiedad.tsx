import Link from "next/link";
import type { OdooPropiedad } from "@/src/types/OdooPropiedad";
import { formatPrecio, formatLabel, operacionDesdeEstado } from "@/src/lib/format";
import { GaleriaPropiedad } from "./GaleriaPropiedad";

interface Props {
  propiedad: OdooPropiedad;
}

interface StatProps { label: string; value: string }
const Stat = ({ label, value }: StatProps) => (
  <div className="flex flex-col gap-1 rounded-2xl bg-surface-container-low px-5 py-4">
    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</span>
    <span className="text-lg font-bold text-on-surface">{value}</span>
  </div>
);

export const SinglePropiedad = ({ propiedad }: Props) => {
  const todasLasImagenes = [
    propiedad.fotoPortada,
    ...propiedad.fotos.map((f) => f.url),
  ].filter((url): url is string => Boolean(url));

  const operacion = operacionDesdeEstado(propiedad.estado);
  const precioFormateado = formatPrecio(propiedad.precio, propiedad.moneda);

  const stats: StatProps[] = [
    propiedad.ambientes && { label: "Ambientes", value: propiedad.ambientes },
    propiedad.dormitorios && { label: "Dormitorios", value: propiedad.dormitorios },
    propiedad.banos && { label: "Baños", value: propiedad.banos },
    propiedad.superficieTotal && { label: "Superficie", value: `${propiedad.superficieTotal} m²` },
    propiedad.superficieCubierta && { label: "Sup. cubierta", value: `${propiedad.superficieCubierta} m²` },
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

      {/* 1. Tipo de propiedad + Operación */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {propiedad.tipoPropiedad && (
          <span className="rounded-full bg-primary-green/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-verde-oscuro">
            {formatLabel(propiedad.tipoPropiedad)}
          </span>
        )}
        {operacion && (
          <span className="rounded-full bg-surface-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
            {operacion}
          </span>
        )}
      </div>

      {/* 2. Título + Precio */}
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-on-surface">
          {propiedad.nombre}
        </h1>
        {precioFormateado && (
          <p className="shrink-0 font-headline text-3xl font-extrabold text-verde-oscuro">
            {precioFormateado}
          </p>
        )}
      </div>

      {/* 3. Galería */}
      <GaleriaPropiedad imagenes={todasLasImagenes} titulo={propiedad.nombre} />

      {/* 4. Stats */}
      {stats.length > 0 && (
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      )}

      {/* 5. Descripción — texto plano en Odoo, no HTML como en WordPress */}
      {propiedad.descripcion && (
        <p className="whitespace-pre-line text-lg leading-relaxed text-on-surface-variant">
          {propiedad.descripcion}
        </p>
      )}

      {/* 6. Dirección */}
      {propiedad.direccion && (
        <div className="mt-10 flex items-start gap-3 rounded-2xl bg-surface-container-low p-5">
          <span className="mt-0.5 text-verde-oscuro">📍</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Dirección</p>
            <p className="font-medium text-on-surface">
              {propiedad.direccion}
              {propiedad.zona ? `, ${propiedad.zona}` : ""}
            </p>
          </div>
        </div>
      )}

    </article>
  );
};