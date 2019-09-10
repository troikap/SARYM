'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const TipoMenuPromocionModelo = sequelize.define('tipomenupromocion', {
    // attributes
    idTipoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

/*
create table tipomenupromocion (
    idTipoMenuPromocion INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreTipoMenuPromocion VARCHAR(50) NOT NULL);
*/