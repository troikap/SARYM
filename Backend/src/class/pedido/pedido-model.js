'use strict'

const Sequelize = require('sequelize');
const PagoPedidoModelo = require('../producto/producto-model');
const DetallePedidoProductoModelo = require('../detallepedidoproducto/detallepedidoproducto-model');
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
        allowNull: false
    },
    codPedido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionUsuarioEstado: {
        type: Sequelize.STRING
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

PedidoModelo.hasMany(PagoPedidoModelo, { foreignKey: "idPedido" });
PedidoModelo.hasMany(DetallePedidoProductoModelo, { foreignKey: "idPedido" });

module.exports = PedidoModelo;