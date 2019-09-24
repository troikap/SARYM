'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

const RubroModelo = require('../rubro/rubro-model');
const UnidadMedidaModelo = require('../unidadmedida/unidadmedida-model');
const DetalleMenuPromocionProductoModelo = require('../detallemenupromocionproducto/detallemenupromocionproducto-model');
const DetallePedidoProductoModelo = require('../detallepedidoproducto/detallepedidoproducto-model');
const ProductoEstadoModelo = require('../productoestado/productoestado-model');
const PrecioProductoModelo = require('../precioproducto/precioproducto-model');

// DEFINICION DEL MODELO
const ProductoModelo = sequelize.define('producto', {
    // attributes
    idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idRubro: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idUnidadMedida: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codProducto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombreProducto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionProducto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pathImagenProducto: {
        type: Sequelize.STRING
    }
}, {
    // options
});

ProductoModelo.belongsTo(RubroModelo, { foreignKey: "idRubro" });
ProductoModelo.belongsTo(UnidadMedidaModelo, { foreignKey: "idUnidadMedida" });
ProductoModelo.hasMany(DetalleMenuPromocionProductoModelo, { foreignKey: "idProducto" });
ProductoModelo.hasMany(DetallePedidoProductoModelo, { foreignKey: "idProducto" });
ProductoModelo.hasMany(ProductoEstadoModelo, { foreignKey: "idProducto" });
ProductoModelo.hasMany(PrecioProductoModelo, { foreignKey: "idProducto" });

module.exports = ProductoModelo;