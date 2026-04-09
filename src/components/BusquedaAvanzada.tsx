"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TIPOS: { label: string; value: string }[] = [
  { label: "Todos", value: "" },
  { label: "Venta", value: "venta" },
  { label: "Alquiler", value: "alquiler" },
  { label: "Alquiler / Venta", value: "alquiler-venta" },
  { label: "Inversión en Pozo", value: "inversion-en-pozo" },
];

const CATEGORIAS: { label: string; value: string }[] = [
  { label: "Todas", value: "" },
  { label: "Casa", value: "casa" },
  { label: "Comercial / Galpón", value: "comercial-galpon" },
  { label: "Departamento", value: "departamento" },
  { label: "Duplex", value: "duplex" },
  { label: "Galpón", value: "galpon" },
  { label: "Inversión en Pozo", value: "inversion" },
  { label: "Local Comercial", value: "local-comercial" },
  { label: "Monoambiente", value: "monoambiente" },
  { label: "Oficina", value: "oficina" },
  { label: "PH", value: "ph" },
  { label: "Terreno", value: "terreno" },
];

export const BusquedaAvanzada = () => {
  const router = useRouter();
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (tipo) params.set("tipo", tipo);
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
            Tipo
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="rounded-xl border-none bg-surface-container-low py-3 font-medium focus:ring-2 focus:ring-primary/20"
          >
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
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
            className="rounded-xl border-none bg-surface-container-low py-3 font-medium focus:ring-2 focus:ring-primary/20"
          >
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-verde-oscuro text-xs font-bold uppercase tracking-wider text-on-primary transition-all hover:shadow-xl active:scale-95"
          >
            Buscar
          </button>
        </div>

      </form>
    </div>
  );
};
