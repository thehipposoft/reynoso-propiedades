"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const TIPOS = [
  { label: "Todos", value: "" },
  { label: "Venta", value: "venta" },
  { label: "Alquiler", value: "alquiler" },
  { label: "Alquiler / Venta", value: "alquiler-venta" },
  { label: "Inversión en Pozo", value: "inversion-en-pozo" },
];

const CATEGORIAS = [
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

export const FiltrosPropiedades = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tipo, setTipo] = useState(searchParams.get("tipo") ?? "");
  const [categoria, setCategoria] = useState(searchParams.get("categoria") ?? "");

  // Sincroniza si el usuario navega con back/forward
  useEffect(() => {
    setTipo(searchParams.get("tipo") ?? "");
    setCategoria(searchParams.get("categoria") ?? "");
  }, [searchParams]);

  const aplicar = () => {
    const params = new URLSearchParams();
    if (tipo) params.set("tipo", tipo);
    if (categoria) params.set("categoria", categoria);
    const query = params.toString();
    router.push(`/propiedades${query ? `?${query}` : ""}`);
  };

  const limpiar = () => {
    setTipo("");
    setCategoria("");
    router.push("/propiedades");
  };

  const hayFiltros = tipo || categoria;

  return (
    <div className="mb-10 flex flex-wrap items-end gap-4">

      <div className="flex flex-col gap-1">
        <label className="pl-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Tipo
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-green/30"
        >
          {TIPOS.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="pl-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Categoría
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="rounded-xl border border-outline-variant bg-surface-container-low px-4 py-2.5 text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-green/30"
        >
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={aplicar}
        className="h-[42px] rounded-xl bg-verde-oscuro px-6 text-xs font-bold uppercase tracking-wider text-white transition-all hover:shadow-lg active:scale-95"
      >
        Aplicar
      </button>

      {hayFiltros && (
        <button
          onClick={limpiar}
          className="h-[42px] rounded-xl border border-outline-variant px-5 text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary-green hover:text-primary-green"
        >
          Limpiar
        </button>
      )}

    </div>
  );
};
