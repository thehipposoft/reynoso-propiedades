"use client";

import { useRef } from "react";
import type { Propiedad } from "@/src/types/PropiedadTypes";
import { useFadeUpOnScroll } from "@/src/lib/hooks/useGsap";
import { PropertyCard } from "./PropertyCard";

interface Props {
  propiedades: Propiedad[];
  limite?: number;
  limiteMobile?: number;
  excluirCategoria?: string;
  soloCategoria?: string;
}

export const PropertyGrid = ({ propiedades, limite, limiteMobile, excluirCategoria, soloCategoria }: Props) => {
  const scope = useRef<HTMLDivElement>(null);

  let lista = propiedades;
  if (excluirCategoria) lista = lista.filter((p) => p.categoria !== excluirCategoria);
  if (soloCategoria) lista = lista.filter((p) => p.categoria === soloCategoria);
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
    <div ref={scope} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {lista.map((propiedad, i) => (
        <div
          key={propiedad.id}
          className={`property-card${limiteMobile !== undefined && i >= limiteMobile ? " hidden md:block" : ""}`}
        >
          <PropertyCard propiedad={propiedad} />
        </div>
      ))}
    </div>
  );
};
