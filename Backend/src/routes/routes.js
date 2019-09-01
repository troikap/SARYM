'use strict'

var express = require('express');  
var router = express.Router();

//sincronizador
require('../database/sincronizar-bd');

var UsuarioController = require('../class/usuario/usuario-controller');
var EstadoUsuarioController = require('../class/estadousuario/estadousuario-controller');
// var UsuarioEstadoController = require('../class/usuarioestado/usuarioestado-controller');

router
// usuario
    .get('/usuario', UsuarioController.getAll )
    .post('/usuario', UsuarioController.create)
    .get('/usuario/:idUsuario', UsuarioController.getOne)
    .post('/usuario/:idUsuario', UsuarioController.validateUser,UsuarioController.delete,UsuarioController.stateDelete)
    .delete('/usuario/:idUsuario', UsuarioController.destroy)
   

// estadousuario
    .get('/estadousuario', EstadoUsuarioController.getAll)
    .post('/estadousuario', EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.delete)
    .delete('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.destroy)

// usuarioestado
//     .get('/usuarioestado', UsuarioEstadoController.getAll)
//     .post('/usuarioestado', UsuarioEstadoController.create)
//     .get('/usuarioestado/:idEstadoUsuario', UsuarioEstadoController.getOne)
//     .post('/usuarioestado/:idEstadoUsuario', UsuarioEstadoController.delete)
//     .delete('/usuarioestado/:idEstadoUsuario', UsuarioEstadoController.destroy)

// //use
    .use(EstadoUsuarioController.error404)
    .use(UsuarioController.error404)
//     .use(UsuarioEstadoController.error404)


module.exports = router