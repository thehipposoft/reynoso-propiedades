"use client";

interface Props {
  telefono: string;
  nombreAgente: string;
  className?: string;
}

const IconWhatsApp = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.39.63 4.63 1.72 6.58L4 29l7.6-1.99a11.94 11.94 0 0 0 4.41.84h.01c6.63 0 12.01-5.38 12.01-12.01C28.03 8.38 22.65 3 16.01 3Zm0 21.98h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.51 1.18 1.2-4.39-.24-.45a9.93 9.93 0 0 1-1.53-5.29c0-5.49 4.47-9.96 9.97-9.96 2.66 0 5.16 1.04 7.04 2.92a9.9 9.9 0 0 1 2.92 7.05c0 5.49-4.47 9.96-9.96 9.96h.53Zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
);

export const BotonWhatsApp = ({ telefono, nombreAgente, className }: Props) => (
  <button
    type="button"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      window.open(`https://wa.me/${telefono.replace(/\D/g, "")}`, "_blank", "noopener,noreferrer");
    }}
    aria-label={`Contactar a ${nombreAgente} por WhatsApp`}
    className={className}
  >
    <IconWhatsApp className="h-4 w-4" />
  </button>
);
