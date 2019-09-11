'use strict'

const Sequelize = require('sequelize');
const MesaEstadoModelo = require('../mesaestado/mesaestado-model');
const UbicacionModelo = require('../ubicacion/ubicacion-model');
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
  idUbicacion: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nroMesa: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  capacidadMesa: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
    // options
  });


MesaModelo.hasMany( MesaEstadoModelo, {foreignKey:"idMesa"} );
MesaModelo.belongsTo( UbicacionModelo, {foreignKey:"idUbicacion"} );
MesaModelo.belongsTo( SectorModelo, {foreignKey:"idSector"} );

module.exports = MesaModelo;


/*
create table mesa (
    idMesa INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idSector INT(10) UNSIGNED NOT NULL,
    idUbicacion INT(10) UNSIGNED NOT NULL,
    nroMesa INT(10) UNSIGNED NOT NULL,
    capacidadMesa INT(10) UNSIGNED NOT NULL);
*/