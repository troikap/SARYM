'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadiaModelo = sequelize.define('estadia', {
    // attributes
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMozoEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantPersonas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaYHoraInicioEstadia: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraFinEstadia: {
        type: Sequelize.DATE
    },
    tokenEstadia: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

module.exports = EstadiaModelo;

/*
create table estadia (
	idEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idReserva INT(12) UNSIGNED NOT NULL,
    idMozoEstadia INT(12) UNSIGNED NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaYHoraInicioEstadia datetime NOT NULL,
    fechaYHoraFinEstadia datetime,
    tokenEstadia VARCHAR(50) NOT NULL)
*/