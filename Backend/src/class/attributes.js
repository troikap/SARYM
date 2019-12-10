usuario = [
    'idUsuario',
    'cuitUsuario',
    'nombreUsuario',
    'apellidoUsuario',
    'dniUsuario',
    'domicilioUsuario',
    'emailUsuario',
    'idDepartamento',
    'nroCelularUsuario',
    'nroTelefonoUsuario',
    'activadoUsuario'
  ];

usuario2 = [
    'idUsuario',
    'cuitUsuario',
    'nombreUsuario',
    'apellidoUsuario',
    'dniUsuario',
    'domicilioUsuario',
    'emailUsuario',
    'idDepartamento',
    'nroCelularUsuario',
    'nroTelefonoUsuario',
    'contrasenaUsuario',
    'activadoUsuario'
];

usuarioestado = [
    'descripcionUsuarioEstado',
    'fechaYHoraAltaUsuarioEstado',
    'fechaYHoraBajaUsuarioEstado'
];

estadousuario = [
    'idEstadoUsuario',
    'nombreEstadoUsuario'
];

rolusuario = [
    'fechaYHoraAltaRolUsuario',
    'fechaYHoraBajaRolUsuario'
];

rol = [
    'idRol',
    'nombreRol'
]

departamento = [
    'idDepartamento',
    'nombreDepartamento'
]

unidadmedida = [
    "idUnidadMedida",
    "codUnidadMedida",
    "nombreUnidadMedida",
    "descripcionUnidadMedida",
    "caracterUnidadMedida",
  ]

caja = [
    "idCaja",
    "nroCaja",
]

cajaestado = [
    "idCajaEstado",
    'descripcionCajaEstado',
    'montoAperturaCajaEstado',
    'montoCierreCajaEstado',
    'fechaYHoraAltaCajaEstado',
    'fechaYHoraBajaCajaEstado',
]

estadocaja = [
    'idEstadoCaja',
    'codEstadoCaja',
    'nombreEstadoCaja',
]

mesa = [
    "idMesa",
    "nroUbicacion",
    "nroMesa",
    "capacidadMesa",
]

sector = [
    "idSector",
    "codSector",
    "nombreSector",
    "fechaYHoraBajaSector",
]

mesaestado = [
    "idMesaEstado",
    "idMesa",
    "idEstadoMesa",
    "fechaYHoraAltaMesaEstado",
    "fechaYHoraBajaMesaEstado",
]

estadomesa = [
    "idEstadoMesa",
    "codEstadoMesa",
    "nombreEstadoMesa",
    "colorEstadoMesa",
]

producto = [
    "idProducto",
    "codProducto",
    "cantidadMedida",
    "nombreProducto",
    "descripcionProducto",
    "pathImagenProducto"
]

rubro = [
    "idRubro",
    "codRubro",
    "nombreRubro",
    "descripcionRubro"
]

productoestado = [
    "idProductoEstado",
    "descripcionProductoEstado",
    "fechaYHoraAltaProductoEstado",
    "fechaYHoraBajaProductoEstado",
]

estadoproducto = [
    "idEstadoProducto",
    "codEstadoProducto",
    "nombreEstadoProducto",
]

precioproducto = [
    "idPrecioProducto",
    "importePrecioProducto",
    "fechaYHoraDesdePrecioProducto",
    "fechaYHoraHastaPrecioProducto",
]

tipomoneda = [
    "idTipoMoneda",
    "nombreTipoMoneda",
    "simboloTipoMoneda",
]

menupromocion = [
    "idMenuPromocion",
    "codMenuPromocion",
    "nombreMenuPromocion",
    "descripcionMenuPromocion",
    "pathImagenMenuPromocion",
]

tipomenupromocion = [
    "idTipoMenuPromocion",
    "nombreTipoMenuPromocion",
]

menupromocionestado = [
    "idMenuPromocionEstado",
    "descripcionMenuPromocionEstado",
    "fechaYHoraAltaMenuPromocionEstado",
    "fechaYHoraBajaMenuPromocionEstado",
]

estadomenupromocion = [
    "idEstadoMenuPromocion",
    "codEstadoMenuPromocion",
    "nombreEstadoMenuPromocion",
]

preciomenupromocion = [
    "idPrecioMenuPromocion",
    "importePrecioMenuPromocion",
    "fechaYHoraDesdePrecioMenuPromocion",
    "fechaYHoraHastaPrecioMenuPromocion",
]

detallemenupromocionproducto = [
    "idDetalleMenuPromocionProducto",
    "cantidadProductoMenuPromocion",
]

tipomovimientocaja = [
    "idTipoMovimientoCaja",
    "nombreTipoMovimientoCaja"
]

