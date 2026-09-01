"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import type { CategoriaPropiedad } from "@/src/lib/odoo/categories";
import { CATEGORIA_EN_POZO, MONEDAS, ZONAS } from "@/src/lib/filtros";

interface Props {
  categorias: CategoriaPropiedad[];
}

type Tab = "comprar" | "alquiler" | "pozo";

const TABS: { key: Tab; label: string }[] = [
  { key: "comprar", label: "Comprar" },
  { key: "alquiler", label: "Alquilar" },
  { key: "pozo", label: "Invertir en pozo" },
];

const PILL_CLASSNAME =
  "cursor-pointer rounded-full border font-poppins border-outline-variant bg-surface-container-lowest px-4 py-2.5 text-sm text-on-surface transition-colors duration-300 hover:border-verde-oscuro focus:outline-none focus:ring-2 focus:ring-primary/20 font-inter";

const IconFlecha = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" className={className}>
    <path fill="#383838" d="M12 0 7 5 2 0 0 1l7 7 7-7z" />
  </svg>
);

interface SelectPillProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

const SelectPill = ({ value, onChange, children }: SelectPillProps) => (
  <div className="relative w-fit">
    <select value={value} onChange={onChange} className={`${PILL_CLASSNAME} appearance-none pr-9`}>
      {children}
    </select>
    <IconFlecha className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
  </div>
);

export const FiltrosPropiedades = ({ categorias }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const operacionActual = searchParams.get("operacion") ?? "";
  const categoriaActual = searchParams.get("categoria") ?? "";
  const zonaActual = searchParams.get("zona") ?? "";
  const monedaActual = searchParams.get("moneda") ?? "";
  const precioMinActual = searchParams.get("precioMin") ?? "";
  const precioMaxActual = searchParams.get("precioMax") ?? "";

  const [precioAbierto, setPrecioAbierto] = useState(false);
  const [monedaBorrador, setMonedaBorrador] = useState(monedaActual || "Dolares");
  const [precioMinBorrador, setPrecioMinBorrador] = useState(precioMinActual);
  const [precioMaxBorrador, setPrecioMaxBorrador] = useState(precioMaxActual);
  const precioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const alClickearFuera = (e: MouseEvent) => {
      if (precioRef.current && !precioRef.current.contains(e.target as Node)) {
        setPrecioAbierto(false);
      }
    };
    document.addEventListener("mousedown", alClickearFuera);
    return () => document.removeEventListener("mousedown", alClickearFuera);
  }, []);

  const irCon = (cambios: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [clave, valor] of Object.entries(cambios)) {
      if (valor) params.set(clave, valor);
      else params.delete(clave);
    }
    router.push(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const tabActivo: Tab | null =
    categoriaActual === CATEGORIA_EN_POZO
      ? "pozo"
      : operacionActual === "venta"
        ? "comprar"
        : operacionActual === "alquiler"
          ? "alquiler"
          : null;

  const seleccionarTab = (tab: Tab) => {
    if (tab === "pozo") {
      irCon({ categoria: CATEGORIA_EN_POZO, operacion: undefined });
      return;
    }
    irCon({
      operacion: tab === "comprar" ? "venta" : "alquiler",
      categoria: categoriaActual === CATEGORIA_EN_POZO ? undefined : categoriaActual,
    });
  };

  const abrirPrecio = () => {
    setMonedaBorrador(monedaActual || "Dolares");
    setPrecioMinBorrador(precioMinActual);
    setPrecioMaxBorrador(precioMaxActual);
    setPrecioAbierto((abierto) => !abierto);
  };

  const aplicarPrecio = () => {
    irCon({
      moneda: monedaBorrador || undefined,
      precioMin: precioMinBorrador || undefined,
      precioMax: precioMaxBorrador || undefined,
    });
    setPrecioAbierto(false);
  };

  const etiquetaPrecio =
    monedaActual === "Pesos" ? "Precio ARS" : monedaActual === "Dolares" ? "Precio USD" : "Precio";

  const hayFiltrosActivos = Boolean(
    operacionActual || categoriaActual || zonaActual || monedaActual || precioMinActual || precioMaxActual
  );

  return (
    <div className="mb-8">
      {/* Tabs de operación */}
      <div className="mb-6 flex items-center justify-center gap-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => seleccionarTab(tab.key)}
            className={`-mb-px cursor-pointer border-b-2 font-poppins text-base font-semibold transition-colors duration-300 ${
              tabActivo === tab.key
                ? "border-verde-oscuro text-verde-oscuro"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pills de filtro */}
      <div className="flex flex-col lg:flex-row flex-wrap justify-center lg:items-center gap-3">
        <SelectPill value={zonaActual} onChange={(e) => irCon({ zona: e.target.value || undefined })}>
          <option value="">Ubicación</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </SelectPill>

        <SelectPill
          value={categoriaActual === CATEGORIA_EN_POZO ? "" : categoriaActual}
          onChange={(e) => irCon({ categoria: e.target.value || undefined })}
        >
          <option value="">Tipo</option>
          {categorias.map((c) => (
            <option key={c.slug} value={c.slug}>{c.label}</option>
          ))}
        </SelectPill>

        <div ref={precioRef} className="relative">
          <button type="button" onClick={abrirPrecio} className={PILL_CLASSNAME}>
            {etiquetaPrecio}
          </button>

          <div
            className={`absolute left-0 top-full z-20 mt-2 w-72 origin-top rounded-2xl bg-surface-container-lowest p-4 shadow-xl transition-all duration-200 ${
              precioAbierto ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
            }`}
          >
            <div className="mb-3 flex gap-2">
              {MONEDAS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMonedaBorrador(m.value)}
                  className={`flex-1 cursor-pointer rounded-xl px-3 py-2 text-xs font-bold transition-colors duration-300 ${
                    monedaBorrador === m.value
                      ? "bg-verde-oscuro text-white"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mb-4 flex gap-2">
              <input
                type="number"
                min={0}
                placeholder="Mín."
                value={precioMinBorrador}
                onChange={(e) => setPrecioMinBorrador(e.target.value)}
                className="w-1/2 rounded-xl border-none bg-surface-container-low px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="number"
                min={0}
                placeholder="Máx."
                value={precioMaxBorrador}
                onChange={(e) => setPrecioMaxBorrador(e.target.value)}
                className="w-1/2 rounded-xl border-none bg-surface-container-low px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <button
              type="button"
              onClick={aplicarPrecio}
              className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-xl bg-verde-oscuro text-xs font-bold uppercase tracking-wider text-on-primary transition-all duration-300 hover:bg-verde-oscuro/35 hover:text-verde-oscuro"
            >
              Aplicar
            </button>
          </div>
        </div>

        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={() => router.push("/propiedades")}
            className="cursor-pointer text-xs font-bold uppercase tracking-wider text-on-surface-variant transition-colors duration-300 hover:text-primary"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};
