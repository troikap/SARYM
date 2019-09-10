'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const PagoModelo = require('../../pago/pago-model');

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

MedioPagoModelo.hasMany(PagoModelo, { foreignKey: "idMedioPago" });

module.exports = MedioPagoModelo;