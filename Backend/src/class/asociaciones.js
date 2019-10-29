const sequelize = require('./connection');

const CajaModel = require('./caja/caja-model');
const CajaEstadoModel = require('./cajaestado/cajaestado-model');
const ClienteEstadiaModel = require('./clienteestadia/clienteestadia-model');
const ComensalModel = require('./comensal/comensal-model');
const DepartamentoModel = require('./departamento/departamento-model');
const DetalleEstadiaMesaModel = require('./detalleestadiamesa/detalleestadiamesa-model');
const DetalleMenuPromocionProductoModel = require('./detallemenupromocionproducto/detallemenupromocionproducto-model');
const DetallePedidoProductoModel = require('./detallepedidoproducto/detallepedidoproducto-model');
const DetalleReservaMesaModel = require('./detallereservamesa/detallereservamesa-model');
const EstadiaModel = require('./estadia/estadia-model');
const EstadiaEstadoModel = require('./estadiaestado/estadiaestado-model');
const EstadoCajaModel = require('./estadocaja/estadocaja-model');
const EstadoEstadiaModel = require('./estadoestadia/estadoestadia-model');
const EstadoMenuPromocionModel = require('./estadomenupromocion/estadomenupromocion-model');
const EstadoMesaModel = require('./estadomesa/estadomesa-model');
const EstadoPedidoModel = require('./estadopedido/estadopedido-model');
const EstadoProductoModel = require('./estadoproducto/estadoproducto-model');
const EstadoReservaModel = require('./estadoreserva/estadoreserva-model');
const EstadoUsuarioModel = require('./estadousuario/estadousuario-model');
const MedioPagoModel = require('./mediopago/mediopago-model');
const MenuPromocionModel = require('./menupromocion/menupromocion-model');
const MenuPromocionEstadoModel = require('./menupromocionestado/menupromocionestado-model');
const MesaModel = require('./mesa/mesa-model');
const MesaEstadoModel = require('./mesaestado/mesaestado-model');
const MovimientoCajaModel = require('./movimientocaja/movimientocaja-model');
const MozoEstadiaModel = require('./mozoestadia/mozoestadia-model');
const PagoModel = require('./pago/pago-model');
const PagoPedidoModel = require('./pagopedido/pagopedido-model');
const PedidoModel = require('./pedido/pedido-model');
const PedidoEstadoModel = require('./pedidoestado/pedidoestado-model');
const PrecioMenuPromocionModel = require('./preciomenupromocion/preciomenupromocion-model');
const PrecioProductoModel = require('./precioproducto/precioproducto-model');
const ProductoModel = require('./producto/producto-model');
const ProductoEstadoModel = require('./productoestado/productoestado-model');
const ReservaModel = require('./reserva/reserva-model');
const ReservaEstadoModel = require('./reservaestado/reservaestado-model');
const RolModel = require('./rol/rol-model');
const RolUsuarioModel = require('./rolusuario/rolusuario-model');
const RubroModel = require('./rubro/rubro-model');
const SectorModel = require('./sector/sector-model');
const TipoMenuPromocionModel = require('./tipomenupromocion/tipomenupromocion-model');
const TipoMonedaModel = require('./tipomoneda/tipomoneda-model');
const TipoMovimientoCajaModel = require('./tipomovimientocaja/tipomovimientocaja-model');
const UnidadMedidaModel = require('./unidadmedida/unidadmedida-model');
const UsuarioModel = require('./usuario/usuario-model');
const UsuarioEstadoModel = require('./usuarioestado/usuarioestado-model');




// export const UsuarioModelo          = sequelize.import(UsuarioModel)
// export const ComensalModelo        = sequelize.import(ComensalModel)
// export const MozoEstadiaModelo      = sequelize.import(MozoEstadiaModel)
// export const EstadiaModelo         = sequelize.import(EstadiaModel)

export const CajaModelo = sequelize.import(CajaModel);
export const CajaEstadoModelo = sequelize.import(CajaEstadoModel);
export const ClienteEstadiaModelo = sequelize.import(ClienteEstadiaModel);
export const ComensalModelo = sequelize.import(ComensalModel);
export const DepartamentoModelo = sequelize.import(DepartamentoModel);
export const DetalleEstadiaMesaModelo = sequelize.import(DetalleEstadiaMesaModel);
export const DetalleMenuPromocionProductoModelo = sequelize.import(DetalleMenuPromocionProductoModel);
export const DetallePedidoProductoModelo = sequelize.import(DetallePedidoProductoModel);
export const DetalleReservaMesaModelo = sequelize.import(DetalleReservaMesaModel);
export const EstadiaModelo = sequelize.import(EstadiaModel);
export const EstadiaEstadoModelo = sequelize.import(EstadiaEstadoModel);
export const EstadoCajaModelo = sequelize.import(EstadoCajaModel);
export const EstadoEstadiaModelo = sequelize.import(EstadoEstadiaModel);
export const EstadoMenuPromocionModelo = sequelize.import(EstadoMenuPromocionModel);
export const EstadoMesaModelo = sequelize.import(EstadoMesaModel);
export const EstadoPedidoModelo = sequelize.import(EstadoPedidoModel);
export const EstadoProductoModelo = sequelize.import(EstadoProductoModel);
export const EstadoReservaModelo = sequelize.import(EstadoReservaModel);
export const EstadoUsuarioModelo = sequelize.import(EstadoUsuarioModel);
export const MedioPagoModelo = sequelize.import(MedioPagoModel);
export const MenuPromocionModelo = sequelize.import(MenuPromocionModel);
export const MenuPromocionEstadoModelo = sequelize.import(MenuPromocionEstadoModel);
export const MesaModelo = sequelize.import(MesaModel);
export const MesaEstadoModelo = sequelize.import(MesaEstadoModel);
export const MovimientoCajaModelo = sequelize.import(MovimientoCajaModel);
export const MozoEstadiaModelo = sequelize.import(MozoEstadiaModel);
export const PagoModelo = sequelize.import(PagoModel);
export const PagoPedidoModelo = sequelize.import(PagoPedidoModel);
export const PedidoModelo = sequelize.import(PedidoModel);
export const PedidoEstadoModelo = sequelize.import(PedidoEstadoModel);
export const PrecioMenuPromocionModelo = sequelize.import(PrecioMenuPromocionModel);
export const PrecioProductoModelo = sequelize.import(PrecioProductoModel);
export const ProductoModelo = sequelize.import(ProductoModel);
export const ProductoEstadoModelo = sequelize.import(ProductoEstadoModel);
export const ReservaModelo = sequelize.import(ReservaModel);
export const ReservaEstadoModelo = sequelize.import(ReservaEstadoModel);
export const RolModelo = sequelize.import(RolModel);
export const RolUsuarioModelo = sequelize.import(RolUsuarioModel);
export const RubroModelo = sequelize.import(RubroModel);
export const SectorModelo = sequelize.import(SectorModel);
export const TipoMenuPromocionModelo = sequelize.import(TipoMenuPromocionModel);
export const TipoMonedaModelo = sequelize.import(TipoMonedaModel);
export const TipoMovimientoCajaModelo = sequelize.import(TipoMovimientoCajaModel);
export const UnidadMedidaModelo = sequelize.import(UnidadMedidaModel);
export const UsuarioModelo = sequelize.import(UsuarioModel);
export const UsuarioEstadoModelo = sequelize.import(UsuarioEstadoModel);


// 表间关联关系
// banner关系
Estadia.belongsTo(MozoEstadia, {foreignKey: 'idEstadia'})
MozoEstadia.belongsTo(Usuario, {foreignKey: 'idUsuario'})




