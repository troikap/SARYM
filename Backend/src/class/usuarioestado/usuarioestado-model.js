'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const EstadoUsuarioModel = require("../estadousuario/estadousuario-model");


// DEFINICION DEL MODELO
const UsuarioModel = sequelize.define('usuarioestado', {
	// attributes
	idUsuarioEstado: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true
	},
	idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
	idEstadoUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  descripcionUsuarioEstado: {
    type: Sequelize.STRING
  },
  fechaYHoraAltaUsuarioEstado: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaUsuarioEstado: {
    type: Sequelize.DATE
	}
  }, {
	// options
  });
// belongsTo Tiene

// ASOCIACIONES
UsuarioModel.belongsTo( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.belongsTo( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.belongsTo( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.belongsTo( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )

// UsuarioModel.hasMany( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.hasMany( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.hasMany( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )
// UsuarioModel.hasMany( EstadoUsuarioModel , {foreignKey: "idEstadoUsuario"} )


// SCOPES

// HOOKS

module.exports = UsuarioModel 