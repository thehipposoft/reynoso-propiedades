"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Props {
  imagenes: string[];
  titulo: string;
}

const VISIBLE = 5; // máximo visible en el grid

export const GaleriaPropiedad = ({ imagenes, titulo }: Props) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const abrir = (i: number) => setLightboxIndex(i);
  const cerrar = () => setLightboxIndex(null);

  const anterior = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + imagenes.length) % imagenes.length));
  }, [imagenes.length]);

  const siguiente = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % imagenes.length));
  }, [imagenes.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") anterior();
      if (e.key === "ArrowRight") siguiente();
      if (e.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, anterior, siguiente]);

  if (imagenes.length === 0) return null;

  const visibles = imagenes.slice(0, VISIBLE);
  const resto = imagenes.length - VISIBLE;

  return (
    <>
      {/* Grid */}
      <div className="mb-12 grid h-[520px] grid-cols-3 grid-rows-3 gap-2">

        {/* Imagen principal — 2 cols × 2 rows */}
        <button
          onClick={() => abrir(0)}
          className="relative col-span-2 row-span-2 overflow-hidden rounded-2xl bg-surface-container cursor-pointer"
        >
          <Image
            src={visibles[0]}
            alt={`${titulo} — imagen 1`}
            fill
            priority
            sizes="66vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>

        {/* Imagen derecha superior */}
        {visibles[1] && (
          <button
            onClick={() => abrir(1)}
            className="relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer"
          >
            <Image
              src={visibles[1]}
              alt={`${titulo} — imagen 2`}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        )}

        {/* Imagen derecha inferior */}
        {visibles[2] && (
          <button
            onClick={() => abrir(2)}
            className="relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer"
          >
            <Image
              src={visibles[2]}
              alt={`${titulo} — imagen 3`}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        )}

        {/* Fila 3 — imagen 4 */}
        {visibles[3] && (
          <button
            onClick={() => abrir(3)}
            className="relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer"
          >
            <Image
              src={visibles[3]}
              alt={`${titulo} — imagen 4`}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        )}

        {/* Fila 3 — imagen 5 */}
        {visibles[4] && (
          <button
            onClick={() => abrir(4)}
            className="relative overflow-hidden rounded-2xl bg-surface-container cursor-pointer"
          >
            <Image
              src={visibles[4]}
              alt={`${titulo} — imagen 5`}
              fill
              sizes="33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {/* Overlay "+N más" en la última celda si hay más */}
            {resto > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <span className="font-headline text-2xl font-bold text-white">+{resto} más</span>
              </div>
            )}
          </button>
        )}

      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={cerrar}
        >
          {/* Contenedor imagen — evita cerrar al clickear la imagen */}
          <div
            className="relative mx-4 flex h-[80vh] w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[lightboxIndex]}
              alt={`${titulo} — imagen ${lightboxIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {/* Contador */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
            {lightboxIndex + 1} / {imagenes.length}
          </div>

          {/* Cerrar */}
          <button
            onClick={cerrar}
            className="absolute cursor-pointer right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Anterior */}
          {imagenes.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); anterior(); }}
              className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-colors hover:bg-white/25"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

          {/* Siguiente */}
          {imagenes.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); siguiente(); }}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-colors hover:bg-white/25"
              aria-label="Siguiente"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
};
