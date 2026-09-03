import Image from "next/image";
import Link from "next/link";
import type { OdooPropiedad } from "@/src/types/OdooPropiedad";
import { formatPrecio, formatLabel, operacionDesdeEstado } from "@/src/lib/format";
import { esInversionEnPozo } from "@/src/lib/filtros";
import { TELEFONO_CONTACTO_GENERAL } from "@/src/lib/agentes";
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

const IconWhatsApp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.63 4.63 1.72 6.58L4 29l7.6-1.99a11.94 11.94 0 0 0 4.41.84h.01c6.63 0 12.01-5.38 12.01-12.01C28.03 8.38 22.65 3 16.01 3Zm0 21.98h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.51 1.18 1.2-4.39-.24-.45a9.93 9.93 0 0 1-1.53-5.29c0-5.49 4.47-9.96 9.97-9.96 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.49-4.47 9.96-9.96 9.96h.53Zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const SinglePropiedad = ({ propiedad }: Props) => {
  const todasLasImagenes = [
    propiedad.fotoPortada,
    ...propiedad.fotos.map((f) => f.url),
  ].filter((url): url is string => Boolean(url));

  const operacion = operacionDesdeEstado(propiedad.estado);
  const esPozo = esInversionEnPozo(propiedad.tipoPropiedad);
  const precioFormateado = esPozo ? null : formatPrecio(propiedad.precio, propiedad.moneda);

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

      {/* 7. Agente */}
      <div className="mt-6 w-fit">
        {propiedad.agente?.fotoUrl && (
          <div className="flex items-center gap-4">
            <div className="relative h-28 w-28 shrink-0">
              <Image
                src={propiedad.agente.fotoUrl}
                alt={propiedad.agente.nombre}
                fill
                sizes="80px"
                className="rounded-full object-cover object-top shadow-md"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-[10px] font-bold uppercase leading-0 tracking-widest text-on-surface-variant">Agente</p>
              <p className="text-lg font-bold text-on-surface">{propiedad.agente.nombre}</p>
              <Link
                href={`https://wa.me/${(propiedad.agente?.telefono ?? TELEFONO_CONTACTO_GENERAL).replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-10 flex w-fit items-center gap-2 rounded-full border border-verde-oscuro bg-surface-container-lowest px-5 py-2 text-sm font-bold text-on-surface shadow-md transition-all duration-300 hover:bg-verde-oscuro hover:text-white ${propiedad.agente?.fotoUrl ? "-left-6 mt-2" : ""}`}
              >
                <IconWhatsApp className="h-8 w-8 text-[#25D366]" />
                Contactar
              </Link>
            </div>
          </div>
        )}
      </div>

    </article>
  );
};