'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const EstadoEstadiaModelo = requiere('../../estadoestadia/estadoestadia-model');

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

EstadoEstadia.hasMany(EstadoEstadiaModelo, { foreignKey: "idEstadoEstadia" });

module.exports = EstadoEstadiaModelo;

/*
create table estadoestadia(
    idEstadoEstadia INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoEstadia VARCHAR(50) NOT NULL,
    nombreEstadoEstadia VARCHAR(50) NOT NULL)
*/