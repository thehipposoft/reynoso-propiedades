export interface Propiedad {
  id: number;
  slug: string;
  estado: string;            // status
  titulo: string;            // title.rendered
  descripcion: string;       // content.rendered (HTML)
  imagen_destacada: string;  // _embedded.wp:featuredmedia[0].source_url
  galeria_urls: string[];

  propiedad_precio: string;
  propiedad_moneda: string;  // property_label_before
  propiedad_superficie: string;       // property_size
  propiedad_superficie_lote: string;  // property_lot_size
  propiedad_ambientes: string;        // property_rooms
  propiedad_dormitorios: string;      // property_bedrooms
  propiedad_banos: string;            // property_bathrooms
  propiedad_direccion: string;        // property_address
  propiedad_pais: string;             // property_country
  propiedad_latitud: string;          // property_latitude
  propiedad_longitud: string;         // property_longitude
  categoria: string;                  // class_list → property_category-*
  tipo: string;                       // class_list → property_action_category-*
}

// Shape cruda que devuelve la API (parcial — solo campos que consumimos)
export interface PropiedadRaw {
  id: number;
  slug: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  galeria_urls: string[];
  property_price: string;
  property_label_before: string;
  property_size: string;
  property_lot_size: string;
  property_rooms: string;
  property_bedrooms: string;
  property_bathrooms: string;
  property_address: string;
  property_country: string;
  property_latitude: string;
  property_longitude: string;
  class_list: string[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
}
