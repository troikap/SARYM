'use strict'

var express = require('express');  
var router = express.Router();

// traer lo global
require('../config');

//sincronizador
require('../database/sincronizar-bd');

var UsuarioController = require('../class/usuario/usuario-controller');
var EstadoUsuarioController = require('../class/estadousuario/estadousuario-controller');
var DepartamentoController = require('../class/departamento/departamento-controller');
var RolController = require('../class/rol/rol-controller');
const { verificaToken } = require('../middlewares/autenticacion');

router

// login
    .post('/login', UsuarioController.login)

// usuario
    .post('/usuario/logueo', UsuarioController.logueo)
    .get('/usuario', verificaToken , UsuarioController.getAll )
    .post('/usuario',verificaToken, UsuarioController.create)
    .put('/usuario', verificaToken, UsuarioController.update)
    .get('/usuario/:idUsuario', verificaToken, UsuarioController.getOne)
    .post('/usuario/:idUsuario', verificaToken, UsuarioController.validateUser,UsuarioController.delete,UsuarioController.changeState)
    .delete('/usuario/:idUsuario', verificaToken, UsuarioController.destroy)
   

// estadousuario
    .get('/estadousuario', verificaToken, EstadoUsuarioController.getAll)
    .post('/estadousuario', verificaToken,  EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', verificaToken,  EstadoUsuarioController.delete)
    .delete('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.destroy)

// departamento
    .get('/departamento', verificaToken, DepartamentoController.getAll)
    .post('/departamento', verificaToken, DepartamentoController.create)
    .get('/departamento/:idDepartamento', verificaToken, DepartamentoController.getOne)
    .post('/departamento/:idDepartamento', verificaToken, DepartamentoController.delete)
    .delete('/departamento/:idDepartamento', verificaToken, DepartamentoController.destroy)

// rol
    .get('/rol', verificaToken, RolController.getAll)
    .post('/rol', verificaToken, RolController.create)
    .get('/rol/:idRol', verificaToken, RolController.getOne)
    .post('/rol/:idRol', verificaToken, RolController.delete)
    .delete('/rol/:idRol', verificaToken, RolController.destroy)

// //use
    .use(EstadoUsuarioController.error404)
    .use(UsuarioController.error404)
    .use(DepartamentoController.error404)
    .use(RolController.error404)



module.exports = router