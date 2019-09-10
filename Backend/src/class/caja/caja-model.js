'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const MovimientoCajaModelo = require('../../movimientocaja/movimientocaja-model');
const CajaEstadoModelo = requre('../../cajaestado/cajaestado-model');

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

//ASOCIACIONES
CajaModelo.hasMany( MovimientoCajaModelo, {foreignKey: "idMovimientoCaja"} );
CajaModelo.hasMany( CajaEstadoModelo, {foreignKey: "idCajaEstado"} );


module.exports = CajaModelo;

/*
create table caja(
    idCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nroCaja INT(5) UNSIGNED NOT NULL)
*/