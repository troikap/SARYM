'use strict'

const sequelize = require('./connection');

// models
require('../class/estadousuario/estadousuario-model');
require('../class/departamento/departamento-model');
require('../class/usuario/usuario-model');
require('../class/usuarioestado/usuarioestado-model');
require('../class/rol/rol-model');
require('../class/rolusuario/rolusuario-model');

console.log("Se esta ejecutando sincronizar")

sequelize.sync({force: true});  // force = false  crea nuevos modelos/tablas dejando las creadas intactas

//require('../class/prueba');

//  node_modules/.bin/sequelize seed:generate --name demo-user          crea nueva semilla
// node_modules/.bin/sequelize db:seed:all        para correr la semilla


// bcrypt.compare("123", encrypt, function(err, res) {
//     // res == true
//     console.log("RESPUESTA: ",res)
//   });

//bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario