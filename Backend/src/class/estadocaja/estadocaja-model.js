'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const EstadoCajaModelo = sequelize.define('estadocaja', {
  // attributes
  idEstadoCaja: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  codestadocaja: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nombreestadocaja: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    // options
  });

module.exports = EstadoCajaModelo;

/*
create table estadocaja (
    idEstadoCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codestadocaja VARCHAR(50) NOT NULL,
    nombreestadocaja VARCHAR(50) NOT NULL)
*/