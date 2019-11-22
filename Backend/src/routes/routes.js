'use strict'

var express = require('express');
var router = express.Router();

// traer lo global
require('../config');

//sincronizador
require('../database/sincronizar-bd');

const { verificaToken, verificaTokenRecuperacion } = require('../middlewares/autenticacion');

var TokenController = require('../class/token/token-controller');
const configMensaje = require('../middlewares/configMensaje');

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
var TipoMovimientoCajaController = require('../class/tipomovimientocaja/tipomovimientocaja-controller');
var MedioPagoController = require('../class/mediopago/mediopago-controller');
var UploadController = require('../class/upload/upload-controller');
var TipoMenuPromocionController = require('../class/tipomenupromocion/tipomenupromocion-controller');
var PedidoController = require('../class/pedido/pedido-controller');
var ReservaController = require('../class/reserva/reserva-controller');
var EstadiaController = require('../class/estadia/estadia-controller');
var PagoController = require('../class/pago/pago-controller');
var MozoEstadiaController = require('../class/mozoestadia/mozoestadia-controller');
var FuncionController = require('../class/funcion/funcion-controller');


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
    .post('/subirImagen', UploadController.subirImagen)
    .get('/traerImagen/:tipo/:img', UploadController.traerImagen)
    .get('/traerImagen/:img?', UploadController.traerImagen)
    .post('/verificarTokenRol', TokenController.verificarTokenRol)
    .post('/envioEmail', (req, res) => {
        configMensaje(req.body);
        res.status(200).send();
    })
    .post('/recuperarDatosToken', verificaTokenRecuperacion, UsuarioController.recuperarDatosToken)
    .post('/activarUsuario', UsuarioController.activarUsuario)
    
// reporte

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

// pago
.get('/pago', verificaToken, PagoController.getAll)
    .get('/pago/:idPago', verificaToken, PagoController.getOne)
    .get('/pago/name/:codPago', verificaToken, PagoController.getToName)
    .get('/pago/todo/:anyAttribute', verificaToken, PagoController.getToAllAttributes)
    .post('/pago', verificaToken, PagoController.create)
    .put('/pago/actualizarDatos', verificaToken, PagoController.actualizarDatos)
    .put('/pago/editarPagoPedido', verificaToken, PagoController.editarPagoPedido)

// producto
.get('/producto', verificaToken, ProductoController.getAll)
    .get('/producto/:idProducto', verificaToken, ProductoController.getOne)
    .get('/producto/name/:nombreProducto', verificaToken, ProductoController.getToName)
    .get('/producto/todo/:anyAttribute', verificaToken, ProductoController.getToAllAttributes)
    .post('/producto', verificaToken, ProductoController.create)
    .put('/producto/actualizarDatos', verificaToken, ProductoController.actualizarDatos)
    .put('/producto/cambiarEstado', verificaToken, ProductoController.cambiarEstado)
    .put('/producto/cambiarPrecio', verificaToken, ProductoController.cambiarPrecio)
    .put('/producto/habilitarDeshabilitarProducto', verificaToken, ProductoController.habilitarDeshabilitarProducto)

// pedido
.get('/pedido', verificaToken, PedidoController.getAll)
    .get('/pedido/:idPedido', verificaToken, PedidoController.getOne)
    .get('/pedido/name/:codPedido', verificaToken, PedidoController.getToName)
    .get('/pedido/todo/:anyAttribute', verificaToken, PedidoController.getToAllAttributes)
    .post('/pedido', verificaToken, PedidoController.create)
    .put('/pedido/actualizarDatos', verificaToken, PedidoController.actualizarDatos)
    .put('/pedido/cambiarEstado', verificaToken, PedidoController.cambiarEstado)
    .put('/pedido/editarDetallePedidoProducto', verificaToken, PedidoController.editarDetallePedidoProducto)

// estadia
.get('/estadia', verificaToken, EstadiaController.getAll)
    .get('/estadia/:idEstadia', verificaToken, EstadiaController.getOne)
    .get('/estadia/name/:idEstadia', verificaToken, EstadiaController.getToName)
    .get('/estadia/todo/:anyAttribute', verificaToken, EstadiaController.getToAllAttributes)
    .post('/estadia', verificaToken, EstadiaController.create)
    .put('/estadia/actualizarDatos', verificaToken, EstadiaController.actualizarDatos)
    .put('/estadia/cambiarEstado', verificaToken, EstadiaController.cambiarEstado)
    .put('/estadia/editarComensal', verificaToken, EstadiaController.editarComensal)
    .put('/estadia/editarMesa', verificaToken, EstadiaController.editarMesa)
    .put('/estadia/editarClienteEstadia', verificaToken, EstadiaController.editarClienteEstadia)
    .post('/estadia/getToMesa/:idMesa', verificaToken, EstadiaController.getToMesa)
    .post('/estadia/getToUsuario/:idUsuario', verificaToken, EstadiaController.getToUsuario)
    .put('/estadia/cambiarMozoEstadia', verificaToken, EstadiaController.cambiarMozoEstadia)

