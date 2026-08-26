// src/app/alquileres/PropertyCard.tsx
import Image from "next/image";
import type { OdooPropiedad } from "@/src/types/OdooPropiedad";
import Link from "next/link";
import { formatPrecio, parsePositiveNumber } from "@/src/lib/format";

interface Props {
  propiedad: OdooPropiedad;
}

export const PropertyCard = ({ propiedad }: Props) => {
  const imagen = propiedad.fotoPortada ?? propiedad.fotos[0]?.url ?? "";
  const precioFormateado = formatPrecio(propiedad.precio, propiedad.moneda);

  const dormitorios = parsePositiveNumber(propiedad.dormitorios);
  const banos = parsePositiveNumber(propiedad.banos);
  const superficie = parsePositiveNumber(propiedad.superficieTotal);

  const stats = [
    dormitorios && `${dormitorios} dorm.`,
    banos && `${banos} baños`,
    superficie && `${superficie} m²`,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/propiedades/${propiedad.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl bg-surface-container-lowest transition-all duration-500 hover:shadow-2xl"
    >
      {/* Imagen */}
      <div className="relative h-72 overflow-hidden bg-surface-container">
        {imagen && (
          <Image
            src={imagen}
            alt={propiedad.nombre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        {propiedad.tipoPropiedad && (
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
            {propiedad.tipoPropiedad}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-grow flex-col p-6">
        {propiedad.direccion && (
          <p className="mb-2 text-xs font-bold uppercase tracking-tighter text-secondary">
            {propiedad.direccion}
          </p>
        )}

        <h2 className="mb-3 font-headline text-2xl font-bold ">
          {propiedad.nombre}
        </h2>

        {propiedad.descripcion && (
          <p className="line-clamp-3 text-sm leading-relaxed text-on-surface-variant">
            {propiedad.descripcion}
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
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-surface-container pt-4">
          <span className="text-base font-bold text-primary">
            {precioFormateado ?? "Precio a consultar"}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary transition-transform duration-300 group-hover:translate-x-2 group-hover:text-primary-green">
            Ver detalles →
          </span>
        </div>
      </div>
    </Link>
  );
};
