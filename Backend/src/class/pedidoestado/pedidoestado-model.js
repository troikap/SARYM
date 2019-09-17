"use strict";

const Sequelize = require("sequelize");
const PedidoModelo = require("../pedido/pedido-model");
const EstadoPedidoModelo = require("../estadopedido/estadopedido-model");
var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const PedidoEstadoModelo = sequelize.define(
    "pedidoestado", {
    // attributes
    idPedidoEstado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadoPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaYHoraAltaPedidoEstado: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraBajaPedidoEstado: {
        type: Sequelize.DATE
    }
}, {
    // options
}
);

PedidoEstadoModelo.belongsTo(PedidoModelo, { foreignKey: "idPedido" });
PedidoEstadoModelo.belongsTo(EstadoPedidoModelo, { foreignKey: "idEstadoPedido" });

module.exports = PedidoEstadoModelo;