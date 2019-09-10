'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const ProductoModelo = require('../../producto/producto-model');

// DEFINICION DEL MODELO
const UnidadMedidaModelo = sequelize.define('unidadmedida', {
  // attributes
  idUnidadMedida: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  codUnidadMedida: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nombreUnidadMedida: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripcionUnidadMedida: {
    type: Sequelize.STRING
  },
  caracterUnidadMedida: {
    type: Sequelize.STRING
  }
}, {
    // options
  });

UnidadMedidaModelo.hasMany(ProductoModelo, { foreignKey: "idUnidadModelo" });

module.exports = UnidadMedidaModelo;

/*
create table unidadmedida (
    idUnidadMedida INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codUnidadMedida VARCHAR(50) NOT NULL,
    nombreUnidadMedida VARCHAR(50) NOT NULL,
    descripcionUnidadMedida VARCHAR(50),
    caracterUnidadMedida VARCHAR(10));

*/