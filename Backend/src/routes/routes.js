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
var CajaController = require('../class/caja/caja-controller');
var EstadoCajaController = require('../class/estadocaja/estadocaja-controller');



const { verificaToken } = require('../middlewares/autenticacion');

router

// utiles
    .post('/login', UsuarioController.login)
    .post('/existUser', UsuarioController.validateExistUser)

// usuario
    .get('/usuario', verificaToken, UsuarioController.getAll)
    .post('/usuario', verificaToken, UsuarioController.create)
    .put('/usuario', verificaToken, UsuarioController.update)
    .get('/usuario/:idUsuario', verificaToken, UsuarioController.getOne)
    .get('/usuario/name/:nombreUsuario', verificaToken, UsuarioController.getToName)
    .get('/usuario/cuitUsuario/:cuitUsuario', verificaToken, UsuarioController.getOneCuit)
    .get('/usuario/todo/:anyAttribute', verificaToken, UsuarioController.getToAllAttributes)
    .post('/usuario/:idUsuario', verificaToken, UsuarioController.delete, UsuarioController.changeState)
    .delete('/usuario/:idUsuario', verificaToken, UsuarioController.destroy)
    

// estadousuario
    .get('/estadousuario', verificaToken, EstadoUsuarioController.getAll)
    .post('/estadousuario', verificaToken, EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.delete)
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
    .get('/rol/name/:nombreRol', verificaToken, RolController.getToName)
    .post('/rol/:idRol', verificaToken, RolController.delete)
    .delete('/rol/:idRol', verificaToken, RolController.destroy)

// producto
    .get('/producto', verificaToken, ProductoController.getAll)
    .get('/producto/:idProducto', verificaToken, ProductoController.getOne)

// promocion
    .get('/menupromocion', verificaToken, MenuPromocionController.getAll)
    .get('/menupromocion/:idMenuPromocion', verificaToken, MenuPromocionController.getOne)

// mesa
    .get('/mesa', verificaToken, MesaController.getAll)
    .get('/mesa/:idMesa', verificaToken, MesaController.getOne)

// tipomoneda
    .get('/tipomoneda', verificaToken, TipoMonedaController.getAll)
    .post('/tipomoneda', verificaToken, TipoMonedaController.create)
    .get('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.getOne)
    .get('/tipomoneda/name/:nombreTipoMoneda', verificaToken, TipoMonedaController.getToName)
    .post('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.delete)
    .delete('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.destroy)

// unidadmedida
    .get('/unidadmedida', verificaToken, UnidadMedidaController.getAll)
    .post('/unidadmedida', verificaToken, UnidadMedidaController.create)
    .put('/unidadmedida', verificaToken, UnidadMedidaController.update)
    .get('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.getOne)
    .get('/unidadmedida/name/:nombreUnidadMedida', verificaToken, UnidadMedidaController.getToName)
    .get('/unidadmedida/todo/:anyAttribute', verificaToken, UnidadMedidaController.getToAllAttributes)
    .post('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.delete)
    .delete('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.destroy)

// rubro
    .get('/rubro', verificaToken, RubroController.getAll)
    .post('/rubro', verificaToken, RubroController.create)
    .get('/rubro/:idRubro', verificaToken, RubroController.getOne)
    .get('/rubro/name/:nombreRubro', verificaToken, RubroController.getToName)
    .get('/rubro/todo/:anyAttribute', verificaToken, RubroController.getToAllAttributes)
    .post('/rubro/:idRubro', verificaToken, RubroController.delete)
    .delete('/rubro/:idRubro', verificaToken, RubroController.destroy)

// sector
    .get('/sector', verificaToken, SectorController.getAll)
    .post('/sector', verificaToken, SectorController.create)
    .get('/sector/:idSector', verificaToken, SectorController.getOne)
    .get('/sector/name/:nombreSector', verificaToken, SectorController.getToName)
    .get('/sector/todo/:anyAttribute', verificaToken, SectorController.getToAllAttributes)
    .post('/sector/:idSector', verificaToken, SectorController.delete)
    .delete('/sector/:idSector', verificaToken, SectorController.destroy)

// caja
    .get('/caja', verificaToken, CajaController.getAll)
    .post('/caja', verificaToken, CajaController.create)
    .get('/caja/:idCaja', verificaToken, CajaController.getOne)
    .get('/caja/name/:nroCaja', verificaToken, CajaController.getToName)
    .get('/caja/todo/:anyAttribute', verificaToken, CajaController.getToAllAttributes)
    .post('/caja/:idCaja', verificaToken, CajaController.delete)
    .delete('/caja/:idCaja', verificaToken, CajaController.destroy)

// estadocaja
    .get('/estadocaja', verificaToken, EstadoCajaController.getAll)
    .post('/estadocaja', verificaToken, EstadoCajaController.create)
    .get('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.getOne)
    .post('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.delete)
    .delete('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.destroy)


// use
    .use(EstadoUsuarioController.error404)
    .use(UsuarioController.error404)
    .use(DepartamentoController.error404)
    .use(RolController.error404)
    .use(ProductoController.error404)
    .use(TipoMonedaController.error404)
    .use(UnidadMedidaController.error404)
    .use(RubroController.error404)
    .use(SectorController.error404)
    .use(CajaController.error404)

module.exports = router