'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const SectorModelo = sequelize.define('sector', {
    // attributes
    idSector: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codSector: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreSector: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    fechaYHoraBajaSector: {
        type: Sequelize.DATE
    }
}, {
    // options
});

module.exports = SectorModelo;