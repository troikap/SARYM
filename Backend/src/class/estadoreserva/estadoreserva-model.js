'use strict'

const Sequelize = require('sequelize');
const ReservaEstadoModelo = requiere('../reservaestado/reservaestado-model');
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

EstadoReservaModelo.hasMany(ReservaEstadoModelo, { foreignKey: "idEstadoReserva" });


module.exports = EstadoReservaModelo;

/*
create table estadoreserva(
    idEstadoReserva INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoReserva VARCHAR(50) NOT NULL,
    nombreEstadoReserva VARCHAR(50) NOT NULL)
*/