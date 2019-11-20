'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const FuncionRolModelo = require("../funcionrol/funcionrol-model");

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

	RolModelo.hasMany(FuncionRolModelo, { foreignKey: "idRol" });

module.exports = RolModelo 
