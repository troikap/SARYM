'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const TipoMonedaModelo = require("../tipomoneda/tipomoneda-model");

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

PrecioProductoModelo.belongsTo(TipoMonedaModelo, { foreignKey: "idTipoMoneda" })

module.exports = PrecioProductoModelo;