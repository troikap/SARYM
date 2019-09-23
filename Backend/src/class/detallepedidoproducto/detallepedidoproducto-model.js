'use strict'

const Sequelize = require('sequelize');
const PedidoModelo = require('../pedido/pedido-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetallePedidoProductoModelo = sequelize.define('detallepedidoproducto', {
    // attributes
    idDetallePedidoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    idProducto: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    cantidadPedidoProducto: {
        type: Sequelize.INTEGER
    },
    fechaYHoraInicioPedidoProducto: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraEntregaPedidoProducto: {
        type: Sequelize.DATE
    }
}, {
    // options
});

module.exports = DetallePedidoProductoModelo;