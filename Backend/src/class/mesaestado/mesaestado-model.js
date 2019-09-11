'use strict'

const Sequelize = require('sequelize');
const EstadoMesaModelo = require('../estadomesa/estadomesa-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MesaEstadoModelo = sequelize.define('mesaestado', {
  // attributes
  idMesaEstado: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idMesa: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idEstadoMesa: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fechaYHoraAltaMesaEstado: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaMesaEstado: {
    type: Sequelize.DATE
  }
}, {
    // options
  });

MesaEstadoModelo.belongsTo(EstadoMesaModelo, { foreignKey: "idEstadoMesa" });

module.exports = MesaEstadoModelo;

/*
create table mesaestado(
    idMesaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idMesa INT(10) UNSIGNED NOT NULL,
    idEstadoMesa INT(5) UNSIGNED NOT NULL,
    fechaYHoraAltaMesaEstado datetime NOT NULL,
    fechaYHoraBajaMesaEstado datetime)
*/