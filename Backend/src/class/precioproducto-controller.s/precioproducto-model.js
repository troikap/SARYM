'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const PrecioProductoModelo = sequelize.define('precioproducto', {
	// attributes
	idPrecioProducto: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idProducto: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idTipoMoneda: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	importePrecioProducto: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	fechaYHoraDesdePrecioProducto: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraHastaPrecioProducto: {
		type: Sequelize.DATE
	}
}, {
		// options
	});

module.exports = PrecioProductoModelo;


/*
create table precioproducto(
	idPrecioProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idProducto INT(10) UNSIGNED NOT NULL,
	idTipoMoneda INT(5) UNSIGNED NOT NULL,
	importePrecioProducto float NOT NULL,
	fechaYHoraDesdePrecioProducto datetime NOT NULL,
	fechaYHoraHastaPrecioProducto datetime)
*/