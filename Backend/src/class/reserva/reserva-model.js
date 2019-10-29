"use strict";

const Sequelize = require("sequelize");
const DetalleReservaMesaModelo = require("../detallereservamesa/detallereservamesa-model");
const ComensalModelo = require("../comensal/comensal-model");
const PedidoModelo = require("../pedido/pedido-model");
const ReservaEstadoModelo = require("../reservaestado/reservaestado-model");
const UsuarioModelo = require("../usuario/usuario-model");
// const EstadiaModelo = require("../estadia/estadia-model");


var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const ReservaModelo = sequelize.define(
    "reserva", {
        // attributes
        idReserva: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idUsuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        codReserva: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        cantPersonas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaReserva: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        horaEntradaReserva: {
            type: Sequelize.TIME,
            allowNull: false
        },
        horaSalidaReserva: {
            type: Sequelize.TIME
        },
        tokenReserva: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        // options
    }
);

ReservaModelo.hasMany(DetalleReservaMesaModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(ComensalModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(PedidoModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(ReservaEstadoModelo, { foreignKey: "idReserva" });
ReservaModelo.belongsTo(UsuarioModelo, { foreignKey: "idUsuario" })
// ReservaModelo.hasOne(EstadiaModelo, { foreignKey: "idReserva" })


module.exports = ReservaModelo;