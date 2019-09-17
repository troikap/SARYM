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
        allowNull: false
    },
    nombreEstadoReserva: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = EstadoReservaModelo;

/*
create table estadoreserva(
    idEstadoReserva INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoReserva VARCHAR(50) NOT NULL,
    nombreEstadoReserva VARCHAR(50) NOT NULL)
*/