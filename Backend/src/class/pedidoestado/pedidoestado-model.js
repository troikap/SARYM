'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const PedidoEstadoModelo = sequelize.define('pedidoestado', {
	// attributes
	idPedidoEstado: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idPedido: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idEstadoPedido: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	fechaYHoraAltaPedidoEstado: {
		type: Sequelize.DATE,
		allowNull: false
	},
	fechaYHoraBajaPedidoEstado: {
		type: Sequelize.DATE
	}
}, {
		// options
	});

module.exports = PedidoEstadoModelo;

/*
create table pedidoestado(
	idPedidoEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idPedido INT(12) UNSIGNED NOT NULL,
	idEstadoPedido INT(5) UNSIGNED NOT NULL,
	fechaYHoraAltaPedidoEstado datetime NOT NULL,
	fechaYHoraBajaPedidoEstado datetime)
*/