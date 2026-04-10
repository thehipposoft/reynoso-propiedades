"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useFadeUpOnScroll } from "@/src/lib/hooks/useGsap";

const COPY = "Conectamos personas con su próximo hogar o inversión en Salta, cuidando los intereses de cada cliente con experiencia, transparencia y compromiso real. Acompañamos tanto la búsqueda y venta de propiedades como el desarrollo de proyectos urbanísticos, con un equipo capacitado y en constante crecimiento que entiende que cada operación es el inicio de una relación duradera. Porque la confianza y la seguridad que merecés en cada etapa del proceso son, para nosotros, la base de todo.";

const WORDS = COPY.split(" ");

export const Nosotros = () => {
  const scope = useRef<HTMLElement>(null);

  // Logo + botones fade-up
  useFadeUpOnScroll(scope, ".nosotros-reveal", { stagger: 0.15, duration: 1 });

  useFadeUpOnScroll(scope, ".nosotros-botones", { stagger: 0.15, delay: 1 });


  // Palabras del párrafo — stagger palabra a palabra
  useFadeUpOnScroll(scope, ".nosotros-word", { stagger: 0.02, duration: 1, delay: 0.5, start: "top 92%" });

  return (
    <section ref={scope} id="nosotros" className="pt-12 pb-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-12 px-6">

        {/* Logo */}
        <div className="nosotros-reveal flex items-center justify-center">
          <Image
            src="/assets/images/LOGO_REYNOSO_5.png"
            alt="Reynoso Bienes Raíces"
            width={480}
            height={240}
            className="h-auto w-full max-w-sm object-contain"
          />
        </div>

        {/* Copy */}
        <p className="text-lg px-6 lg:px-0 lg:text-xl leading-relaxed lg:text-center text-on-surface-variant">
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="nosotros-word inline-block"
              style={{ opacity: 0, marginRight: "0.28em" }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div className="nosotros-botones flex flex-wrap justify-center gap-4">
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://wa.me/543874063402?text=Hola!%20Vengo%20desde%20su%20página%20web%20de%20propiedades"
            className="rounded-full bg-verde-oscuro px-8 py-3 text-sm font-bold uppercase tracking-widest hover:underline text-white transition-all duration-300 border border-verde-oscuro hover:bg-white hover:text-title-color hover:shadow-lg active:scale-95"
          >
            Contactanos
          </Link>
          <Link
            href="https://reynosobienesraices.com.ar/#nosotros"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-verde-oscuro px-8 py-3 hover:underline text-sm font-bold uppercase tracking-widest text-title-color transition-all duration-300 hover:bg-verde-oscuro hover:text-white active:scale-95"
          >
            Conocé quienes somos
          </Link>
        </div>

      </div>
    </section>
  );
};
