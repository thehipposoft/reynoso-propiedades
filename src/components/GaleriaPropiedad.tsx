"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface Props {
  imagenes: string[];
  titulo: string;
}

const VISIBLE_MINIATURAS = 5; // máximo de miniaturas debajo de la imagen principal

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

  const miniaturas = imagenes.slice(1, 1 + VISIBLE_MINIATURAS);
  const resto = imagenes.length - (1 + VISIBLE_MINIATURAS);

  return (
    <>
      <div className="mb-12">
        {/* Imagen principal */}
        <button
          onClick={() => abrir(0)}
          className="relative aspect-[12/5] w-full overflow-hidden rounded-lg bg-surface-container cursor-pointer"
        >
          <Image
            src={imagenes[0]}
            alt={`${titulo} — imagen 1`}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </button>

        {/* Miniaturas */}
        {miniaturas.length > 0 && (
          <div className="mt-2 flex gap-2 overflow-x-auto sm:overflow-visible">
            {miniaturas.map((src, i) => {
              const indice = i + 1;
              const esUltima = i === miniaturas.length - 1;
              return (
                <button
                  key={indice}
                  onClick={() => abrir(indice)}
                  className="relative aspect-[3/2] w-28 shrink-0 overflow-hidden rounded-lg bg-surface-container cursor-pointer sm:w-auto sm:flex-1"
                >
                  <Image
                    src={src}
                    alt={`${titulo} — imagen ${indice + 1}`}
                    fill
                    sizes="20vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {esUltima && resto > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                      <span className="font-headline text-xl font-bold text-white sm:text-2xl">+{resto} más</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={cerrar}
        >
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

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
            {lightboxIndex + 1} / {imagenes.length}
          </div>

          <button
            onClick={cerrar}
            className="absolute cursor-pointer right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white backdrop-blur transition-colors hover:bg-white/25"
            aria-label="Cerrar"
          >
            ✕
          </button>

          {imagenes.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); anterior(); }}
              className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition-colors hover:bg-white/25"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

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