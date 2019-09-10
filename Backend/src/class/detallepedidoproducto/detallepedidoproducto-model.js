'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetallePedidoProductoModelo = sequelize.define('detallepedidoproducto', {
    // attributes
    idDetallePedidoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantidadPedidoProducto: {
        type: Sequelize.INTEGER
    },
    fechaYHoraInicioPedidoProducto: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraEntregaPedidoProducto: {
        type: Sequelize.DATE
    }
}, {
        // options
    });

module.exports = DetallePedidoProductoModelo;

/*
    -- detallepedidoproducto
create table detallepedidoproducto (
    idDetallePedidoProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idPedido INT(12) UNSIGNED NOT NULL,
    idMenuPromocion INT(12) UNSIGNED NOT NULL,
    idProducto INT(12) UNSIGNED NOT NULL,
    cantidadPedidoProducto INT(5) NOT NULL,
    fechaYHoraInicioPedidoProducto datetime NOT NULL,
    fechaYHoraEntregaPedidoProducto datetime);
*/