'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const TipoMonedaModelo = require("../tipomoneda/tipomoneda-model");

// DEFINICION DEL MODELO
const PrecioMenuPromocionModelo = sequelize.define('preciomenupromocion', {
	// attributes
	idPrecioMenuPromocion: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idMenuPromocion: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idTipoMoneda: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	importePrecioMenuPromocion: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	fechaYHoraDesdePrecioMenuPromocion: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraHastaPrecioMenuPromocion: {
		type: Sequelize.DATE
	}
}, {
	// options
});

PrecioMenuPromocionModelo.belongsTo(TipoMonedaModelo, { foreignKey: "idTipoMoneda" })

module.exports = PrecioMenuPromocionModelo;