'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoCajaModelo = sequelize.define('estadocaja', {
  // attributes
  idEstadoCaja: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  codestadocaja: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nombreestadocaja: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

module.exports = EstadoCajaModelo;