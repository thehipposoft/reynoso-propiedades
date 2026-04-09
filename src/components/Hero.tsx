"use client";

import Image from "next/image";
import { useRef } from "react";
import { useEntranceTimeline } from "@/src/lib/hooks/useGsap";
import { BusquedaAvanzada } from "./BusquedaAvanzada";

const HERO_IMAGE = "/assets/images/hero.jpg";

export const Hero = () => {
  const scope = useRef<HTMLElement>(null);

  useEntranceTimeline(scope, (tl) => {
    tl.fromTo(".hero-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(".hero-form", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
  });

  return (
    <section
      ref={scope}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-12 pt-24"
    >
      {/* Fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-primary-green">
        <Image
          src={HERO_IMAGE}
          alt="Propiedades en el norte argentino"
          fill
          priority
          className="object-cover brightness-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/5 to-surface" />
      </div>

      {/* Título */}
      <div className="hero-title relative z-10 mb-12 max-w-4xl text-center">
        <h4 className="mb-6 font-headline text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg md:text-7xl">
          Encontrá tu hogar ideal
        </h4>
      </div>

      {/* Formulario */}
      <div className="hero-form relative z-10 flex w-full justify-center">
        <BusquedaAvanzada />
      </div>
    </section>
  );
};
