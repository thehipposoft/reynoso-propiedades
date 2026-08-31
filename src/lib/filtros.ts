import { slugify } from "@/src/lib/slug";

export const OPERACIONES: { label: string; value: string }[] = [
  { label: "Todos", value: "" },
  { label: "Venta", value: "venta" },
  { label: "Alquiler", value: "alquiler" },
];

export const CATEGORIA_EN_POZO = "departamento-en-pozo";

// Los desarrollos en pozo no tienen un precio fijo — se ocultan en todo el sitio.
export function esInversionEnPozo(tipoPropiedad: string | null): boolean {
  return tipoPropiedad !== null && slugify(tipoPropiedad) === CATEGORIA_EN_POZO;
}

// Valores exactos del campo selection x_studio_zona en Odoo.
export const ZONAS = ["Centro", "Norte", "Sur", "Este", "Oeste"];

// Valores exactos del campo x_studio_moneda en Odoo (ver formatPrecio en format.ts).
export const MONEDAS: { label: string; value: string }[] = [
  { label: "Pesos Argentinos", value: "Pesos" },
  { label: "Dólares (USD)", value: "Dolares" },
];