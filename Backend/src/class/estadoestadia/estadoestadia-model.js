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

/*
create table estadoestadia(
    idEstadoEstadia INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoEstadia VARCHAR(50) NOT NULL,
    nombreEstadoEstadia VARCHAR(50) NOT NULL)
*/