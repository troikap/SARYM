'use strict'

const Sequelize = require('sequelize');
const PagoPedidoModelo = require('../pagopedido/pagopedido-model');
const MedioPagoModelo = require('../mediopago/mediopago-model');
const ComensalModelo = require('../comensal/comensal-model');

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
    allowNull: false,
    unique: true
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
PagoModelo.belongsTo(ComensalModelo, { foreignKey: "idComensal" });


module.exports = PagoModelo;