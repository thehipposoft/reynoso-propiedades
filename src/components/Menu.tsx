"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useEntranceTimeline } from "@/src/lib/hooks/useGsap";

const NAV_ITEMS = [
  { label: "Propiedades", href: "/propiedades" },
  { label: "Contacto", href: "#contacto" },
  { label: "Nuestros Desarrollos", href: "https://reynosobienesraices.com.ar/desarrollos", external: true },
] as const;

const SCROLL_THRESHOLD = 40;

export const Menu = () => {
  const scope = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEntranceTimeline(scope, (tl) => {
    tl.fromTo(scope.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(".menu-item", { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.2");
  });

  const isHome = pathname === "/";

  return (
    <header
      ref={scope}
      className={[
        "top-0 z-50 w-full border-b border-outline-variant/20 transition-all duration-500",
        isHome ? "fixed" : "sticky",
        scrolled
          ? "bg-primary-gray/75 backdrop-blur-sm"
          : isHome
            ? "bg-primary-gray/60"
            : "bg-primary-gray/95 backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">

        <Link href="/" className="menu-item flex items-center">
          <Image
            src="/assets/images/logo-white.png"
            alt="Reynoso Bienes Raíces"
            width={300}
            height={100}
            className="h-auto max-h-20 w-48 object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              {...("external" in item ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`menu-item font-jakarta text-lg font-bold tracking-tight transition-colors ${item.label === "Nuestros Desarrollos" ? "rounded-full border border-verde-oscuro bg-white px-6 py-2 text-verde-oscuro duration-500 hover:bg-transparent hover:text-white" : "text-white duration-300 hover:text-primary-green"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
};
