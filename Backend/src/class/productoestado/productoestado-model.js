'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const ProductoEstadoModelo = sequelize.define('productoestado', {
	// attributes
	idProductoEstado: {
	  type: Sequelize.INTEGER,
	  allowNull: false,
	  primaryKey: true,
	  autoIncrement: true
	},
	idProducto: {
	  type: Sequelize.INTEGER,
	  allowNull: false
	},
	idEstadoProducto: {
	  type: Sequelize.INTEGER,
	  allowNull: false
	},
	descripcionProductoEstado: {
	  type: Sequelize.STRING
	},
	fechaYHoraAltaProductoEstado: {
	  type: Sequelize.DATE,
	  allowNull: false
	},
	fechaYHoraBajaProductoEstado: {
	  type: Sequelize.DATE
	}
  }, {
	  // options
	});

/*
create table productoestado(
	idProductoEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idProducto INT(10) UNSIGNED NOT NULL,
	idEstadoProducto INT(5) UNSIGNED NOT NULL,
	descripcionProductoEstado VARCHAR(50), 
	fechaYHoraAltaProductoEstado datetime NOT NULL,
	fechaYHoraBajaProductoEstado datetime)
*/