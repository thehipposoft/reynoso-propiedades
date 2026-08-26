export interface OdooPropiedadFoto {
  id: number;
  url: string;
  descripcion: string | null;
}

export interface OdooPropiedadFoto {
  id: number;
  url: string;
  descripcion: string | null;
}

export interface OdooPropiedad {
  id: number;
  slug: string;
  nombre: string;
  estado: string | null; 
  precio: number | null;
  moneda: string | null;
  tipoPropiedad: string | null;
  zona: string | null;
  direccion: string | null;
  ambientes: string | null;
  dormitorios: string | null;
  banos: string | null;
  superficieCubierta: string | null;
  superficieTotal: string | null;
  descripcion: string | null;
  fotoPortada: string | null;
  fotos: OdooPropiedadFoto[];
}