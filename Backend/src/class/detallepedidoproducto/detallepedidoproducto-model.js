'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const ProductoModelo = require('../producto/producto-model');
const MenuPromocionModelo = require('../menupromocion/menupromocion-model');

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
        type: Sequelize.INTEGER
    },
    idProducto: {
        type: Sequelize.INTEGER
    },
    cantidadPedidoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
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

DetallePedidoProductoModelo.belongsTo(ProductoModelo, { foreignKey: "idProducto" });
DetallePedidoProductoModelo.belongsTo(MenuPromocionModelo, { foreignKey: "idMenuPromocion" });

module.exports = DetallePedidoProductoModelo;