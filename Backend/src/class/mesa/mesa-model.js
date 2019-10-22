'use strict'

const Sequelize = require('sequelize');
const MesaEstadoModelo = require('../mesaestado/mesaestado-model');
const SectorModelo = require('../sector/sector-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MesaModelo = sequelize.define('mesa', {
  // attributes
  idMesa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idSector: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nroUbicacion: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  nroMesa: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique:true
  },
  capacidadMesa: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  // options
});

MesaModelo.hasMany(MesaEstadoModelo, { foreignKey: "idMesa" });
MesaModelo.belongsTo(SectorModelo, { foreignKey: "idSector" });

module.exports = MesaModelo;