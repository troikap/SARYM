'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const CajaModelo = sequelize.define('cajamodelo', {
	// attributes
	idCaja: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true
    },
    nroCaja: {
    type: Sequelize.INTEGER,
    allowNull: false
	}
  }, {
	// options
  });

module.exports = CajaModelo;

/*
create table caja(
    idCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nroCaja INT(5) UNSIGNED NOT NULL)
*/