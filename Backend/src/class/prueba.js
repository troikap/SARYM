const EstadoUsuarioModelo = require("./estadousuario/estadousuario-model");
const UsuarioModelo = require("./usuario/usuario-model");
const UsuarioEstadoModelo = require("./usuarioestado/usuarioestado-model");

// creo modelos de prueba
EstadoUsuarioModelo.bulkCreate([ //bulkCreate te permite crear de a varios registros a la vez y devolverte los registros que creo
	{ idEstadoUsuario: 1, nombreEstadoUsuario: 'Activo' },
	{ idEstadoUsuario: 2, nombreEstadoUsuario: 'Suspendido' },
	{ idEstadoUsuario: 3, nombreEstadoUsuario: 'Eliminado' }
  ])
  	.then(() => { // Aca devuelve los registros
		
  })

// creo usuarios de prueba
UsuarioModelo.bulkCreate([ //bulkCreate te permite crear de a varios registros a la vez y devolverte los registros que creo
	{ 
    "idUsuario": 1,
    "cuitUsuario": 2036850688, 
    "nombreUsuario": "Lucas", 
    "apellidoUsuario": "Perez", 
    "contrasenaUsuario": "65412294",   
    "dniUsuario": 36850688,
    "domicilioUsuario": "Villa Mercedes 1235",
    "emailUsuario": "lucaz_pato@gmail.com",
    "idDepartamento": 1, 
    "nroCelularUsuario": 4318023,
    "nroTelefonoUsuario": 2613875470
  } ,
	{
    "idUsuario": 2,
    "cuitUsuario": 2036850688, 
    "nombreUsuario": "Roberto", 
    "apellidoUsuario": "Carlos", 
    "contrasenaUsuario": "65412294",   
    "dniUsuario": 36850688,
    "domicilioUsuario": "Villa Mercedes 1235",
    "emailUsuario": "lucaz_pato@gmail.com",
    "idDepartamento": 1, 
    "nroCelularUsuario": 4318023,
    "nroTelefonoUsuario": 2613875470
},
	{
    "idUsuario": 3,
    "cuitUsuario": 2036850688, 
    "nombreUsuario": "Lucas", 
    "apellidoUsuario": "Perez", 
    "contrasenaUsuario": "65412294",   
    "dniUsuario": 36850688,
    "domicilioUsuario": "Villa Mercedes 1235",
    "emailUsuario": "lucaz_pato@gmail.com",
    "idDepartamento": 1, 
    "nroCelularUsuario": 4318023,
    "nroTelefonoUsuario": 2613875470 
  }
  ])
  	.then(() => { // Aca devuelve los registros
		
  })

// creo usuarios de prueba
UsuarioEstadoModelo.bulkCreate([ //bulkCreate te permite crear de a varios registros a la vez y devolverte los registros que creo
	{ 
    "idUsuarioEstado:": 1,
    "idUsuario": 1, 
    "idEstadoUsuario": 1, 
    "descripcionUsuarioEstado": "Perez", 
    "fechaYHoraBajaUsuarioEstado": null,
    "fechaYHoraAltaUsuarioEstado": Date()
  } ,
	{
    "idUsuarioEstado:": 1,
    "idUsuario": 1, 
    "idEstadoUsuario": 1, 
    "descripcionUsuarioEstado": "Perez", 
    "fechaYHoraBajaUsuarioEstado": null,   
    "fechaYHoraAltaUsuarioEstado": Date()
},
	{
    "idUsuarioEstado:": 1,
    "idUsuario": 1, 
    "idEstadoUsuario": 1, 
    "descripcionUsuarioEstado": "Perez", 
    "fechaYHoraBajaUsuarioEstado": null,
    "fechaYHoraAltaUsuarioEstado": Date()
  }
  ])
  	.then(() => { // Aca devuelve los registros
		
  })
