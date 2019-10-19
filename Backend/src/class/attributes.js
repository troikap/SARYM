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

module.exports = {
    usuario, 
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
    tipomoneda
}