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
        allowNull: false
    },
    nombreEstadoEstadia: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = EstadoEstadiaModelo;
