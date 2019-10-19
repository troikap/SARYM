'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

const EstadoUsuarioModelo = sequelize.define('estadousuario', {
	// attributes
	idEstadoUsuario: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	},
	nombreEstadoUsuario: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
}, {
	// options
});

module.exports = EstadoUsuarioModelo 
