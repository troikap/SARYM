'use strict'

const Sequelize = require('sequelize');
const UsuarioModelo = require('../usuario/usuario-model');

var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MozoEstadiaModelo = sequelize.define('mozoestadia', 
  {
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
    idEstadia: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fechaYHoraInicioMozoEstadia: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fechaYHoraFinMozoEstadia: {
      type: Sequelize.DATE
    },
    descripcionMozoEstadia: {
      type: Sequelize.STRING,
    },
  }, {
  // options
});


MozoEstadiaModelo.belongsTo(UsuarioModelo, { foreignKey: "idUsuario" });


module.exports = MozoEstadiaModelo;