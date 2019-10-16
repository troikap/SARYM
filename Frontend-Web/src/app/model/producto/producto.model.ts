export interface Producto {
    idProducto?: number,
    codProducto: string,
    nombreProducto: string,
    descripcionProducto: string,
    pathImagenProducto: string,
    idRubro?: number,
    idUnidadMedida?: number
  }