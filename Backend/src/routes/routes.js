'use strict'

var express = require('express');
var router = express.Router();

// traer lo global
require('../config');

//sincronizador
require('../database/sincronizar-bd');

const { verificaToken } = require('../middlewares/autenticacion');

var UsuarioController = require('../class/usuario/usuario-controller');
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
var UbicacionController = require('../class/ubicacion/ubicacion-controller');
var TipoMovimientoCajaController = require('../class/tipomovimientocaja/tipomovimientocaja-controller');
var MedioPagoController = require('../class/mediopago/mediopago-controller');

// estados
var EstadoUsuarioController = require('../class/estadousuario/estadousuario-controller');
var EstadoCajaController = require('../class/estadocaja/estadocaja-controller');
var EstadoEstadiaController = require('../class/estadoestadia/estadoestadia-controller');
var EstadoMenuPromocionController = require('../class/estadomenupromocion/estadomenupromocion-controller');
var EstadoReservaController = require('../class/estadoreserva/estadoreserva-controller');
var EstadoProductoController = require('../class/estadoproducto/estadoproducto-controller');
var EstadoPedidoController = require('../class/estadopedido/estadopedido-controller');
var EstadoMesaController = require('../class/estadomesa/estadomesa-controller');

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

// producto
    .get('/producto', verificaToken, ProductoController.getAll)
    .get('/producto/:idProducto', verificaToken, ProductoController.getOne)
    .get('/producto/name/:nombreProducto', verificaToken, ProductoController.getToName)
    .get('/producto/todo/:anyAttribute', verificaToken, ProductoController.getToAllAttributes)

// promocion
    .get('/menupromocion', verificaToken, MenuPromocionController.getAll)
    .get('/menupromocion/:idMenuPromocion', verificaToken, MenuPromocionController.getOne)
    .get('/menupromocion/name/:nombreMenuPromocion', verificaToken, MenuPromocionController.getToName)
    .get('/menupromocion/todo/:anyAttribute', verificaToken, MenuPromocionController.getToAllAttributes)

// mesa
    .get('/mesa', verificaToken, MesaController.getAll)
    .get('/mesa/:idMesa', verificaToken, MesaController.getOne)

// mediopago
    .get('/mediopago', verificaToken, MedioPagoController.getAll)
    .get('/mediopago/:idMedioPago', verificaToken, MedioPagoController.getOne)
    .get('/mediopago/name/:nombreMedioPago', verificaToken, MedioPagoController.getToName)
    .get('/mediopago/todo/:anyAttribute', verificaToken, MedioPagoController.getToAllAttributes)
    .post('/mediopago', verificaToken, MedioPagoController.create)
    .put('/mediopago', verificaToken, MedioPagoController.update)
    .delete('/mediopago/:idMedioPago', verificaToken, MedioPagoController.destroy)

// tipomovimientocaja
    .get('/tipomovimientocaja', verificaToken, TipoMovimientoCajaController.getAll)
    .get('/tipomovimientocaja/:idTipoMovimientoCaja', verificaToken, TipoMovimientoCajaController.getOne)
    .get('/tipomovimientocaja/name/:nombreTipoMovimientoCaja', verificaToken, TipoMovimientoCajaController.getToName)
    .get('/tipomovimientocaja/todo/:anyAttribute', verificaToken, TipoMovimientoCajaController.getToAllAttributes)
    .post('/tipomovimientocaja', verificaToken, TipoMovimientoCajaController.create)
    .put('/tipomovimientocaja', verificaToken, TipoMovimientoCajaController.update)
    .delete('/tipomovimientocaja/:idTipoMovimientoCaja', verificaToken, TipoMovimientoCajaController.destroy)

