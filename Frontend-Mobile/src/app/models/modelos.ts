import { Time } from '@angular/common';
import { MenuPromocion } from '../services/menupromocion/menupromocion.model';

export interface Usuario {
    idUsuario: Number,
    cuitUsuario: String,
    nombreUsuario: String,
    apellidoUsuario: String,
    dniUsuario: Number,
    domicilioUsuario: String,
    emailUsuario: String,
    idDepartamento: Number,
    nroCelularUsuario: Number,
    nroTelefonoUsuario: Number,
}

export interface Usuario2 {
    idUsuario: Number,
    cuitUsuario: String,
    nombreUsuario: String,
    apellidoUsuario: String,
    dniUsuario: Number,
    domicilioUsuario: String,
    emailUsuario: String,
    idDepartamento: Number,
    nroCelularUsuario: Number,
    nroTelefonoUsuario: Number,
};

export interface Usuarioestado {
    descripcionUsuarioEstado: String,
    fechaYHoraAltaUsuarioEstado: Date,
    fechaYHoraBajaUsuarioEstado: Date
};

export interface Estadousuario {
    idEstadoUsuario: Number,
    nombreEstadoUsuario: String
};

export interface Rolusuario {
    fechaYHoraAltaRolUsuario: Date,
    fechaYHoraBajaRolUsuario: Date
};

export interface Rol {
    idRol: Number,
    nombreRol: String
}

export interface Departamento {
    idDepartamento: Number,
    nombreDepartamento: String
}

export interface Unidadmedida {
    idUnidadMedida: Number,
    codUnidadMedida: String,
    nombreUnidadMedida: String,
    descripcionUnidadMedida: String,
    caracterUnidadMedida: String,
  }

export interface Caja {
    idCaja: Number,
    nroCaja: Number,
}

export interface Cajaestado {
    idCajaEstado: Number,
    descripcionCajaEstado: String,
    montoAperturaCajaEstado: Number,
    montoCierreCajaEstado: Number,
    fechaYHoraAltaCajaEstado: Date,
    fechaYHoraBajaCajaEstado: Date
}

export interface Estadocaja {
    idEstadoCaja: Number,
    codEstadoCaja: String,
    nombreEstadoCaja: String,
}

export interface Mesa {
    idMesa: Number,
    nroUbicacion: Number,
    nroMesa: Number,
    capacidadMesa: Number,
}

export interface Sector {
    idSector: Number,
    codSector: String,
    nombreSector: String,
    fechaYHoraBajaSector: Date
}

export interface Mesaestado {
    idMesaEstado: Number,
    idMesa: Number,
    idEstadoMesa: Number,
    fechaYHoraAltaMesaEstado: Date,
    fechaYHoraBajaMesaEstado: Date
}

export interface Estadomesa {
    idEstadoMesa: Number,
    codEstadoMesa: String,
    nombreEstadoMesa: String,
    colorEstadoMesa: String,
}

export interface Producto {
    idProducto: Number,
    codProducto: String,
    cantidadMedida: Number,
    nombreProducto: String,
    descripcionProducto: String,
    pathImagenProducto: String,
    precioproductos: Precioproducto[],

}

export interface Rubro {
    idRubro: Number,
    codRubro: String,
    nombreRubro: String,
    descripcionRubro: String,
}

export interface Productoestado {
    idProductoEstado: Number,
    descripcionProductoEstado: String,
    fechaYHoraAltaProductoEstado: Date,
    fechaYHoraBajaProductoEstado: Date
}

export interface Estadoproducto {
    idEstadoProducto: Number,
    codEstadoProducto: String,
    nombreEstadoProducto: String,
}

export interface Precioproducto {
    idPrecioProducto: Number,
    importePrecioProducto: Number,
    fechaYHoraDesdePrecioProducto: Date,
    fechaYHoraHastaPrecioProducto: Date
}

export interface Tipomoneda {
    idTipoMoneda: Number,
    nombreTipoMoneda: String
    simboloTipoMoneda: String
}

export interface Menupromocion {
    idMenuPromocion: Number,
    codMenuPromocion: String,
    nombreMenuPromocion: String,
    descripcionMenuPromocion: String,
    pathImagenMenuPromocion: String,
    preciomenupromocions: Preciomenupromocion[],
}

export interface Tipomenupromocion {
    idTipoMenuPromocion: Number,
    nombreTipoMenuPromocion: String,
}

