// src/app/alquileres/PropertyCard.tsx
import Image from "next/image";
import type { ComponentType } from "react";
import type { OdooPropiedad } from "@/src/types/OdooPropiedad";
import Link from "next/link";
import { formatPrecio, formatTitulo, parsePositiveNumber } from "@/src/lib/format";
import { esInversionEnPozo } from "@/src/lib/filtros";
import { BotonWhatsApp } from "./BotonWhatsApp";

interface Props {
  propiedad: OdooPropiedad;
  mostrarAgente?: boolean;
}

type IconoProps = { className?: string };

const IconUbicacion = ({ className }: IconoProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const IconAmbientes = ({ className }: IconoProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 13h18" />
  </svg>
);

const IconDormitorios = ({ className }: IconoProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
    <path d="M3 18v2" />
    <path d="M21 18v2" />
    <path d="M3 12V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
  </svg>
);

const IconBanos = ({ className }: IconoProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 3c-3 4-5 6.5-5 9a5 5 0 0 0 10 0c0-2.5-2-5-5-9Z" />
  </svg>
);

const IconSuperficie = ({ className }: IconoProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 3h6v6" />
    <path d="M9 21H3v-6" />
    <path d="M21 3l-7 7" />
    <path d="M3 21l7-7" />
  </svg>
);

interface StatItem {
  Icon: ComponentType<IconoProps>;
  texto: string;
}

function pluralizar(cantidad: number, singular: string, plural: string): string {
  return cantidad === 1 ? singular : plural;
}

export const PropertyCard = ({ propiedad, mostrarAgente = false }: Props) => {
  const imagen = propiedad.fotoPortada ?? propiedad.fotos[0]?.url ?? "";
  const esPozo = esInversionEnPozo(propiedad.tipoPropiedad);
  const precioFormateado = esPozo ? null : formatPrecio(propiedad.precio, propiedad.moneda);

  const ambientes = parsePositiveNumber(propiedad.ambientes);
  const dormitorios = parsePositiveNumber(propiedad.dormitorios);
  const banos = parsePositiveNumber(propiedad.banos);
  const superficie = parsePositiveNumber(propiedad.superficieTotal);

  const stats = [
    ambientes && { Icon: IconAmbientes, texto: `${ambientes} ${pluralizar(ambientes, "Ambiente", "Ambientes")}` },
    dormitorios && { Icon: IconDormitorios, texto: `${dormitorios} ${pluralizar(dormitorios, "Dormitorio", "Dormitorios")}` },
    banos && { Icon: IconBanos, texto: `${banos} ${pluralizar(banos, "Baño", "Baños")}` },
    superficie && { Icon: IconSuperficie, texto: `${superficie} m²` },
  ].filter(Boolean) as StatItem[];

  return (
    <Link
      href={`/propiedades/${propiedad.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm transition-all duration-500 hover:shadow-2xl sm:rounded-3xl"
    >
      {/* Imagen */}
      <div className="relative h-36 overflow-hidden bg-surface-container sm:h-72">
        {imagen && (
          <Image
            src={imagen}
            alt={propiedad.nombre}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {propiedad.tipoPropiedad && (
          <div className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-[9px] font-bold text-title-color shadow-sm sm:right-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs">
            {propiedad.tipoPropiedad}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-grow flex-col p-3 sm:p-6">
        {mostrarAgente && propiedad.agente?.fotoUrl && (
          <div className="relative -mt-8 mb-1 h-12 w-12 self-start sm:-mt-14 sm:mb-2 sm:h-20 sm:w-20">
            <Image
              src={propiedad.agente.fotoUrl}
              alt={propiedad.agente.nombre}
              fill
              sizes="80px"
              className="rounded-full border-2 border-surface-container-lowest object-top object-cover shadow-md sm:border-4"
            />
            {propiedad.agente.telefono && (
              <BotonWhatsApp
                telefono={propiedad.agente.telefono}
                nombreAgente={propiedad.agente.nombre}
                className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-300 hover:scale-110 sm:h-7 sm:w-7"
              />
            )}
          </div>
        )}

        <h4 className="mb-1 line-clamp-2 font-headline text-sm font-semibold tracking-tight text-title-color sm:mb-3 sm:text-2xl">
          {formatTitulo(propiedad.nombre)}
        </h4>

        {propiedad.direccion && (
          <p className="mb-2 flex items-center gap-1 text-[11px] text-on-surface-variant sm:mb-4 sm:gap-1.5 sm:text-sm">
            <IconUbicacion className="h-3 w-3 shrink-0 text-secondary sm:h-4 sm:w-4" />
            <span className="truncate">{propiedad.direccion}</span>
          </p>
        )}

        {!esPozo && (
          <div className="inline-flex self-start items-center rounded-full bg-primary-green px-2.5 py-1 text-xs font-bold text-white sm:px-4 sm:py-1.5 sm:text-sm">
            {precioFormateado ?? "Precio a consultar"}
          </div>
        )}

        {stats.length > 0 && (
          <ul className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-medium text-on-surface-variant sm:mt-5 sm:gap-x-4 sm:gap-y-3 sm:text-sm">
            {stats.map(({ Icon, texto }) => (
              <li key={texto} className="flex items-center gap-1 sm:gap-2">
                <Icon className="h-3 w-3 shrink-0 text-secondary sm:h-4 sm:w-4" />
                <span className="truncate">{texto}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-end pt-2 sm:pt-5">
          <span className="text-xs text-on-surface-variant transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary-green group-hover:underline sm:text-sm">
            Ver detalles
          </span>
        </div>
      </div>
    </Link>
  );
};
