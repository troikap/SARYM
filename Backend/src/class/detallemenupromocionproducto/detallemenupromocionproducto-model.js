'use strict'

const Sequelize = require('sequelize');
// const MenuPromocionModelo = require('../menupromocion/menupromocion-model');
const ProductoModelo = require('../producto/producto-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const DetalleMenuPromocionProductoModelo = sequelize.define('detallemenupromocionproducto', {
    // attributes
    idDetalleMenuPromocionProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantidadProductoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {
    // options
});

DetalleMenuPromocionProductoModelo.belongsTo(ProductoModelo, { foreignKey: "idProducto" });
// DetalleMenuPromocionProductoModelo.belongsTo(MenuPromocionModelo, { foreignKey: "idMenuPromocion" });

module.exports = DetalleMenuPromocionProductoModelo;