'use strict'

const Sequelize = require('sequelize');
const EstadoUsuarioModelo = require("../estadousuario/estadousuario-model");
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const UsuarioEstadoModelo = sequelize.define('usuarioestado', {
  // attributes
  idUsuarioEstado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idEstadoUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descripcionUsuarioEstado: {
    type: Sequelize.STRING
  },
  fechaYHoraAltaUsuarioEstado: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaUsuarioEstado: {
    type: Sequelize.DATE
  }
}, {
  // options
});

UsuarioEstadoModelo.belongsTo(EstadoUsuarioModelo, { foreignKey: "idEstadoUsuario" })

module.exports = UsuarioEstadoModelo 