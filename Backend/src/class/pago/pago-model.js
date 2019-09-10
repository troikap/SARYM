'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const PagoPedidoModelo = require('../../pagopedido/pagopedido-model');


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

module.exports = PagoModelo;