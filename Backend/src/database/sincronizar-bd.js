'use strict'

const sequelize = require('./connection');

// models

require('../class/caja/caja-model');
require('../class/cajaestado/cajaestado-model');
require('../class/clienteestadia/clienteestadia-model');
require('../class/comensal/comensal-model');
require('../class/departamento/departamento-model');
require('../class/detalleestadiamesa/detalleestadiamesa-model');
require('../class/detallemenupromocionproducto/detallemenupromocionproducto-model');
require('../class/detallepedidoproducto/detallepedidoproducto-model');
require('../class/detallereservamesa/detallereservamesa-model');
require('../class/estadia/estadia-model');
require('../class/estadiaestado/estadiaestado-model');
require('../class/estadocaja/estadocaja-model');
require('../class/estadoestadia/estadoestadia-model');
require('../class/estadomenupromocion/estadomenupromocion-model');
require('../class/estadomesa/estadomesa-model');
require('../class/estadopedido/estadopedido-model');
require('../class/estadoproducto/estadoproducto-model');
require('../class/estadoreserva/estadoreserva-model');
require('../class/estadousuario/estadousuario-model');
require('../class/mediopago/mediopago-model');
require('../class/menupromocion/menupromocion-model');
require('../class/menupromocionestado/menupromocionestado-model');
require('../class/mesa/mesa-model');
require('../class/mesaestado/mesaestado-model');
require('../class/movimientocaja/movimientocaja-model');
require('../class/mozoestadia/mozoestadia-model');
require('../class/pago/pago-model');
require('../class/pagopedido/pagopedido-model');
require('../class/pedido/pedido-model');
require('../class/pedidoestado/pedidoestado-model');
require('../class/preciomenupromocion/preciomenupromocion-model');
require('../class/precioproducto/precioproducto-model');
require('../class/producto/producto-model');
require('../class/productoestado/productoestado-model');
require('../class/reserva/reserva-model');
require('../class/reservaestado/reservaestado-model');
require('../class/rol/rol-model');
require('../class/rolusuario/rolusuario-model');
require('../class/rubro/rubro-model');
require('../class/sector/sector-model');
require('../class/tipomenupromocion/tipomenupromocion-model');
require('../class/tipomoneda/tipomoneda-model');
require('../class/tipomovimientocaja/tipomovimientocaja-model');
require('../class/ubicacion/ubicacion-model');
require('../class/unidadmedida/unidadmedida-model');
require('../class/usuario/usuario-model');
require('../class/usuarioestado/usuarioestado-model');

console.log("Se esta ejecutando sincronizar")

sequelize.sync({ force: true }); // force = false  crea nuevos modelos/tablas dejando las creadas intactas

//require('../class/prueba');

//  node_modules/.bin/sequelize seed:generate --name demo-user          crea nueva semilla
// node_modules/.bin/sequelize db:seed:all        para correr la semilla


// bcrypt.compare("123", encrypt, function(err, res) {
//     // res == true
//     console.log("RESPUESTA: ",res)
//   });

//bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario