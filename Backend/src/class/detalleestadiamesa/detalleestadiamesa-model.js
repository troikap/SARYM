'use strict'

const Sequelize = require('sequelize');
const MesaModelo = require('../mesa/mesa-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetalleEstadiaMesaModelo = sequelize.define('detalleestadiamesa', {
    // attributes
    idDetalleEstadiaMesa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMesa: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
});

DetalleEstadiaMesaModelo.belongsTo(MesaModelo, { foreignKey: "idMesa" });

module.exports = DetalleEstadiaMesaModelo;