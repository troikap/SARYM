'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const TipoMovimientoCajaModelo = sequelize.define('tipomovimientocaja', {
    // attributes
    idTipoMovimientoCaja: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoMovimientoCaja: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = TipoMovimientoCajaModelo;