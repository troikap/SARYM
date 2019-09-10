'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const PagoModelo = require('../../pago/pago-model');
const PedidoModelo = require('../../pedido/pedido-model');

const ComensalModelo = sequelize.define('comensal', {
    //atributes
    idComensal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aliasComensal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edadComensal: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
{
    //options
}

ComensalModelo.hasMany(PagoModelo, { foreignKey: "idComensal" })
ComensalModelo.hasMany(PedidoModelo, { foreignKey: "idComensal" })

module.exports = ComensalModelo;

/*
create table comensal (
    idComensal INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(10) UNSIGNED,
    idReserva INT(10) UNSIGNED,
    idEstadia INT(10) UNSIGNED,
    aliasComensal VARCHAR(50) NOT NULL,
    edadComensal VARCHAR(50) NOT NULL);
*/