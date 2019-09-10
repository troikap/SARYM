'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const TipoMonedaModelo = sequelize.define('tipomoneda', {
    // attributes
    idTipoMoneda: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoMoneda: {
        type: Sequelize.STRING,
        allowNull: false
    },
    simboloTipoMoneda: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

/*
create table tipomoneda(
    idTipoMoneda INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreTipoMoneda VARCHAR(50) NOT NULL,
    simboloTipoMoneda VARCHAR(10) NOT NULL) */