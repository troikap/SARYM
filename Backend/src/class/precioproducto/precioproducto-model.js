'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

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