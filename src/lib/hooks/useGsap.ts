import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Fade-up con stagger al entrar en viewport */
export const useFadeUpOnScroll = (
  scope: RefObject<Element | null>,
  selector: string,
  options?: { stagger?: number; duration?: number; start?: string; delay?: number }
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.7,
          ease: "power2.out",
          stagger: options?.stagger ?? 0.1,
          delay: options?.delay ?? 0,
          scrollTrigger: {
            trigger: selector,
            start: options?.start ?? "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [scope, selector, options?.stagger, options?.duration, options?.start]);
};

/** Animación de entrada genérica con timeline */
export const useEntranceTimeline = (
  scope: RefObject<Element | null>,
  build: (tl: gsap.core.Timeline) => void
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      build(tl);
    }, scope);

    return () => ctx.revert();
  }, [scope]);
};