movimientocaja = [
    "idMovimientoCaja",
    "fechaYHoraMovimientoCaja",
    "idUsuario",
    "montoMovimientoCaja",
    "descripcionMovimientoCaja",
    "idPago"
]

pedido = [
    "idPedido",
    "codPedido",
    "fechaYHoraFinPedido",
    "fechaYHoraInicioPedido",
    "idEstadia",
    "idReserva",
    "idComensal",
]

detallepedidoproducto = [
    "idDetallePedidoProducto",
    "cantidadPedidoProducto",
    "fechaYhoraEntregaPedidoProducto",
    "fechaYHoraInicioPedidoProducto",
    "idProducto",
    "idMenuPromocion"
]

comensal = [
    "idComensal",
    "aliasComensal",
    "edadComensal",
    "idUsuario",
    "idReserva",
    "idEstadia"
]

comensalAll = [
    "idComensal",
    "aliasComensal",
    "edadComensal",
    "idUsuario",
    "idReserva",
    "idEstadia"
]

pedidoestado = [
    "idPedidoEstado",
    "descripcionPedidoEstado",
    "fechaYHoraAltaPedidoEstado",
    "fechaYHoraBajaPedidoEstado",
    "idEstadoPedido",
    "idPedido",
]

estadopedido = [
    "idEstadoPedido",
    "codEstadoPedido",
    "nombreEstadoPedido"
]

reserva = [
    "idReserva",
    "codReserva",
    "cantPersonas",
    "fechaReserva",
    "horaEntradaReserva",
    "horaSalidaReserva",
    "tokenReserva",
]

reservaestado = [
    "idReservaEstado",
    "descripcionReservaEstado",
    "fechaYHoraAltaReservaEstado",
    "fechaYHoraBajaReservaEstado",
]

estadoreserva = [
    "idEstadoReserva",
    "codEstadoReserva",
    "nombreEstadoReserva",
]

detallereservamesa = [
    "idDetalleReservaMesa",
]

estadia = [
    "idEstadia",
    "cantPersonas",
    "fechaYHoraInicioEstadia",
    "fechaYHoraFinEstadia",
    "tokenEstadia"
]

estadiaestado = [
    "idEstadiaEstado",
    "descripcionEstadiaEstado",
    "fechaYHoraAltaEstadiaEstado",
    "fechaYHoraBajaEstadiaEstado",
]

estadoestadia = [
    "idEstadoEstadia",
    "codEstadoEstadia",
    "nombreEstadoEstadia",
]

detalleestadiamesa = [
    "idDetalleEstadiaMesa",
    "idMesa",
    "idEstadia"
]

clienteestadia = [
    "idClienteEstadia",
    "idUsuario",
    "idEstadia"
]

mozoestadia = [
    "idMozoEstadia",
    "idUsuario",
    "idEstadia",
    "descripcionMozoEstadia",
    "fechaYHoraInicioMozoEstadia",
    "fechaYHoraFinMozoEstadia"
]

pago = [
    "idPago",
    "idMedioPago",
    "codPago",
    "importeTotalAPagar",
    "fechaYHoraAltaPago",
    "confirmado"
]

pagopedido = [
    "idPagoPedido",
    "importePagoPedido",
]

mediopago = [
    "idMedioPago",
    "nombreMedioPago",
]

funcionrol = [
    'idFuncionRol',
    'idFuncion',
    'fechaYHoraAltaFuncionRol',
    'fechaYHoraBajaFuncionRol'
];

funcion = [
    'idFuncion',
    'nombreFuncion'
]

module.exports = {
    usuario, 
    usuario2,
    usuarioestado, 
    estadousuario, 
    rolusuario, 
    rol, 
    departamento,
    unidadmedida,
    caja,
    cajaestado,
    estadocaja,
    mesa,
    mesaestado,
    estadomesa,
    sector,
    producto,
    productoestado,
    estadoproducto,
    rubro,
    precioproducto,
    tipomoneda,
    menupromocion,
    tipomenupromocion,
    menupromocionestado,
    estadomenupromocion,
    preciomenupromocion,
    detallemenupromocionproducto,
    tipomovimientocaja,
    movimientocaja,
    pedido,
    detallepedidoproducto,
    comensal,
    comensalAll,
    pedidoestado,
    estadopedido,
    reserva,
    reservaestado,
    estadoreserva,
    detallereservamesa,
    estadia,
    estadiaestado,
    estadoestadia,
    detalleestadiamesa,
    clienteestadia,
    mozoestadia,
    pago,
    pagopedido,
    mediopago,
    funcionrol,
    funcion
}