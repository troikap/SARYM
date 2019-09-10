'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const RubroModelo = sequelize.define('rubro', {
    // attributes
    idRubro: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codRubro: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombreRubro: {
      type: Sequelize.STRING,
      allowNull: false
    },
    descripcionRubro: {
      type: Sequelize.STRING
    }
  }, {
      // options
    });

/*
create table rubro (
    idRubro INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    codRubro VARCHAR(50) NOT NULL,
    nombreRubro VARCHAR(50) NOT NULL, 
    descripcionRubro VARCHAR(50));
*/