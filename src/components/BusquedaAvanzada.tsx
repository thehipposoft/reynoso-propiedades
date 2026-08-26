"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CategoriaPropiedad } from "@/src/lib/odoo/categories";
import { OPERACIONES } from "@/src/lib/filtros";

interface Props {
  categorias: CategoriaPropiedad[];
}

export const BusquedaAvanzada = ({ categorias }: Props) => {
  const router = useRouter();
  const [operacion, setOperacion] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (operacion) params.set("operacion", operacion);
    if (categoria) params.set("categoria", categoria);
    const query = params.toString();
    router.push(`/propiedades${query ? `?${query}` : ""}`);
  };

  return (
    <div className="relative z-10 w-full max-w-5xl rounded-[2rem] bg-surface-container-lowest/90 p-4 shadow-2xl backdrop-blur-2xl md:p-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >

        <div className="flex flex-col gap-2">
          <label className="pl-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
            Operación
          </label>
          <select
            value={operacion}
            onChange={(e) => setOperacion(e.target.value)}
            className="rounded-xl border-none bg-surface-container-low py-3 px-2 font-medium focus:ring-2 focus:ring-primary/20"
          >
            {OPERACIONES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="pl-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
            Categoría
          </label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="rounded-xl border-none bg-surface-container-low py-3 px-2 font-medium focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Todas</option>
            {categorias.map((c) => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-verde-oscuro hover:bg-verde-oscuro/35 duration-300 cursor-pointer hover:text-verde-oscuro text-xs font-bold uppercase tracking-wider text-on-primary transition-all hover:shadow-xl active:scale-95"
          >
            Buscar
          </button>
        </div>

      </form>
    </div>
  );
};