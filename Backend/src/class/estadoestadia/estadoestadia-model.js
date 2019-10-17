'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoEstadiaModelo = sequelize.define('estadoestadia', {
    // attributes
    idEstadoEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoEstadia: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreEstadoEstadia: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    // options
});

module.exports = EstadoEstadiaModelo;
