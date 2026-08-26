"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { CategoriaPropiedad } from "@/src/lib/odoo/categories";
import { OPERACIONES } from "@/src/lib/filtros";

interface Props {
  categorias: CategoriaPropiedad[];
}

export const FiltrosPropiedades = ({ categorias }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [busqueda, setBusqueda] = useState(searchParams.get("q") ?? "");
  const [operacion, setOperacion] = useState(searchParams.get("operacion") ?? "");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "");
  const [precioMin, setPrecioMin] = useState(searchParams.get("precioMin") ?? "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (busqueda.trim()) params.set("q", busqueda.trim());
    if (operacion) params.set("operacion", operacion);
    if (categoria) params.set("categoria", categoria);
    if (precioMin) params.set("precioMin", precioMin);
    if (precioMax) params.set("precioMax", precioMax);
    router.push(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const handleReset = () => {
    setBusqueda("");
    setOperacion("");
    setCategoria("");
    setPrecioMin("");
    setPrecioMax("");
    router.push("/propiedades");
  };

  return (
    <aside className="w-full shrink-0 lg:w-72">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-2xl bg-surface-container-lowest p-5 shadow-sm lg:sticky lg:top-24"
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-secondary">Filtros</h2>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
            Buscar
          </label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Nombre o dirección"
            className="rounded-xl border-none bg-surface-container-low py-3 px-3 font-medium focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
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
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
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

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">
            Precio
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={0}
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              placeholder="Mín."
              className="w-1/2 rounded-xl border-none bg-surface-container-low py-3 px-3 font-medium focus:ring-2 focus:ring-primary/20"
            />
            <input
              type="number"
              min={0}
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              placeholder="Máx."
              className="w-1/2 rounded-xl border-none bg-surface-container-low py-3 px-3 font-medium focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            type="submit"
            className="flex h-[48px] w-full items-center justify-center rounded-xl bg-verde-oscuro text-xs font-bold uppercase tracking-wider text-on-primary transition-all hover:bg-verde-oscuro/35 hover:text-verde-oscuro hover:shadow-xl active:scale-95"
          >
            Aplicar filtros
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:text-primary"
          >
            Limpiar filtros
          </button>
        </div>
      </form>
    </aside>
  );
};