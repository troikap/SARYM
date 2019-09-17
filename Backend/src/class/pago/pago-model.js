'use strict'

const Sequelize = require('sequelize');
const PagoPedidoModelo = require('../pagopedido/pagopedido-model');
const MedioPagoModelo = require('../mediopago/mediopago-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const PagoModelo = sequelize.define('pago', {
  // attributes
  idPago: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idMedioPago: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idComensal: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  codPago: {
    type: Sequelize.STRING,
    allowNull: false
  },
  importeTotalAPagar: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  fechaYHoraAltaPago: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  // options
});

PagoModelo.hasMany(PagoPedidoModelo, { foreignKey: "idPago" });
PagoModelo.belongsTo(MedioPagoModelo, { foreignKey: "idMedioPago" });

module.exports = PagoModelo;