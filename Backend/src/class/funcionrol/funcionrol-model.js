'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const FuncionModelo = require("../funcion/funcion-model");

// DEFINICION DEL MODELO
const FuncionRolModelo = sequelize.define('funcionrol', {
  idFuncionRol: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idFuncion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  idRol: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fechaYHoraAltaFuncionRol: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraBajaFuncionRol: {
    type: Sequelize.DATE
  }
}, {
  // options
});

FuncionRolModelo.belongsTo(FuncionModelo, { foreignKey: "idFuncion" })

module.exports = FuncionRolModelo 