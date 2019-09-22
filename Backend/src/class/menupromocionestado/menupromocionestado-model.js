'use strict'

const Sequelize = require('sequelize');
const EstadoMenuPromocionModelo = require('../estadomenupromocion/estadomenupromocion-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MenuPromocionEstadoModelo = sequelize.define('menupromocionestado', {
    // attributes
    idMenuPromocionEstado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcionMenuPromocionEstado: {
        type: Sequelize.STRING
    },
    fechaYHoraAltaMenuPromocionEstado: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraBajaMenuPromocionEstado: {
        type: Sequelize.DATE
    }
}, {
    // options
});

MenuPromocionEstadoModelo.belongsTo(EstadoMenuPromocionModelo, { foreignKey: "idEstadoMenuPromocion" });

module.exports = MenuPromocionEstadoModelo;