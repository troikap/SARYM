'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MenuPromocionEstadoModelo = sequelize.define('menupromocionestado', {
	// attributes
	idUsuarioEstado: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idEstadoUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	descripcionUsuarioEstado: {
		type: Sequelize.STRING
	},
	fechaYHoraAltaUsuarioEstado: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraBajaUsuarioEstado: {
		type: Sequelize.DATE
	}
}, {
		// options
	});

module.exports = MenuPromocionEstadoModelo;

/*
create table menupromocionestado(
	idMenuPromocionEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idMenuPromocion INT(10) UNSIGNED NOT NULL,
	idEstadoMenuPromocion INT(5) UNSIGNED NOT NULL,
	descripcionMenuPromocionEstado VARCHAR(50),
	fechaYHoraAltaMenuPromocionEstado datetime NOT NULL,
	fechaYHoraBajaMenuPromocionEstado datetime)
*/