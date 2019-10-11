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
var ProductoController = require('../class/producto/producto-controller');
var MenuPromocionController = require('../class/menupromocion/menupromocion-controller');
var MesaController = require('../class/mesa/mesa-controller');
var TipoMonedaController = require('../class/tipomoneda/tipomoneda-controller');
var UnidadMedidaController = require('../class/unidadmedida/unidadmedida-controller');
var RubroController = require('../class/rubro/rubro-controller');
var SectorController = require('../class/sector/sector-controller');

SectorController




const { verificaToken } = require('../middlewares/autenticacion');

router

// utiles
    .post('/login', UsuarioController.login)
    .post('/existUser', UsuarioController.validateExistUser)
    
// usuario
    .post('/usuario/logueo', UsuarioController.logueo)
    .get('/usuario' , UsuarioController.getAll )
    .post('/usuario',verificaToken, UsuarioController.create)
    .put('/usuario', verificaToken, UsuarioController.update)
    .get('/usuario/:idUsuario', UsuarioController.getOne)
    .get('/usuario/cuitUsuario/:cuitUsuario', UsuarioController.getOneCuit)
    .post('/usuario/:idUsuario', verificaToken, UsuarioController.validateUser,UsuarioController.delete,UsuarioController.changeState)
    .delete('/usuario/:idUsuario', verificaToken, UsuarioController.destroy)

// estadousuario
    .get('/estadousuario',  EstadoUsuarioController.getAll)
    .post('/estadousuario', verificaToken,  EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', verificaToken,  EstadoUsuarioController.delete)
    .delete('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.destroy)

// departamento
    .get('/departamento', DepartamentoController.getAll)
    .post('/departamento', verificaToken, DepartamentoController.create)
    .get('/departamento/:idDepartamento', DepartamentoController.getOne)
    .post('/departamento/:idDepartamento', verificaToken, DepartamentoController.delete)
    .delete('/departamento/:idDepartamento', verificaToken, DepartamentoController.destroy)

// rol
    .get('/rol', RolController.getAll)
    .post('/rol', verificaToken, RolController.create)
    .get('/rol/:idRol', verificaToken, RolController.getOne)
    .post('/rol/:idRol', verificaToken, RolController.delete)
    .delete('/rol/:idRol', verificaToken, RolController.destroy)

// producto
    .get('/producto', ProductoController.getAll)
    .get('/producto/:idProducto', ProductoController.getOne)

// promocion
    .get('/menupromocion', MenuPromocionController.getAll)
    .get('/menupromocion/:idMenuPromocion', MenuPromocionController.getOne)

// mesa
    .get('/mesa', MesaController.getAll)
    .get('/mesa/:idMesa', MesaController.getOne)

// tipomoneda
    .get('/tipomoneda', TipoMonedaController.getAll)
    .post('/tipomoneda', verificaToken, TipoMonedaController.create)
    .get('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.getOne)
    .post('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.delete)
    .delete('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.destroy)

// unidadmedida
    .get('/unidadmedida', UnidadMedidaController.getAll)
    .post('/unidadmedida', verificaToken, UnidadMedidaController.create)
    .get('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.getOne)
    .post('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.delete)
    .delete('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.destroy)

// rubro
    .get('/rubro', RubroController.getAll)
    .post('/rubro', verificaToken, RubroController.create)
    .get('/rubro/:idRubro', verificaToken, RubroController.getOne)
    .post('/rubro/:idRubro', verificaToken, RubroController.delete)
    .delete('/rubro/:idRubro', verificaToken, RubroController.destroy)

// sector
    .get('/sector', SectorController.getAll)
    .post('/sector', verificaToken, SectorController.create)
    .get('/sector/:idSector', verificaToken, SectorController.getOne)
    .post('/sector/:idSector', verificaToken, SectorController.delete)
    .delete('/sector/:idSector', verificaToken, SectorController.destroy)


// use
    .use(EstadoUsuarioController.error404)
    .use(UsuarioController.error404)
    .use(DepartamentoController.error404)
    .use(RolController.error404)
    .use(ProductoController.error404)
    .use(TipoMonedaController.error404)
    .use(UnidadMedidaController.error404)
    .use(RubroController.error404)


module.exports = router