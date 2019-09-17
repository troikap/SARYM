'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const RolModelo = require("../rol/rol-model");
const UsuarioModelo = require("../usuario/usuario-model");


// DEFINICION DEL MODELO
const RolUsuarioModelo = sequelize.define('rolusuario', {
	// attributes
	idRolUsuario: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true
	},
	idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
	idRol: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fechaYHoraAltaRolUsuario: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaRolUsuario: {
    type: Sequelize.DATE
	}
  }, {
	// options
  });
// belongsTo Tiene
// hasMany varios

// ASOCIACIONES
RolUsuarioModelo.belongsTo( RolModelo , {foreignKey: "idRol"} )
RolUsuarioModelo.belongsTo( UsuarioModelo , {foreignKey: "idUsuario"} )

// SCOPES

// HOOKS


module.exports = RolUsuarioModelo 