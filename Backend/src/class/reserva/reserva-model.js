'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const UsuarioEstadoModelo = sequelize.define('usuarioestado', {
    // attributes
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codReserva: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cantPersonas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaReserva: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horaEntradaReserva: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horaSalidaReserva: {
        type: Sequelize.DATE,
    },
    tokenReserva: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

/*
create table reserva(
	idReserva INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT(12) UNSIGNED NOT NULL,
    codReserva VARCHAR(50) NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaReserva date NOT NULL,
	horaEntradaReserva time NOT NULL,
    horaSalidaReserva time,
    tokenReserva VARCHAR(50) NOT NULL)
*/