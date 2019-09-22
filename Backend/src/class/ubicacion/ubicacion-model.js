'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const UbicacionModelo = sequelize.define('ubicacion', {
    // attributes
    idUbicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nroUbicacion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionUbicacion: {
        type: Sequelize.STRING
    }
}, {
    // options
});

module.exports = UbicacionModelo;