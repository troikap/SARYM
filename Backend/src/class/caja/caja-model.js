"use strict";

const Sequelize = require("sequelize");
const MovimientoCajaModelo = require("../movimientocaja/movimientocaja-model");
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

module.exports = CajaModelo;

/*
create table caja(
    idCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nroCaja INT(5) UNSIGNED NOT NULL)
*/