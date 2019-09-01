'use strict'

var express = require('express');  
var router = express.Router();

//sincronizador
require('../database/sincronizar-bd');

var UsuarioController = require('../class/usuario/usuario-controller');
var EstadoUsuarioController = require('../class/estadousuario/estadousuario-controller');
var DepartamentoController = require('../class/departamento/departamento-controller');
var RolController = require('../class/rol/rol-controller');

router
// usuario
    .get('/usuario', UsuarioController.getAll )
    .post('/usuario', UsuarioController.create)
    .get('/usuario/:idUsuario', UsuarioController.getOne)
    .post('/usuario/:idUsuario', UsuarioController.validateUser,UsuarioController.delete,UsuarioController.changeState)
    .delete('/usuario/:idUsuario', UsuarioController.destroy)
   

// estadousuario
    .get('/estadousuario', EstadoUsuarioController.getAll)
    .post('/estadousuario', EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.delete)
    .delete('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.destroy)

// departamento
    .get('/departamento', DepartamentoController.getAll)
    .post('/departamento', DepartamentoController.create)
    .get('/departamento/:idDepartamento', DepartamentoController.getOne)
    .post('/departamento/:idDepartamento', DepartamentoController.delete)
    .delete('/departamento/:idDepartamento', DepartamentoController.destroy)

// rol
    .get('/rol', RolController.getAll)
    .post('/rol', RolController.create)
    .get('/rol/:idRol', RolController.getOne)
    .post('/rol/:idRol', RolController.delete)
    .delete('/rol/:idRol', RolController.destroy)

// //use
    .use(EstadoUsuarioController.error404)
    .use(UsuarioController.error404)
    .use(DepartamentoController.error404)
    .use(RolController.error404)



module.exports = router