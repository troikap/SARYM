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
    .get('/caja/:idCaja', verificaToken, CajaController.getOne)
    .get('/caja/name/:nroCaja', verificaToken, CajaController.getToName)
    .get('/caja/todo/:anyAttribute', verificaToken, CajaController.getToAllAttributes)
    .post('/caja', verificaToken, CajaController.create)
    .put('/caja/actualizarDatos', verificaToken, CajaController.actualizarDatos)
    .put('/caja/cambiarEstado', verificaToken, CajaController.cambiarEstado)
    .put('/caja/abrirCaja', verificaToken, CajaController.abrirCaja)
    .put('/caja/cerrarCaja', verificaToken, CajaController.cerrarCaja)


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
    .get('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.getOne)
    .get('/estadocaja/name/:nombreEstadoCaja', verificaToken, EstadoCajaController.getToName)
    .get('/estadocaja/todo/:anyAttribute', verificaToken, EstadoCajaController.getToAllAttributes)
    .post('/estadocaja', verificaToken, EstadoCajaController.create)
    .put('/estadocaja', verificaToken, EstadoCajaController.update)
    .delete('/estadocaja/:idEstadoCaja', verificaToken, EstadoCajaController.destroy)

// estadousuario
    .get('/estadousuario', verificaToken, EstadoUsuarioController.getAll)
    .get('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.getOne)
    .get('/estadousuario/name/:nombreEstadoUsuario', verificaToken, EstadoUsuarioController.getToName)
    .get('/estadousuario/todo/:anyAttribute', verificaToken, EstadoUsuarioController.getToAllAttributes)
    .post('/estadousuario', verificaToken, EstadoUsuarioController.create)
    .put('/estadousuario', verificaToken, EstadoUsuarioController.update)
    .delete('/estadousuario/:idEstadoUsuario', verificaToken, EstadoUsuarioController.destroy)

// estadoestadia
    .get('/estadoestadia', verificaToken, EstadoEstadiaController.getAll)
    .get('/estadoestadia/:idEstadoEstadia', verificaToken, EstadoEstadiaController.getOne)
    .get('/estadoestadia/name/:nombreEstadoEstadia', verificaToken, EstadoEstadiaController.getToName)
    .get('/estadoestadia/todo/:anyAttribute', verificaToken, EstadoEstadiaController.getToAllAttributes)
    .post('/estadoestadia', verificaToken, EstadoEstadiaController.create)
    .put('/estadoestadia', verificaToken, EstadoEstadiaController.update)
    .delete('/estadoestadia/:idEstadoEstadia', verificaToken, EstadoEstadiaController.destroy)

// estadomenupromocion
    .get('/estadomenupromocion', verificaToken, EstadoMenuPromocionController.getAll)
    .get('/estadomenupromocion/:idEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.getOne)
    .get('/estadomenupromocion/name/:nombreEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.getToName)
    .get('/estadomenupromocion/todo/:anyAttribute', verificaToken, EstadoMenuPromocionController.getToAllAttributes)
    .post('/estadomenupromocion', verificaToken, EstadoMenuPromocionController.create)
    .put('/estadomenupromocion', verificaToken, EstadoMenuPromocionController.update)
    .delete('/estadomenupromocion/:idEstadoMenuPromocion', verificaToken, EstadoMenuPromocionController.destroy)

// estadoreserva
    .get('/estadoreserva', verificaToken, EstadoReservaController.getAll)
    .get('/estadoreserva/:idEstadoReserva', verificaToken, EstadoReservaController.getOne)
    .get('/estadoreserva/name/:nombreEstadoReserva', verificaToken, EstadoReservaController.getToName)
    .get('/estadoreserva/todo/:anyAttribute', verificaToken, EstadoReservaController.getToAllAttributes)
    .post('/estadoreserva', verificaToken, EstadoReservaController.create)
    .put('/estadoreserva', verificaToken, EstadoReservaController.update)
    .delete('/estadoreserva/:idEstadoReserva', verificaToken, EstadoReservaController.destroy)

// estadoproducto
    .get('/estadoproducto', verificaToken, EstadoProductoController.getAll)
    .get('/estadoproducto/:idEstadoProducto', verificaToken, EstadoProductoController.getOne)
    .get('/estadoproducto/name/:nombreEstadoProducto', verificaToken, EstadoProductoController.getToName)
    .get('/estadoproducto/todo/:anyAttribute', verificaToken, EstadoProductoController.getToAllAttributes)
    .post('/estadoproducto', verificaToken, EstadoProductoController.create)
    .put('/estadoproducto', verificaToken, EstadoProductoController.update)
    .delete('/estadoproducto/:idEstadoProducto', verificaToken, EstadoProductoController.destroy)

// estadopedido
    .get('/estadopedido', verificaToken, EstadoPedidoController.getAll)
    .get('/estadopedido/:idEstadoPedido', verificaToken, EstadoPedidoController.getOne)
    .get('/estadopedido/name/:nombreEstadoPedido', verificaToken, EstadoPedidoController.getToName)
    .get('/estadopedido/todo/:anyAttribute', verificaToken, EstadoPedidoController.getToAllAttributes)
    .post('/estadopedido', verificaToken, EstadoPedidoController.create)
    .put('/estadopedido', verificaToken, EstadoPedidoController.update)
    .delete('/estadopedido/:idEstadoPedido', verificaToken, EstadoPedidoController.destroy)

// estadomesa
    .get('/estadomesa', verificaToken, EstadoMesaController.getAll)
    .get('/estadomesa/:idEstadoMesa', verificaToken, EstadoMesaController.getOne)
    .get('/estadomesa/name/:nombreEstadoMesa', verificaToken, EstadoMesaController.getToName)
    .get('/estadomesa/todo/:anyAttribute', verificaToken, EstadoMesaController.getToAllAttributes)
    .post('/estadomesa', verificaToken, EstadoMesaController.create)
    .put('/estadomesa', verificaToken, EstadoMesaController.update)
    .delete('/estadomesa/:idEstadoMesa', verificaToken, EstadoMesaController.destroy)

// use
    .use(TipoMonedaController.error404)

module.exports = router