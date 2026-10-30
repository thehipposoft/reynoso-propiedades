// Subir el número cuando cambie la lógica de la marca de agua:
// cambia la URL de las fotos e invalida el cache (navegador, CDN y next/image).
export const WATERMARK_VERSION = 2;
export const WATERMARK_QUERY = `?v=${WATERMARK_VERSION}`;
