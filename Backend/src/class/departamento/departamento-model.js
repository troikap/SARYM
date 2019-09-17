'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');

const DepartamentoModelo = sequelize.define('departamento', {
	// attributes
	idDepartamento: {
	  type: Sequelize.INTEGER,
	  primaryKey: true,
	  allowNull: false,
	  autoIncrement: true
	},
	nombreDepartamento: {
	  type: Sequelize.STRING,
	  allowNull: false
	}
  }, {
	// options
  });


module.exports = DepartamentoModelo 
