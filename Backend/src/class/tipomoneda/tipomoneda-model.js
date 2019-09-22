'use strict'

const Sequelize = require('sequelize');
const PrecioMenuPromocionModelo = require('../preciomenupromocion/preciomenupromocion-model');
const PrecioProductoModelo = require('../precioproducto/precioproducto-model');
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

TipoMonedaModelo.hasMany(PrecioMenuPromocionModelo, { foreignKey: "idTipoMoneda" });
TipoMonedaModelo.hasMany(PrecioProductoModelo, { foreignKey: "idTipoMoneda" });

module.exports = TipoMonedaModelo;