'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const ReservaEstadoModelo = sequelize.define('reservaestado', {
	// attributes
	idReservaEstado: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idReserva: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idEstadoReserva: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	descripcionReservaEstado: {
		type: Sequelize.STRING
	},
	fechaYHoraAltaReservaEstado: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraBajaReservaEstado: {
		type: Sequelize.DATE
	}
}, {
		// options
	});

module.exports = ReservaEstadoModelo;

/*
create table reservaestado(
	idReservaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idReserva INT(12) UNSIGNED NOT NULL,
	idEstadoReserva INT(5) UNSIGNED NOT NULL,
    descripcion VARCHAR(50),
	fechaYHoraAltaReservaEstado datetime NOT NULL,
	fechaYHoraBajaReservaEstado datetime)
*/