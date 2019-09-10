'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const ProductoModelo = sequelize.define('producto', {
    // attributes
    idProducto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idRubro: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    idUnidadMedida: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    codProducto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nombreProducto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcionProducto: {
      type: Sequelize.STRING,
      allowNull: false
    },
    pathImagenProducto: {
      type: Sequelize.STRING
    }
  }, {
      // options
    });

/*
create table producto (
    idProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idRubro INT(10) UNSIGNED NOT NULL,
    idUnidadMedida INT(10) UNSIGNED NOT NULL,
    codProducto VARCHAR(50) NOT NULL,
    nombreProducto VARCHAR(50) NOT NULL, 
    descripcionProducto VARCHAR(50) NOT NULL,
    pathImagenProducto VARCHAR(100));
*/