// reserva
.get('/reserva', verificaToken, ReservaController.getAll)
    .get('/reserva/:idReserva', verificaToken, ReservaController.getOne)
    .get('/reserva/name/:codReserva', verificaToken, ReservaController.getToName)
    .get('/reserva/todo/:anyAttribute', verificaToken, ReservaController.getToAllAttributes)
    .post('/reserva', verificaToken, ReservaController.create)
    .put('/reserva/actualizarDatos', verificaToken, ReservaController.actualizarDatos)
    .put('/reserva/cambiarEstado', verificaToken, ReservaController.cambiarEstado)
    .put('/reserva/editarComensal', verificaToken, ReservaController.editarComensal)
    .put('/reserva/editarMesa', verificaToken, ReservaController.editarMesa)
    .post('/reserva/getToComensal/:idUsuario', verificaToken, ReservaController.getToComensal)

// menupromocion
.get('/menupromocion', verificaToken, MenuPromocionController.getAll)
    .get('/menupromocion/:idMenuPromocion', verificaToken, MenuPromocionController.getOne)
    .get('/menupromocion/name/:nombreMenuPromocion', verificaToken, MenuPromocionController.getToName)
    .get('/menupromocion/todo/:anyAttribute', verificaToken, MenuPromocionController.getToAllAttributes)
    .post('/menupromocion', verificaToken, MenuPromocionController.create)
    .put('/menupromocion/actualizarDatos', verificaToken, MenuPromocionController.actualizarDatos)
    .put('/menupromocion/cambiarEstado', verificaToken, MenuPromocionController.cambiarEstado)
    .put('/menupromocion/cambiarPrecio', verificaToken, MenuPromocionController.cambiarPrecio)
    .put('/menupromocion/editarProductos', verificaToken, MenuPromocionController.editarProductos)
    .put('/menupromocion/habilitarDeshabilitarMenuPromocion', verificaToken, MenuPromocionController.habilitarDeshabilitarMenuPromocion)

// mesa
.get('/mesa', verificaToken, MesaController.getAll)
    .get('/mesa/:idMesa', verificaToken, MesaController.getOne)
    .get('/mesa/name/:nroMesa', verificaToken, MesaController.getToName)
    .get('/mesa/todo/:anyAttribute', verificaToken, MesaController.getToAllAttributes)
    .post('/mesa', verificaToken, MesaController.create)
    .put('/mesa/actualizarDatos', verificaToken, MesaController.actualizarDatos)
    .put('/mesa/cambiarEstado', verificaToken, MesaController.cambiarEstado)

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
    .put('/rol/editarFuncion', verificaToken, RolController.editarFuncion)

// funcion
.get('/funcion', verificaToken, FuncionController.getAll)
    .get('/funcion/:idFuncion', verificaToken, FuncionController.getOne)
    .get('/funcion/name/:nombreFuncion', verificaToken, FuncionController.getToName)
    .get('/funcion/todo/:anyAttribute', verificaToken, FuncionController.getToAllAttributes)
    .post('/funcion', verificaToken, FuncionController.create)
    .put('/funcion', verificaToken, FuncionController.update)
    .delete('/funcion/:idFuncion', verificaToken, FuncionController.destroy)

// tipomoneda
.get('/tipomoneda', verificaToken, TipoMonedaController.getAll)
    .get('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.getOne)
    .get('/tipomoneda/name/:nombreTipoMoneda', verificaToken, TipoMonedaController.getToName)
    .get('/tipomoneda/todo/:anyAttribute', verificaToken, TipoMonedaController.getToAllAttributes)
    .post('/tipomoneda', verificaToken, TipoMonedaController.create)
    .put('/tipomoneda', verificaToken, TipoMonedaController.update)
    .delete('/tipomoneda/:idTipoMoneda', verificaToken, TipoMonedaController.destroy)

// tipomenupromocion
.get('/tipomenupromocion', verificaToken, TipoMenuPromocionController.getAll)
    .get('/tipomenupromocion/:idTipoMenuPromocion', verificaToken, TipoMenuPromocionController.getOne)
    .get('/tipomenupromocion/name/:nombreTipMenuPromocion', verificaToken, TipoMenuPromocionController.getToName)
    .get('/tipomenupromocion/todo/:anyAttribute', verificaToken, TipoMenuPromocionController.getToAllAttributes)
    .post('/tipomenupromocion', verificaToken, TipoMenuPromocionController.create)
    .put('/tipomenupromocion', verificaToken, TipoMenuPromocionController.update)
    .delete('/tipomenupromocion/:idTipoMenuPromocion', verificaToken, TipoMenuPromocionController.destroy)

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
    .put('/caja/realizarMovimiento', verificaToken, CajaController.realizarMovimiento)

// mozoestadia
// .get('/mozoestadia', verificaToken, MozoEstadiaController.getAll)
// .get('/mozoestadia/:idMozoEstadia', verificaToken, MozoEstadiaController.getOne)
// .post('/mozoestadia', verificaToken, MozoEstadiaController.create)
// .put('/mozoestadia/actualizarDatos', verificaToken, MozoEstadiaController.actualizarDatos)

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