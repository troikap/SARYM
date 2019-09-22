'use strict'

const Sequelize = require('sequelize');
const PagoModelo = require('../pago/pago-model');
const PedidoModelo = require('../pedido/pedido-model');
var sequelize = require('../../database/connection');

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
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
});

ComensalModelo.hasMany(PagoModelo, { foreignKey: "idComensal" });
ComensalModelo.hasMany(PedidoModelo, { foreignKey: "idComensal" });

module.exports = ComensalModelo;