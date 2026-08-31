export function formatPrecio(precio: number | null, moneda: string | null): string | null {
  if (precio === null) return null;
  const symbol = moneda === "Dolares" ? "U$D" : moneda === "Pesos" ? "$" : "";
  return `${symbol} ${precio.toLocaleString("es-AR")}`.trim();
}

export function parsePositiveNumber(value: string | null): number | null {
  if (!value) return null;
  const match = value.match(/\d+([.,]\d+)?/);
  if (!match) return null;
  const numero = parseFloat(match[0].replace(",", "."));
  return numero > 0 ? numero : null;
}

export function formatLabel(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function formatTitulo(value: string): string {
  return value
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letra) => letra.toUpperCase());
}

export function operacionDesdeEstado(estado: string | null): string | null {
  if (!estado) return null;
  if (estado === "En Alquiler") return "Alquiler";
  if (estado === "En Venta") return "Venta";
  return estado; // "Vendida", "Reservada", etc. — se muestran tal cual
}