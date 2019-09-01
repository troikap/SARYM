'use strict'

const sequelize = require('./connection');

// models
require('../class/estadousuario/estadousuario-model');
require('../class/usuario/usuario-model');
require('../class/usuarioestado/usuarioestado-model');

console.log("Se esta ejecutando sincronizar")

sequelize.sync({force: false});  // force = false  crea nuevos modelos/tablas dejando las creadas intactas

//require('../class/prueba');

// node_modules/.bin/sequelize db:seed:all        para correr la semilla