export interface Menupromocionestado {
    idMenuPromocionEstado: Number,
    descripcionMenuPromocionEstado: String,
    fechaYHoraAltaMenuPromocionEstado: Date,
    fechaYHoraBajaMenuPromocionEstado: Date
}

export interface Estadomenupromocion {
    idEstadoMenuPromocion: Number,
    codEstadoMenuPromocion: String,
    nombreEstadoMenuPromocion: String,
}

export interface Preciomenupromocion {
    idPrecioMenuPromocion: Number,
    importePrecioMenuPromocion: Number,
    fechaYHoraDesdePrecioMenuPromocion: Date,
    fechaYHoraHastaPrecioMenuPromocion: Date
}

export interface Detallemenupromocionproducto {
    idDetalleMenuPromocionProducto: Number,
    cantidadProductoMenuPromocion: Number,
}

export interface Tipomovimientocaja {
    idTipoMovimientoCaja: Number,
    nombreTipoMovimientoCaja: String,
}

export interface Movimientocaja {
    idMovimientoCaja: Number,
    fechaYHoraMovimientoCaja: Date,
    idUsuario: Number,
    montoMovimientoCaja: Number,
    descripcionMovimientoCaja: String,
}

export interface Pedido {
    idPedido: Number,
    codPedido: String,
    fechaYHoraFinPedido: Date,
    fechaYHoraInicioPedido: Date,
    detallepedidoproductos: Detallepedidoproducto[]
}

export interface Detallepedidoproducto {
    idDetallePedidoProducto: Number,
    cantidadPedidoProducto:Number,
    fechaYhoraEntregaPedidoProducto: Date,
    fechaYHoraInicioPedidoProducto: Date,
    producto: Producto,
    menupromocion: Menupromocion,
}

export interface Comensal {
    idComensal?: Number,
    aliasComensal: String,
    edadComensal: Number,
    idUsuario: Number,
    cuitUsuario?: Number,
    usuario?: Usuario
}

export interface Pedidoestado {
    idPedidoEstado: Number,
    descripcionPedidoEstado: String,
    fechaYHoraAltaPedidoEstado: Date,
    fechaYHoraBajaPedidoEstado: Date
}

export interface Estadopedido {
    idEstadoPedido: Number,
    codEstadoPedido: String,
    nombreEstadoPedido: String,
}

export interface Reserva {
    idReserva?: Number,
    codReserva: String,
    cantPersonas: Number,
    fechaReserva: Date,
    horaEntradaReserva: Time,
    horaSalidaReserva: Time,
    tokenReserva: String,
    comensals?: Comensal[],
    detallereservamesas?: Detallereservamesa[],
    pedidos?: Pedido[],
    reservaestados?: ReservaEstado,
    usuario?: Usuario,
}

export interface ReservaEstado {
    idReservaEstado: Number,
    descripcionReservaEstado: String,
    fechaYHoraAltaReservaEstado: Date,
    fechaYHoraBajaReservaEstado: Date
}

export interface Estadoreserva {
    idEstadoReserva: Number,
    codEstadoReserva: String,
    nombreEstadoReserva: String,
}

export interface Detallereservamesa {
    idDetalleReservaMesa: Number,
    idMesa?: Number,
    idReserva?: Number
}

export interface Estadia {
    idEstadia: Number,
    cantPersonas: Number,
    fechaYHoraInicioEstadia: Date,
    fechaYHoraFinEstadia: Date,
    tokenEstadia: String,
}

export interface Estadiaestado {
    idEstadiaEstado: Number,
    descripcionEstadiaEstado: String,
    fechaYHoraAltaEstadiaEstado: Date,
    fechaYHoraBajaEstadiaEstado: Date
}

export interface Estadoestadia {
    idEstadoEstadia: Number,
    codEstadoEstadia: String,
    nombreEstadoEstadia: String,
}

export interface Detalleestadiamesa {
    idDetalleEstadiaMesa: Number,
}

export interface Clienteestadia {
    idClienteEstadia: Number,
    idUsuario: Number,
    idEstadia: Number,
}

export interface Mozoestadia {
    idMozoEstadia: Number,
    idUsuario: Number,
    fechaYHoraInicioMozoEstadia: Date,
    fechaYHoraFinMozoEstadia: Date
}

export interface Pago {
    idPago: Number,
    idMedioPago: Number,
    codPago: String,
    importeTotalAPagar: Number,
    fechaYHoraAltaPago: Date
}

export interface Pagopedido {
    idPagoPedido: Number,
    importePagoPedido: Number,
}

export interface Mediopago {
    idMedioPago: Number,
    nombreMedioPago: String,
}