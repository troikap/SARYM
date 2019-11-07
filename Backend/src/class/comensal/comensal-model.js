'use strict'

const Sequelize = require('sequelize');
// const PagoModelo = require('../pago/pago-model');
// const PedidoModelo = require('../pedido/pedido-model');
const UsuarioModelo = require('../usuario/usuario-model');

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
        type: Sequelize.INTEGER
    },
    idReserva: {
        type: Sequelize.INTEGER
    },
    idEstadia: {
        type: Sequelize.INTEGER
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

// ComensalModelo.hasMany(PagoModelo, { foreignKey: "idComensal" });
// ComensalModelo.hasMany(PedidoModelo, { foreignKey: "idComensal" });



ComensalModelo.belongsTo(UsuarioModelo, {foreignKey: "idUsuario"});

module.exports = ComensalModelo;