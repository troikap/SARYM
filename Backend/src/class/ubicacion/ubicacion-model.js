'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

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

/*
create table ubicacion(
    idUbicacion INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nroUbicacion INT(5) NOT NULL,
    descripcionUbicacion VARCHAR(50))
*/