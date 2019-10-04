export interface Producto {
    idProducto: number,
    codProducto: string,
    cantidadMedida: number,
    nombreProducto: string,
    descripcionProducto: string,
    pathImagenProducto: string,
    rubro: {
        idRubro: number,
        codRubro: string,
        nombreRubro: string,
        descripcionRubro: string
    },
    unidadmedida: {
        idUnidadMedida: number,
        codUnidadMedida: string,
        nombreUnidadMedida: string,
        descripcionUnidadMedida: string,
        caracterUnidadMedida: string
    },
    productoestados: [
        {
            idProductoEstado: number,
            descripcionProductoEstado: string,
            fechaYHoraAltaProductoEstado: Date,
            fechaYHoraBajaProductoEstado: Date,
            estadoproducto: {
                idEstadoProducto: number,
                codEstadoProducto: string,
                nombreEstadoProducto: string
            }
        }
    ],
    precioproductos: [
        {
            idPrecioProducto: number,
            importePrecioProducto: number,
            fechaYHoraDesdePrecioProducto: Date,
            fechaYHoraHastaPrecioProducto: Date,
            tipomoneda: {
                idTipoMoneda: number,
                nombreTipoMoneda: string,
                simboloTipoMoneda: string
            }
        }
    ]
  }