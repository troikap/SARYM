import { Producto } from "../producto/producto.model"

export interface MenuPromocion {
    idMenuPromocion: number,
    codMenuPromocion: string,
    nombreMenuPromocion: string,
    descripcionMenuPromocion: string,
    pathImagenMenuPromocion: string,
    tipomenupromocion: {
        idTipoMenuPromocion: number,
        nombreTipoMenuPromocion: string
    },
    menupromocionestados: [
        {
            idMenuPromocionEstado: number,
            descripcionMenuPromocionEstado: string,
            fechaYHoraAltaMenuPromocionEstado: Date,
            fechaYHoraBajaMenuPromocionEstado: Date,
            estadomenupromocion: {
                idEstadoMenuPromocion: number,
                codEstadoMenuPromocion: string,
                nombreEstadoMenuPromocion: string
            }
        }
    ],
    preciomenupromocions: [
        {
            idPrecioMenuPromocion: number,
            importePrecioMenuPromocion: number,
            fechaYHoraDesdePrecioMenuPromocion: Date,
            fechaYHoraHastaPrecioMenuPromocion: Date,
            tipomoneda: {
                idTipoMoneda: number,
                nombreTipoMoneda: string,
                simboloTipoMoneda: string
            }
        }
    ],
    detallemenupromocionproductos: [
        {
            idDetalleMenuPromocionProducto: number,
            cantidadProductoMenuPromocion: number,
            producto: Producto
        }
    ]
  }