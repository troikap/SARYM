'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoPedidoModelo = sequelize.define('estadopedido', {
    // attributes
    idEstadoPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoPedido: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoPedido: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoPedidoModelo;
