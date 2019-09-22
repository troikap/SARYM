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
        allowNull: false
    },
    nombreUnidadMedida: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionUnidadMedida: {
        type: Sequelize.STRING
    },
    caracterUnidadMedida: {
        type: Sequelize.STRING
    }
}, {
    // options
});

module.exports = UnidadMedidaModelo;