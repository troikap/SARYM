'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MedioPagoModelo = sequelize.define('mediopago', {
  // attributes
  idMedioPago: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombreMedioPago: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

module.exports = MedioPagoModelo;