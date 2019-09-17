'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const RolModelo = require("../rol/rol-model");

// DEFINICION DEL MODELO
const RolUsuarioModelo = sequelize.define('rolusuario', {
  // attributes
  idRolUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idRol: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fechaYHoraAltaRolUsuario: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaRolUsuario: {
    type: Sequelize.DATE
  }
}, {
  // options
});

RolUsuarioModelo.belongsTo(RolModelo, { foreignKey: "idRol" })

module.exports = RolUsuarioModelo 