"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { gsap } from "@/src/lib/hooks/useGsap";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface Props {
  items: readonly NavItem[];
}

export const MobileMenu = ({ items }: Props) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemsRef = useRef<HTMLUListElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // GSAP solo para los items — stagger de entrada
  useLayoutEffect(() => {
    const ul = itemsRef.current;
    if (!ul || !open) return;
    gsap.fromTo(
      ul.querySelectorAll("li"),
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );
  }, [open]);

  const close = () => setOpen(false);

  const overlay = (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#3A3938] px-8 transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Logo + botón cerrar en la misma fila */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <Image
          src="/assets/images/logo-white.png"
          alt="Reynoso Bienes Raíces"
          width={180}
          height={60}
          className="h-auto w-36 object-contain"
        />

        <button
          onClick={close}
          aria-label="Cerrar menú"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px]"
        >
          <span className="block h-[2px] w-6 origin-center translate-y-[4px] rotate-45 bg-white" />
          <span className="block h-[2px] w-6 origin-center -translate-y-[4px] -rotate-45 bg-white" />
        </button>
      </div>

      {/* Items */}
      <ul ref={itemsRef} className="flex flex-col items-center gap-10">
        {items.map((item) => (
          <li key={item.label} style={{ opacity: 0 }}>
            <Link
              href={item.href}
              onClick={close}
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`font-headline text-3xl font-extrabold tracking-tight transition-colors ${
                item.label === "Nuestros Desarrollos"
                  ? "text-primary-green"
                  : "text-white hover:text-primary-green"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {/* Botón abrir — solo mobile */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
      >
        <span className="block h-[2px] w-6 bg-white" />
        <span className="block h-[2px] w-6 bg-white" />
        <span className="block h-[2px] w-6 bg-white" />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
};
