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
        allowNull: false,
        unique: true
    },
    nombreEstadoMesa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    colorEstadoMesa: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoMesaModelo;