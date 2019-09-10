'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MozoEstadiaModelo = sequelize.define('mozoestadia', {
  // attributes
  idMozoEstadia: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fechaYHoraInicioMozoEstadia: {
    type: Sequelize.DATE,
    allowNull: false
  },
  fechaYHoraFinMozoEstadia: {
    type: Sequelize.DATE
  }
}, {
    // options
  });

module.exports = MozoEstadiaModelo;

/*
create table mozoestadia (
    idMozoEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(12) UNSIGNED NOT NULL,
    fechaYHoraInicioMozoEstadia datetime NOT NULL,
	fechaYHoraFinMozoEstadia datetime)
*/