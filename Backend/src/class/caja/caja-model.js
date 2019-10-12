"use strict";

const Sequelize = require("sequelize");
const MovimientoCajaModelo = require("../movimientocaja/movimientocaja-model");
const CajaEstadoModelo = require("../cajaestado/cajaestado-model");

var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const CajaModelo = sequelize.define(
    "caja", {
    // attributes
    idCaja: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nroCaja: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
}
);

//ASOCIACIONES
CajaModelo.hasMany(MovimientoCajaModelo, { foreignKey: "idCaja" });
CajaModelo.hasMany(CajaEstadoModelo, { foreignKey: "idCaja" });


module.exports = CajaModelo;