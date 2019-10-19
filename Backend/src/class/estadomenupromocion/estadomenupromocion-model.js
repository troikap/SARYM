'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoMenuPromocionModelo = sequelize.define('estadomenupromocion', {
    // attributes
    idEstadoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoMenuPromocionModelo;
