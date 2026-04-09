import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Fade-up con stagger al entrar en viewport */
export const useFadeUpOnScroll = (
  scope: RefObject<Element | null>,
  selector: string,
  options?: { stagger?: number }
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: options?.stagger ?? 0.1,
          scrollTrigger: {
            trigger: selector,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, [scope, selector, options?.stagger]);
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
