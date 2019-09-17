'use strict'

const Sequelize = require('sequelize');
const MesaModelo = require('../mesa/mesa-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetalleReservaMesaModelo = sequelize.define('detallereservamesa', {
    // attributes
    idDetalleReservaMesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idReserva: {
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

DetalleReservaMesaModelo.belongsTo(MesaModelo, { foreignKey: "idMesa" });

module.exports = DetalleReservaMesaModelo;
/*
create table detallereservamesa (
    idDetalleReservaMesa INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idReserva INT(12) UNSIGNED NOT NULL,
    idMesa INT(12) UNSIGNED NOT NULL)
*/