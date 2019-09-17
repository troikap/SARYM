'use strict'

const Sequelize = require('sequelize');
const EstadoMenuPromocionModelo = require('../estadomenupromocion/estadomenupromocion-model');
const MenuPromocionModelo = require('../menupromocion/menupromocion-model');
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
//MenuPromocionEstadoModelo.belongsTo(MenuPromocionModelo, { foreignKey: "idMenuPromocion" });

module.exports = MenuPromocionEstadoModelo;

/*
create table menupromocionestado(
	idMenuPromocionEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idMenuPromocion INT(10) UNSIGNED NOT NULL,
	idEstadoMenuPromocion INT(5) UNSIGNED NOT NULL,
	descripcionMenuPromocionEstado VARCHAR(50),
	fechaYHoraAltaMenuPromocionEstado datetime NOT NULL,
	fechaYHoraBajaMenuPromocionEstado datetime)
*/