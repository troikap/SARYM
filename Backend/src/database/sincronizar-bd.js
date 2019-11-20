'use strict'

const sequelize = require('./connection');


console.log("Se esta ejecutando sincronizar")

sequelize.sync({ force: false }); // force = false  crea nuevos modelos/tablas dejando las creadas intactas

//  node_modules/.bin/sequelize seed:generate --name demo-user          crea nueva semilla
// node_modules/.bin/sequelize db:seed:all        para correr la semilla

// models

// require('../class/caja/caja-model');
// require('../class/cajaestado/cajaestado-model');
// require('../class/clienteestadia/clienteestadia-model');
// require('../class/comensal/comensal-model');
// require('../class/departamento/departamento-model');
// require('../class/detalleestadiamesa/detalleestadiamesa-model');
// require('../class/detallemenupromocionproducto/detallemenupromocionproducto-model');
// require('../class/detallepedidoproducto/detallepedidoproducto-model');
// require('../class/detallereservamesa/detallereservamesa-model');
// require('../class/estadia/estadia-model');
// require('../class/estadiaestado/estadiaestado-model');
// require('../class/estadocaja/estadocaja-model');
// require('../class/estadoestadia/estadoestadia-model');
// require('../class/estadomenupromocion/estadomenupromocion-model');
// require('../class/estadomesa/estadomesa-model');
// require('../class/estadopedido/estadopedido-model');
// require('../class/estadoproducto/estadoproducto-model');
// require('../class/estadoreserva/estadoreserva-model');
// require('../class/estadousuario/estadousuario-model');
// require('../class/mediopago/mediopago-model');
// require('../class/menupromocion/menupromocion-model');
// require('../class/menupromocionestado/menupromocionestado-model');
// require('../class/mesa/mesa-model');
// require('../class/mesaestado/mesaestado-model');
// require('../class/movimientocaja/movimientocaja-model');
// require('../class/mozoestadia/mozoestadia-model');
// require('../class/pago/pago-model');
// require('../class/pagopedido/pagopedido-model');
// require('../class/pedido/pedido-model');
// require('../class/pedidoestado/pedidoestado-model');
// require('../class/preciomenupromocion/preciomenupromocion-model');
// require('../class/precioproducto/precioproducto-model');
// require('../class/producto/producto-model');
// require('../class/productoestado/productoestado-model');
// require('../class/reserva/reserva-model');
// require('../class/reservaestado/reservaestado-model');
// require('../class/rol/rol-model');
// require('../class/rolusuario/rolusuario-model');
// require('../class/rubro/rubro-model');
// require('../class/sector/sector-model');
// require('../class/tipomenupromocion/tipomenupromocion-model');
// require('../class/tipomoneda/tipomoneda-model');
// require('../class/tipomovimientocaja/tipomovimientocaja-model');
// require('../class/unidadmedida/unidadmedida-model');
// require('../class/usuario/usuario-model');
// require('../class/usuarioestado/usuarioestado-model');
//  require('../class/funcionrol/funcionrol-model');


// let fecha = fechaArgentina.getFechaArgentina();
// let horasMilisegundos = 1000 * 60 * 60 * 3 
// let suma = fecha.getTime() - horasMilisegundos;
// let fecha2 = new Date(suma);
// console.log("DATE" , fecha2 )

// console.log("DATE " , Date.now())
// console.log("DATE " , Date.parse())
// console.log("DATE " ,new Date(1995,11,17))
// console.log("DATE " , fecha.getDate())
// console.log("DATE " , fecha.getDay())
// console.log("DATE " , fecha.getFullYear())
// console.log("DATE " , fecha.getMinutes())
// console.log("DATE " , fecha.getMonth())
// getMinutes
// getMonth
// setDate
// setFullYear
// setHours
// setMilliseconds
// setMonth
// setMinutes
// setSeconds
// setTime
// toTimeString

// module.exports = app;

//  node_modules/.bin/sequelize seed:generate --name demo-user          crea nueva semilla
// node_modules/.bin/sequelize db:seed:all        para correr la semilla

// npx sequelize migration:create --name Departamento
// 

// bcrypt.compare("123", encrypt, function(err, res) {
//     // res == true
//     console.log("RESPUESTA: ",res)
//   });

//bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario


// Model.findAll({
//     attributes: [[sequelize.fn('COUNT', sequelize.col('hats')), 'no_hats']]
//   });
//   SELECT COUNT(hats) AS no_hats ...