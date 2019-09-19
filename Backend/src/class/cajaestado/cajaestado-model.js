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
        descripcionCajaEstado: {
            type: Sequelize.STRING,
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