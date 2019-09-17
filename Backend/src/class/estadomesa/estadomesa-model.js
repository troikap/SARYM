'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoMesaModelo = sequelize.define('estadomesa', {
    // attributes
    idEstadoMesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoMesa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombreEstadoMesa: {
        type: Sequelize.STRING,
        allowNull: false
    },
    colorEstadoMesa: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

module.exports = EstadoMesaModelo;

/*
create table estadomesa(
    idEstadoMesa INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoMesa VARCHAR(50) NOT NULL,
    nombreEstadoMesa VARCHAR(50) NOT NULL,
    colorEstadoMesa VARCHAR(50))
*/