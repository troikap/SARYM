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

MovimientoCajaModelo.belongsTo( TipoMovimientoCajaModelo, {foreignKey:"idTipoMovimientoCaja"} );

module.exports = MovimientoCajaModelo;

/*
create table movimientocaja (
	idMovimientoCaja INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idCaja INT(12) UNSIGNED NOT NULL,
	idTipoMovimientoCaja INT(5) UNSIGNED NOT NULL,
    idUsuario INT(12) UNSIGNED NOT NULL,
    montoMovimientoCaja float NOT NULL,
    descripcionMovimientoCaja VARCHAR(50) NOT NULL,
	fechaYHoraMovimientoCaja datetime NOT NULL)
*/