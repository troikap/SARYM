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
        allowNull: false
    },
    simboloTipoMoneda: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = TipoMonedaModelo;