"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import type { CategoriaPropiedad } from "@/src/lib/odoo/categories";
import { CATEGORIA_EN_POZO } from "@/src/lib/filtros";
import { gsap } from "@/src/lib/hooks/useGsap";

interface Props {
  categorias: CategoriaPropiedad[];
}

type Operacion = "venta" | "alquiler";

const BOTON_OPERACION_CLASSNAME =
  "flex items-center justify-center gap-2 cursor-pointer rounded-full bg-white/95 px-8 py-4 text-sm font-bold uppercase tracking-wide text-title-color shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-verde-oscuro hover:text-on-primary hover:shadow-2xl active:scale-95";

export const BusquedaAvanzada = ({ categorias }: Props) => {
  const router = useRouter();
  const [operacionAbierta, setOperacionAbierta] = useState<Operacion | null>(null);
  const [tipo, setTipo] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const alturaAnteriorRef = useRef(0);
  const esPrimerRender = useRef(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    if (esPrimerRender.current) {
      esPrimerRender.current = false;
      return;
    }

    gsap.killTweensOf(container);
    const alturaNueva = content.offsetHeight;

    gsap.fromTo(
      container,
      { height: alturaAnteriorRef.current },
      {
        height: alturaNueva,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          container.style.height = "auto";
        },
      }
    );

    gsap.fromTo(
      content,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: "power2.out" }
    );
  }, [operacionAbierta]);

  const abrirModal = (operacion: Operacion) => {
    if (containerRef.current) alturaAnteriorRef.current = containerRef.current.offsetHeight;
    setOperacionAbierta(operacion);
  };

  const cerrarModal = () => {
    if (containerRef.current) alturaAnteriorRef.current = containerRef.current.offsetHeight;
    setOperacionAbierta(null);
  };

  const irAInvertirEnPozo = () => {
    router.push(`/propiedades?categoria=${CATEGORIA_EN_POZO}`);
  };

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operacionAbierta) return;

    const params = new URLSearchParams({ operacion: operacionAbierta });
    if (tipo) params.set("categoria", tipo);
    router.push(`/propiedades?${params.toString()}`);
  };

  const modalAbierto = operacionAbierta !== null;
  const tituloModal = operacionAbierta === "venta" ? "Comprar" : "Alquilar";

  return (
    <div ref={containerRef} className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[2rem]">
      <div
        aria-hidden
        className={`absolute inset-0 rounded-[2rem] bg-surface-container-lowest/90 shadow-2xl backdrop-blur-2xl transition-opacity duration-500 ${
          modalAbierto ? "opacity-100" : "opacity-0"
        }`}
      />

      <div ref={contentRef} className="relative p-4 md:p-8">
        {!modalAbierto ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={() => abrirModal("venta")} className={BOTON_OPERACION_CLASSNAME}>
              Comprar
            </button>
            <button type="button" onClick={() => abrirModal("alquiler")} className={BOTON_OPERACION_CLASSNAME}>
              Alquilar
            </button>
            <button type="button" onClick={irAInvertirEnPozo} className={BOTON_OPERACION_CLASSNAME}>
              Invertir en pozo
            </button>
          </div>
        ) : (
          <form onSubmit={buscar} className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h4 className="font-headline text-xl font-bold text-title-color">{tituloModal}</h4>
              <button
                type="button"
                onClick={cerrarModal}
                className="text-xs font-bold uppercase tracking-widest text-secondary transition-colors duration-300 hover:text-primary"
              >
                ← Volver
              </button>
            </div>

            <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-[1fr_auto]">
              <div className="flex flex-col gap-2">
                <label className="pl-2 text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Tipo
                </label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="rounded-xl border-none bg-surface-container-low px-2 py-3 font-medium focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Todos</option>
                  {categorias.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="flex h-[52px] items-center justify-center gap-2 rounded-xl bg-verde-oscuro border-2 cursor-pointer border-verde-oscuro px-8 text-xs font-bold uppercase tracking-wider text-on-primary transition-all duration-300 hover:bg-white hover:text-verde-oscuro hover:shadow-xl active:scale-95"
              >
                Buscar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
