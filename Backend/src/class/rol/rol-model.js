'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

const RolModelo = sequelize.define('rol', {
	// attributes
	idRol: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	},
	nombreRol: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
}, {
	// options
});

module.exports = RolModelo 
