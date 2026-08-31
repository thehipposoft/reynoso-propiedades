"use client";

import { useRef } from "react";
import type { OdooPropiedad } from "@/src/types/OdooPropiedad";
import { useFadeUpOnScroll } from "@/src/lib/hooks/useGsap";
import { PropertyCard } from "./PropertyCard";

interface Props {
  propiedades: OdooPropiedad[];
  limite?: number;
  filter?: (propiedad: OdooPropiedad) => boolean;
}

export const PropertyGrid = ({ propiedades, limite, filter }: Props) => {
  const scope = useRef<HTMLDivElement>(null);

  let lista = propiedades;
  if (filter) lista = lista.filter(filter);
  if (limite) lista = lista.slice(0, limite);

  useFadeUpOnScroll(scope, ".property-card", { stagger: 0.08 });

  if (lista.length === 0) {
    return (
      <p className="py-24 text-center text-on-surface-variant">
        No hay propiedades disponibles.
      </p>
    );
  }

  return (
    <div
      ref={scope}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-12 pb-2 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3"
    >
      {lista.map((propiedad) => (
        <div key={propiedad.id} className="property-card w-[80vw] shrink-0 snap-start sm:w-[60vw] md:w-auto">
          <PropertyCard propiedad={propiedad} />
        </div>
      ))}
    </div>
  );
};