// departamento
    .get('/departamento', verificaToken, DepartamentoController.getAll)
    .get('/departamento/:idDepartamento', verificaToken, DepartamentoController.getOne)
    .get('/departamento/name/:nombreDepartamento', verificaToken, DepartamentoController.getToName)
    .get('/departamento/todo/:anyAttribute', verificaToken, DepartamentoController.getToAllAttributes)
    .post('/departamento', verificaToken, DepartamentoController.create)
    .put('/departamento', verificaToken, DepartamentoController.update)
    .delete('/departamento/:idDepartamento', verificaToken, DepartamentoController.destroy)

// rol
    .get('/rol', verificaToken, RolController.getAll)
    .get('/rol/:idRol', verificaToken, RolController.getOne)
    .get('/rol/name/:nombreRol', verificaToken, RolController.getToName)
    .get('/rol/todo/:anyAttribute', verificaToken, RolController.getToAllAttributes)
    .post('/rol', verificaToken, RolController.create)
    .put('/rol', verificaToken, RolController.update)
    .delete('/rol/:idRol', verificaToken, RolController.destroy)

// tipomoneda
    .get('/tipomoneda', verificaToken, TipoMonedaController.getAll)
    .get('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.getOne)
    .get('/tipomoneda/name/:nombreTipoMoneda', verificaToken, TipoMonedaController.getToName)
    .get('/tipomoneda/todo/:anyAttribute', verificaToken, TipoMonedaController.getToAllAttributes)
    .post('/tipomoneda', verificaToken, TipoMonedaController.create)
    .put('/tipomoneda', verificaToken, TipoMonedaController.update)
    .delete('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.destroy)

// unidadmedida
    .get('/unidadmedida', verificaToken, UnidadMedidaController.getAll)
    .post('/unidadmedida', verificaToken, UnidadMedidaController.create)
    .put('/unidadmedida', verificaToken, UnidadMedidaController.update)
    .get('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.getOne)
    .get('/unidadmedida/name/:nombreUnidadMedida', verificaToken, UnidadMedidaController.getToName)
    .get('/unidadmedida/todo/:anyAttribute', verificaToken, UnidadMedidaController.getToAllAttributes)
    .delete('/unidadmedida/:idUnidadMedida', verificaToken, UnidadMedidaController.destroy)

// rubro
    .get('/rubro', verificaToken, RubroController.getAll)
    .get('/rubro/:idRubro', verificaToken, RubroController.getOne)
    .get('/rubro/name/:nombreRubro', verificaToken, RubroController.getToName)
    .get('/rubro/todo/:anyAttribute', verificaToken, RubroController.getToAllAttributes)
    .post('/rubro', verificaToken, RubroController.create)
    .put('/rubro', verificaToken, RubroController.update)
    .delete('/rubro/:idRubro', verificaToken, RubroController.destroy)

// sector
    .get('/sector', verificaToken, SectorController.getAll)
    .get('/sector/:idSector', verificaToken, SectorController.getOne)
    .get('/sector/name/:nombreSector', verificaToken, SectorController.getToName)
    .get('/sector/todo/:anyAttribute', verificaToken, SectorController.getToAllAttributes)
    .post('/sector', verificaToken, SectorController.create)
    .put('/sector', verificaToken, SectorController.update)
    .post('/sector/:idSector', verificaToken, SectorController.delete)
    .delete('/sector/:idSector', verificaToken, SectorController.destroy)

// caja
    .get('/caja', verificaToken, CajaController.getAll)
    .post('/caja', verificaToken, CajaController.create)
    .put('/caja', verificaToken, CajaController.update)
    .get('/caja/:idCaja', verificaToken, CajaController.getOne)
    .get('/caja/name/:nroCaja', verificaToken, CajaController.getToName)
    .get('/caja/todo/:anyAttribute', verificaToken, CajaController.getToAllAttributes)
    .post('/caja/:idCaja', verificaToken, CajaController.delete)
    .delete('/caja/:idCaja', verificaToken, CajaController.destroy)

// ubicacion
    .get('/ubicacion', verificaToken, UbicacionController.getAll)
    .get('/ubicacion/:idUbicacion', verificaToken, UbicacionController.getOne)
    .get('/ubicacion/name/:nroUbicacion', verificaToken, UbicacionController.getToName)
    .get('/ubicacion/todo/:anyAttribute', verificaToken, UbicacionController.getToAllAttributes)
    .post('/ubicacion', verificaToken, UbicacionController.create)
    .put('/ubicacion', verificaToken, UbicacionController.update)
    .delete('/ubicacion/:idUbicacion', verificaToken, UbicacionController.destroy)

// ESTADOS ------------------------------------------------------------------------------------------------

// estadocaja
    .get('/estadocaja', verificaToken, EstadoCajaController.getAll)
    .post('/estadocaja', verificaToken, EstadoCajaController.create)
    .get('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.getOne)
    .post('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.delete)
    .delete('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.destroy)

// estadousuario
    .get('/estadousuario', verificaToken, EstadoUsuarioController.getAll)
    .post('/estadousuario', verificaToken, EstadoUsuarioController.create)
    .get('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.getOne)
    .post('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.delete)
    .delete('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.destroy)

// estadoestadia
    .get('/estadoestadia', verificaToken, EstadoEstadiaController.getAll)
    .post('/estadoestadia', verificaToken, EstadoEstadiaController.create)
    .get('/estadoestadia/:idEstadoEstadia', verificaToken, EstadoEstadiaController.getOne)
    .post('/estadoestadia/:idEstadoEstadia', verificaToken, EstadoEstadiaController.delete)
    .delete('/estadoestadia/:idEstadoEstadia', verificaToken, EstadoEstadiaController.destroy)

// estadomenupromocion
    .get('/estadomenupromocion', verificaToken, EstadoMenuPromocionController.getAll)
    .post('/estadomenupromocion', verificaToken, EstadoMenuPromocionController.create)
    .get('/estadomenupromocion/:idEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.getOne)
    .post('/estadomenupromocion/:idEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.delete)
    .delete('/estadomenupromocion/:idEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.destroy)

// estadoreserva
    .get('/estadoreserva', verificaToken, EstadoReservaController.getAll)
    .post('/estadoreserva', verificaToken, EstadoReservaController.create)
    .get('/estadoreserva/:idEstadoReserva', verificaToken, EstadoReservaController.getOne)
    .post('/estadoreserva/:idEstadoReserva', verificaToken, EstadoReservaController.delete)
    .delete('/estadoreserva/:idEstadoReserva', verificaToken, EstadoReservaController.destroy)

// estadoproducto
    .get('/estadoproducto', verificaToken, EstadoProductoController.getAll)
    .post('/estadoproducto', verificaToken, EstadoProductoController.create)
    .get('/estadoproducto/:idEstadoProducto', verificaToken, EstadoProductoController.getOne)
    .post('/estadoproducto/:idEstadoProducto', verificaToken, EstadoProductoController.delete)
    .delete('/estadoproducto/:idEstadoProducto', verificaToken, EstadoProductoController.destroy)

// estadopedido
    .get('/estadopedido', verificaToken, EstadoPedidoController.getAll)
    .post('/estadopedido', verificaToken, EstadoPedidoController.create)
    .get('/estadopedido/:idEstadoPedido', verificaToken, EstadoPedidoController.getOne)
    .post('/estadopedido/:idEstadoPedido', verificaToken, EstadoPedidoController.delete)
    .delete('/estadopedido/:idEstadoPedido', verificaToken, EstadoPedidoController.destroy)

// estadomesa
    .get('/estadomesa', verificaToken, EstadoMesaController.getAll)
    .post('/estadomesa', verificaToken, EstadoMesaController.create)
    .get('/estadomesa/:idEstadoMesa', verificaToken, EstadoMesaController.getOne)
    .post('/estadomesa/:idEstadoMesa', verificaToken, EstadoMesaController.delete)
    .delete('/estadomesa/:idEstadoMesa', verificaToken, EstadoMesaController.destroy)

// use
    .use(TipoMonedaController.error404)

module.exports = router