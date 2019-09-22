'use strict'

const Sequelize = require('sequelize');
const TipoMovimientoCajaModelo = require('../tipomovimientocaja/tipomovimientocaja-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MovimientoCajaModelo = sequelize.define('movimientocaja', {
	// attributes
	idMovimientoCaja: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idCaja: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idTipoMovimientoCaja: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	montoMovimientoCaja: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	descripcionMovimientoCaja: {
		type: Sequelize.STRING,
		allowNull: false
	},
	fechaYHoraMovimientoCaja: {
		type: Sequelize.DATE,
		allowNull: false
	}
}, {
	// options
});

MovimientoCajaModelo.belongsTo(TipoMovimientoCajaModelo, { foreignKey: "idTipoMovimientoCaja" });

module.exports = MovimientoCajaModelo;