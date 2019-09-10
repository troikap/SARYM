'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const MenuPromocionEstadoModelo = requiere('../../menupromocionestado/menupromocionestado-model');

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
        allowNull: false
    },
    nombreEstadoMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

EstadoMenuPromocionModelo.hasMany(MenuPromocionEstadoModelo, { foreignKey: "idEstadoMenuPromocion" });

module.exports = EstadoMenuPromocionModelo;

/*
create table estadomenupromocion(
    idEstadoMenuPromocion INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codEstadoMenuPromocion VARCHAR(50) NOT NULL,
    nombreEstadoMenuPromocion VARCHAR(50) NOT NULL)

*/