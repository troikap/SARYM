usuario = [
    'idUsuario',
    'cuitUsuario',
    'nombreUsuario',
    'apellidoUsuario',
    'contrasenaUsuario',
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

module.exports = {
    usuario, 
    usuarioestado, 
    estadousuario, 
    rolusuario, 
    rol, 
    departamento,
    unidadmedida,
}