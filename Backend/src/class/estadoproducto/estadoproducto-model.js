'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoProductoModelo = sequelize.define('estadoproducto', {
    // attributes
    idEstadoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    codEstadoProducto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombreEstadoProducto: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

module.exports = EstadoProductoModelo;

/*
create table estadoproducto(
    idEstadoProducto INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoProducto VARCHAR(50) NOT NULL,
    nombreEstadoProducto VARCHAR(50) NOT NULL)
*/