'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const EstadoEstadiaModelo = require("../estadoestadia/estadoestadia-model");

// DEFINICION DEL MODELO
const EstadiaEstadoModelo = sequelize.define('estadiaestado', {
	// attributes
	idEstadiaEstado: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idEstadia: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idEstadoEstadia: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	descripcionEstadiaEstado: {
		type: Sequelize.STRING,
		allowNull: false
	},
	fechaYHoraAltaEstadiaEstado: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraBajaEstadiaEstado: {
		type: Sequelize.DATE
	}
}, {
		// options
	});

EstadiaEstadoModelo.belongsTo(EstadoEstadiaModelo, { foreignKey: "idEstadoEstadia" });

module.exports = EstadiaEstadoModelo;


/*
create table estadiaestado(
	idEstadiaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idEstadia INT(12) UNSIGNED NOT NULL,
	idEstadoEstadia INT(5) UNSIGNED NOT NULL,
    descripcionEstadiaEstado VARCHAR(100) NOT NULL,
	fechaYHoraAltaEstadiaEstado datetime NOT NULL,
	fechaYHoraBajaEstadiaEstado datetime)
*/