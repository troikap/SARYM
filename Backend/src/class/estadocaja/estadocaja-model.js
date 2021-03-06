'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoCajaModelo = sequelize.define('estadocaja', {
    // attributes
    idEstadoCaja: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoCaja: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoCaja: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoCajaModelo;