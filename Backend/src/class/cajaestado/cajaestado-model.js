"use strict";

const Sequelize = require("sequelize");
const EstadoCajaModelo = require("../estadocaja/estadocaja-model");
const UsuarioModelo = require("../usuario/usuario-model");
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
        },
        montoAperturaCajaEstado: {
            type: Sequelize.FLOAT,
        },
        montoCierreCajaEstado: {
            type: Sequelize.FLOAT,
        },
        fechaYHoraAltaCajaEstado: {
            type: Sequelize.DATE,
            allowNull: false
        },
        fechaYHoraBajaCajaEstado: {
            type: Sequelize.DATE
        }
    }, {
        // options
    }
);

CajaEstadoModelo.belongsTo(EstadoCajaModelo, { foreignKey: "idEstadoCaja" });
CajaEstadoModelo.belongsTo(UsuarioModelo, { foreignKey: "idUsuario" });

// CajaEstadoModelo.belongsTo(CajaModelo, { foreignKey: "idCaja" });

module.exports = CajaEstadoModelo;