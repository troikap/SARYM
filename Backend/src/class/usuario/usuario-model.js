'use strict'

const Sequelize = require('sequelize');
const UsuarioEstadoModelo = require('../usuarioestado/usuarioestado-model');
const DepartamentoModelo = require('../departamento/departamento-model');
const RolUsuarioModelo = require('../rolusuario/rolusuario-model');
RolUsuarioModelo
var sequelize = require('../../database/connection');

const UsuarioModelo = sequelize.define('usuario', {
	// attributes
	idUsuario: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true
	},
	cuitUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	nombreUsuario: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	apellidoUsuario: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	contrasenaUsuario: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	dniUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	domicilioUsuario: {
		type: Sequelize.STRING
	},
	emailUsuario: {
		type: Sequelize.STRING
	},
	idDepartamento: {
		type: Sequelize.INTEGER
	},
	nroCelularUsuario: {
		type: Sequelize.INTEGER
	},
	nroTelefonoUsuario: {
		type: Sequelize.BIGINT(15)
	},
	  
  }, {
	// options
  });
// belongsTo Tiene
// hasMany varios

// ASOCIACIONES
UsuarioModelo.hasMany( UsuarioEstadoModelo , {foreignKey: "idUsuario"} )
UsuarioModelo.belongsTo( DepartamentoModelo , {foreignKey: "idDepartamento"} )
UsuarioModelo.hasMany( RolUsuarioModelo , {foreignKey: "idUsuario"} )

// SCOPES

// HOOKS
 

  // allowNull Sequelize.DATE
//    Sequelize.STRING 
//    Sequelize.NOW
//   // defaultValue: true 
//   Sequelize.BOOLEAN 
//   Sequelize.INTEGER 
//   unique: 'compositeIndex' 
//   // primaryKey: true 
//   autoIncrement: true
//    Sequelize.TEXT   
//    .UNSIGNED 



module.exports = UsuarioModelo 