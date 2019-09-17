"use strict";

const Sequelize = require("sequelize");
const EstadoReservaModelo = require("../estadoreserva/estadoreserva-model");
var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const ReservaEstadoModelo = sequelize.define(
    "reservaestado", {
    // attributes
    idReservaEstado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadoReserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcionReservaEstado: {
        type: Sequelize.STRING
    },
    fechaYHoraAltaReservaEstado: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraBajaReservaEstado: {
        type: Sequelize.DATE
    }
}, {
    // options
}
);

ReservaEstadoModelo.belongsTo(EstadoReservaModelo, { foreignKey: "idEstadoReserva" });

module.exports = ReservaEstadoModelo;