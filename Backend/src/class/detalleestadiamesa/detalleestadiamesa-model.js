'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetalleEstadiaMesaModelo = sequelize.define('detalleestadiamesa', {
    // attributes
    idDetalleEstadiaMesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMesa: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
        // options
    });

    module.exports = DetalleEstadiaMesaModelo;
/*
create table detalleestadiamesa (
    idDetalleEstadiaMesa INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idEstadia INT(12) UNSIGNED NOT NULL,
    idMesa INT(12) UNSIGNED NOT NULL)
*/