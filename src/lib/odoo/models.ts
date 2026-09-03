export const ODOO_MODELS = {
  PROPIEDAD: 'x_propiedades',
  GALERIA_LINE: 'x_propiedades_line_0c77d',
  TIPO_PROPIEDAD: 'x_tipo_de_propiedades',
  RES_USERS: 'res.users',
} as const;

export const ODOO_FIELDS = {
  ESTADO: 'x_studio_estado_de_la_propiedad',
  ESTADO_PUBLICACION: 'x_studio_estado_de_publicacin',
  DRIVE_LINK: 'x_studio_cdigo',
  PRECIO: 'x_studio_precio',
  MONEDA: 'x_studio_moneda',
  TIPO_PROPIEDAD: 'x_studio_many2one_field_msMGl',
  BARRIO: 'x_studio_barrio',
  LOCALIDAD: 'x_studio_localidad',
  DOMICILIO: 'x_studio_domicilio',
  AMBIENTES: 'x_studio_ambientes',
  DORMITORIOS: 'x_studio_dormitorios',
  BANOS: 'x_studio_baos',
  BANOS_ALT: 'x_studio_baos_1',
  SUPERFICIE_CUBIERTA: 'x_studio_superficie_cubierta_m2',
  SUPERFICIE_TOTAL: 'x_studio_metros_cuadrados_construidos',
  FOTO_PORTADA: 'x_studio_imagenes',
  DESCRIPCION: 'x_studio_descripcin_1',
  GALERIA: 'x_studio_galeria_2',
  GALERIA_SEQUENCE: 'x_studio_sequence',
  GALERIA_IMAGEN: 'x_studio_imagen_1',
  RESPONSABLE: 'x_studio_responsable',
  ZONA: 'x_studio_zona',
} as const;

export const ESTADO_PUBLICADO = 'Publicado';

// Interruptor único: mientras Reynoso termina de cargar "Estado de Publicación"
// en el catálogo existente, lo dejamos en false para no ocultar nada del
// sitio. El día que confirmen que todo está cargado, cambiar a true y
// deployar — es el único cambio de código necesario para activar el filtro.
export const FILTRAR_SOLO_PUBLICADAS = false;

export type TipoOperacion = 'venta' | 'alquiler';

// "Estado" en Odoo mezcla disponibilidad + tipo de operación en un solo campo.
// Acá solo mapeamos los casos inequívocos. "Señado" / "Reservada" / "En Oportunidad"
// quedan afuera hasta confirmar con Reynoso si deben mostrarse en el sitio público.
export const ESTADOS_POR_OPERACION: Record<TipoOperacion, string[]> = {
  venta: ['En Venta'],
  alquiler: ['En Alquiler'],
};

export function estadosDisponiblesParaOperacion(operacion?: TipoOperacion): string[] {
  if (operacion) return ESTADOS_POR_OPERACION[operacion];
  return [...ESTADOS_POR_OPERACION.venta, ...ESTADOS_POR_OPERACION.alquiler];
}