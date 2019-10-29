'use strict'

const Sequelize = require('sequelize');
// const PagoPedidoModelo = require('../pagopedido/pagopedido-model');
const DetallePedidoProductoModelo = require('../detallepedidoproducto/detallepedidoproducto-model');
const PedidoEstadoModelo = require('../pedidoestado/pedidoestado-model');
const ComensalModelo = require('../comensal/comensal-model');

const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const PedidoModelo = sequelize.define('pedido', {
    // attributes
    idPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idComensal: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadia: {
        type: Sequelize.INTEGER,
    },
    idReserva: {
        type: Sequelize.INTEGER,
    },
    codPedido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fechaYHoraInicioPedido: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraFinPedido: {
        type: Sequelize.DATE
    }
}, {
    // options
});

// PedidoModelo.hasMany(PagoPedidoModelo, { foreignKey: "idPedido" });
PedidoModelo.hasMany(DetallePedidoProductoModelo, { foreignKey: "idPedido" });
PedidoModelo.hasMany(PedidoEstadoModelo, {foreignKey: "idPedido"});
PedidoModelo.belongsTo(ComensalModelo, {foreignKey: "idComensal"});


module.exports = PedidoModelo;