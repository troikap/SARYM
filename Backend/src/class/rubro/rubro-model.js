'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const RubroModelo = sequelize.define('rubro', {
    // attributes
    idRubro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codRubro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombreRubro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionRubro: {
        type: Sequelize.STRING
    }
}, {
    // options
});

module.exports = RubroModelo;