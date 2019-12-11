import { Time } from '@angular/common';

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

export interface UsuarioEstado {
    descripcionUsuarioEstado: String,
    fechaYHoraAltaUsuarioEstado: Date,
    fechaYHoraBajaUsuarioEstado: Date
};

export interface EstadoUsuario {
    idEstadoUsuario: Number,
    nombreEstadoUsuario: String
};

export interface RolUsuario {
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

export interface UnidadMedida {
    idUnidadMedida: Number,
    codUnidadMedida: String,
    nombreUnidadMedida: String,
    descripcionUnidadMedida: String,
    caracterUnidadMedida: String,
  }

export interface Caja {
    idCaja: Number,
    nroCaja: Number,
    cajaestados: CajaEstado[],
    usuario: Usuario
}

export interface CajaEstado {
    idCajaEstado: Number,
    descripcionCajaEstado: String,
    montoAperturaCajaEstado: Number,
    montoCierreCajaEstado: Number,
    fechaYHoraAltaCajaEstado: Date,
    fechaYHoraBajaCajaEstado: Date,
    estadocaja: EstadoCaja
}

export interface EstadoCaja {
    idEstadoCaja: Number,
    codEstadoCaja: String,
    nombreEstadoCaja: String,
}

export interface Mesa {
    idMesa: Number,
    nroUbicacion: Number,
    nroMesa: Number,
    capacidadMesa: Number,
    sector?: Sector
}

export interface Sector {
    idSector: Number,
    codSector: String,
    nombreSector: String,
    fechaYHoraBajaSector: Date
}

export interface MesaEstado {
    idMesaEstado: Number,
    idMesa: Number,
    idEstadoMesa: Number,
    fechaYHoraAltaMesaEstado: Date,
    fechaYHoraBajaMesaEstado: Date
}

export interface EstadoMesa {
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
    precioproductos: PrecioProducto[],

}

export interface Rubro {
    idRubro: Number,
    codRubro: String,
    nombreRubro: String,
    descripcionRubro: String,
}

export interface ProductoEstado {
    idProductoEstado: Number,
    descripcionProductoEstado: String,
    fechaYHoraAltaProductoEstado: Date,
    fechaYHoraBajaProductoEstado: Date
}

export interface EstadoProducto {
    idEstadoProducto: Number,
    codEstadoProducto: String,
    nombreEstadoProducto: String,
}

export interface PrecioProducto {
    idPrecioProducto: Number,
    importePrecioProducto: Number,
    fechaYHoraDesdePrecioProducto: Date,
    fechaYHoraHastaPrecioProducto: Date
}

export interface TipoMoneda {
    idTipoMoneda: Number,
    nombreTipoMoneda: String
    simboloTipoMoneda: String
}

export interface MenuPromocion {
    idMenuPromocion: Number,
    codMenuPromocion: String,
    nombreMenuPromocion: String,
    descripcionMenuPromocion: String,
    pathImagenMenuPromocion: String,
    preciomenupromocions: PrecioMenuPromocion[],
}

export interface TipoMenuPromocion {
    idTipoMenuPromocion: Number,
    nombreTipoMenuPromocion: String,
}

export interface MenuPromocionEstado {
    idMenuPromocionEstado: Number,
    descripcionMenuPromocionEstado: String,
    fechaYHoraAltaMenuPromocionEstado: Date,
    fechaYHoraBajaMenuPromocionEstado: Date
}

export interface EstadoMenuPromocion {
    idEstadoMenuPromocion: Number,
    codEstadoMenuPromocion: String,
    nombreEstadoMenuPromocion: String,
}

export interface PrecioMenuPromocion {
    idPrecioMenuPromocion: Number,
    importePrecioMenuPromocion: Number,
    fechaYHoraDesdePrecioMenuPromocion: Date,
    fechaYHoraHastaPrecioMenuPromocion: Date
}

export interface DetalleMenuPromocionProducto {
    idDetalleMenuPromocionProducto: Number,
    cantidadProductoMenuPromocion: Number,
}

export interface TipoMovimientoCaja {
    idTipoMovimientoCaja: Number,
    nombreTipoMovimientoCaja: String,
}

export interface MovimientoCaja {
    idMovimientoCaja: Number,
    fechaYHoraMovimientoCaja: Date,
    idUsuario: Number,
    montoMovimientoCaja: Number,
    descripcionMovimientoCaja: String,
}

export interface DetallePedidoProducto {
    idDetallePedidoProducto: Number,
    cantidadPedidoProducto:Number,
    fechaYhoraEntregaPedidoProducto: Date,
    fechaYHoraInicioPedidoProducto: Date,
    producto: Producto,
    menupromocion: MenuPromocion,
}

export interface Comensal {
    idComensal?: Number,
    aliasComensal: String,
    edadComensal: Number,
    idUsuario?: Number,
    cuitUsuario?: Number,
    usuario?: Usuario,
    baja?: Boolean,
}

export interface PedidoEstado {
    idPedidoEstado: Number,
    descripcionPedidoEstado: String,
    fechaYHoraAltaPedidoEstado: Date,
    fechaYHoraBajaPedidoEstado: Date,
    idPedido: Number,
    idEstadoPedido: Number,
    estadopedido?: EstadoPedido
}

export interface EstadoPedido {
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
    detallereservamesas?: DetalleReservaMesa[],
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

export interface EstadoReserva {
    idEstadoReserva: Number,
    codEstadoReserva: String,
    nombreEstadoReserva: String,
}

export interface DetalleReservaMesa {
    idDetalleReservaMesa: Number,
    idMesa?: Number,
    idReserva?: Number
}

export interface Estadia {
    idEstadia?: Number,
    cantPersonas: Number,
    fechaYHoraInicioEstadia: Date,
    fechaYHoraFinEstadia: Date,
    tokenEstadia: String,
    comensals?: Comensal[],
    detalleestadiamesas?: DetalleEstadiaMesa[],
    pedidos?: Pedido[],
    estadiaestados?: EstadiaEstado,
}

export interface EstadiaEstado {
    idEstadiaEstado: Number,
    descripcionEstadiaEstado: String,
    fechaYHoraAltaEstadiaEstado: Date,
    fechaYHoraBajaEstadiaEstado: Date
}

export interface EstadoEstadia {
    idEstadoEstadia: Number,
    codEstadoEstadia: String,
    nombreEstadoEstadia: String,
}

export interface DetalleEstadiaMesa {
    idDetalleEstadiaMesa: Number,
    idMesa?: Number,
    idEstadia?: Number,
    mesa?: Mesa
}

export interface ClienteEstadia {
    idClienteEstadia: Number,
    idUsuario: Number,
    idEstadia: Number,
}

export interface MozoEstadia {
    idMozoEstadia: Number,
    idUsuario: Number,
    fechaYHoraInicioMozoEstadia: Date,
    fechaYHoraFinMozoEstadia: Date
}

export interface Pago {
    idPago: Number,
    idMedioPago: Number,
    idComensal: Number,
    codPago: String,
    importeTotalAPagar: Number,
    fechaYHoraAltaPago: Date
}

export interface PagoPedido {
    idPagoPedido: Number,
    importePagoPedido: Number,
}

export interface MedioPago {
    idMedioPago: Number,
    nombreMedioPago: String,
}

export interface Pedido {
    idPedido: Number,
    idComensal: Number,
    idEstadia?: Number,
    idReserva: Number,
    codPedido: String,
    fechaYHoraInicioPedido: Date,
    fechaYHoraFinPedido: Date,
    detallepedidoproductos: DetallePedidoProducto[],
    importeTotal?: Number,
    pedidoestados?: PedidoEstado[]
}