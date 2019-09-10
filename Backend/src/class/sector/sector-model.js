'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const SectorModelo = sequelize.define('sector', {
    // attributes
    idSector: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codSector: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombreSector: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fechaYHoraBajaSector: {
      type: Sequelize.DATE
    }
  }, {
      // options
    });

/*
create table sector(
    idSector INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    codSector VARCHAR(50) NOT NULL,
    nombreSector VARCHAR(50) NOT NULL,
    fechaYHoraBajaSector datetime)
*/