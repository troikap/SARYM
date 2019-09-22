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
        allowNull: false
    },
    nombreEstadoProducto: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = EstadoProductoModelo;