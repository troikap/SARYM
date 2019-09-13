"use strict";

const Sequelize = require("sequelize");
const EstadoCajaModelo = require("../estadocaja/estadocaja-model");
const CajaModelo = require("../caja/caja-model");
var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const CajaEstadoModelo = sequelize.define(
    "cajaestado", {
        // attributes
        idCajaEstado: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idCaja: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idEstadoCaja: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        montoAperturaCajaEstado: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        montoCierreCajaEstado: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        fechaYHoraCajaEstado: {
            type: Sequelize.DATE
        }
    }, {
        // options
    }
);

CajaEstadoModelo.belongsTo(EstadoCajaModelo, { foreignKey: "idEstadoCaja" });
CajaEstadoModelo.belongsTo(CajaModelo, { foreignKey: "idCaja" });

module.exports = CajaEstadoModelo;
/*
create table cajaestado (
	idCajaEstado INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idCaja INT(12) UNSIGNED NOT NULL,
	idEstadoCaja INT(5) UNSIGNED NOT NULL,
    idUsuario INT(12) UNSIGNED NOT NULL,
    montoAperturaCajaEstado float NOT NULL,
    montoCierreCajaEstado float,
	fechaYHoraCajaEstado datetime NOT NULL)
*/