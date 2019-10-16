'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const UnidadMedidaModelo = sequelize.define('unidadmedida', {
    // attributes
    idUnidadMedida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codUnidadMedida: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreUnidadMedida: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    descripcionUnidadMedida: {
        type: Sequelize.STRING
    },
    caracterUnidadMedida: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    // options
});

module.exports = UnidadMedidaModelo;