'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoProductoModelo = sequelize.define('estadoproducto', {
    // attributes
    idEstadoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoProducto: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoProducto: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoProductoModelo;