'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const DetalleReservaModelo = requiere('../../detallereserva/detallereserva-model');
const ComensalModelo = requiere('../../comensal/comensal-model');
const PedidoModelo = requiere('../../pedido/pedido-model');
const ReservaEstadoModelo = requiere('../../reservaestado/reservaestado-model');


// DEFINICION DEL MODELO
const ReservaModelo = sequelize.define('reservamodelo', {
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
        allowNull: false
    },
    cantPersonas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaReserva: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horaEntradaReserva: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horaSalidaReserva: {
        type: Sequelize.DATE,
    },
    tokenReserva: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

ReservaModelo.hasMany(DetalleReservaModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(ComensalModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(PedidoModelo, { foreignKey: "idReserva" });
ReservaModelo.hasMany(ReservaEstadoModelo, { foreignKey: "idReserva" });

module.exports = ReservaModelo;


/*
create table reserva(
	idReserva INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idUsuario INT(12) UNSIGNED NOT NULL,
    codReserva VARCHAR(50) NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaReserva date NOT NULL,
	horaEntradaReserva time NOT NULL,
    horaSalidaReserva time,
    tokenReserva VARCHAR(50) NOT NULL)
*/