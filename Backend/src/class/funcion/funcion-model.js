'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

const FuncionModelo = sequelize.define('funcion', {
	// attributes
	idFuncion: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true
	},
	nombreFuncion: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
}, {
	// options
});

module.exports = FuncionModelo 
