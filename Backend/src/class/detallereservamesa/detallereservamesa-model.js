'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const ReservaMesaModelo = sequelize.define('reservamesa', {
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

/*
create table detallereservamesa (
    idDetalleReservaMesa INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idReserva INT(12) UNSIGNED NOT NULL,
    idMesa INT(12) UNSIGNED NOT NULL)
*/