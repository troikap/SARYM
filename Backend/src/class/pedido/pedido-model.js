'use strict'

const Sequelize = require('sequelize');
const PagoPedidoModelo = require('../producto/producto-model');
const DetallePedidoProductoModelo = require('../producto/producto-model');
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

/*
    -- pedido
create table pedido(
	idPedido INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idComensal INT(12) UNSIGNED NOT NULL,
	idEstadia INT(12) UNSIGNED NOT NULL,
    idReserva INT(12) UNSIGNED NOT NULL,
    codPedido VARCHAR(50) NOT NULL,
	fechaYHoraInicioPedido datetime NOT NULL,
	fechaYHoraFinPedido datetime)
*/