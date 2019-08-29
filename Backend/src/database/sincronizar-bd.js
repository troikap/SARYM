'use strict'

const sequelize = require('./connection');

// models
require('../class/estadousuario/estadousuario-model');
require('../class/usuario/usuario-model');
require('../class/usuarioestado/usuarioestado-model');



console.log("Se esta ejecutando sincronizar")

sequelize.sync({force: false});  // force = false  crea nuevos modelos/tablas dejando las creadas intactas

// sequelize.define('users', {
//   username: {
//     type: Sequelize.STRING, 
//     unique: true
//   },
//   password: Sequelize.STRING,
//   salt: Sequelize.STRING,
//   token: Sequelize.STRING,

//   group_id: {
//     type: Sequelize.INTEGER,
//     // references: 'groups',
//     // referencesKey: 'id'
//   }
// });

// sequelize.define('message', {
//   message: Sequelize.STRING,
//   group_id: {
//     type: Sequelize.INTEGER,
//     // references: 'groups',
//     // referencesKey: 'id'
//   },
//   user_id: {
//     type: Sequelize.INTEGER,
//     // references: 'users',
//     // referencesKey: 'id'
//   }
// });

// sequelize.define('groups', {
//   groupname: Sequelize.STRING,
//   groupkey: Sequelize.STRING
// });


