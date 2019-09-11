'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');


// DEFINICION DEL MODELO
const PagoPedidoModelo = sequelize.define('pagopedido', {
  // attributes
  idPagoPedido: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idPago: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idPedido: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  importePagoPedido: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
}, {
    // options
  });


module.exports = PagoPedidoModelo;