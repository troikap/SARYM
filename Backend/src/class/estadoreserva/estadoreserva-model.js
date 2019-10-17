'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoReservaModelo = sequelize.define('estadoreserva', {
    // attributes
    idEstadoReserva: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoReserva: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoReserva: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoReservaModelo;