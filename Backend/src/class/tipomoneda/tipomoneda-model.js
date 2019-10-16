'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const TipoMonedaModelo = sequelize.define('tipomoneda', {
    // attributes
    idTipoMoneda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoMoneda: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    simboloTipoMoneda: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = TipoMonedaModelo;