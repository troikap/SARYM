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