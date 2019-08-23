'use strict'

var express = require('express');  
var router = express.Router();

var UsuarioController = require('../controllers/usuario/usuario-controller');
var EstadoUsuarioController = require('../controllers/estadousuario/estadousuario-controller');
    
//usuario
router
    .get('/usuario', UsuarioController.getAll)
    .post('/usuario', UsuarioController.save)
    .get('/usuario/:idUsuario', UsuarioController.getOne)
    .post('/usuario/baja/:idUsuario', UsuarioController.bajalogica)
    .delete('/usuario/:idUsuario', UsuarioController.delete)
   

//estadousuario
    .get('/estadousuario', EstadoUsuarioController.getAll)
    .post('/estadousuario', EstadoUsuarioController.save)
    .get('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.save)
    .delete('/estadousuario/:idEstadoUsuario', EstadoUsuarioController.delete)
    .use(UsuarioController.error404)
    .use(EstadoUsuarioController.error404)


module.exports = router