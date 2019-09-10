'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

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
        allowNull: false
    },
    nombreEstadoPedido: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

module.exports = EstadoPedidoModelo;

/*
create table estadopedido(
    idEstadoPedido INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoPedido VARCHAR(50) NOT NULL,
    nombreEstadoPedido VARCHAR(50) NOT NULL)
*/