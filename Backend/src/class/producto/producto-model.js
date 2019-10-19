'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

const RubroModelo = require('../rubro/rubro-model');
const UnidadMedidaModelo = require('../unidadmedida/unidadmedida-model');
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
    cantidadMedida: {
        type: Sequelize.INTEGER,
    },
    codProducto: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    nombreProducto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionProducto: {
        type: Sequelize.STRING,
    },
    pathImagenProducto: {
        type: Sequelize.STRING
    }
}, {
    // options
});

ProductoModelo.belongsTo(RubroModelo, { foreignKey: "idRubro" });
ProductoModelo.belongsTo(UnidadMedidaModelo, { foreignKey: "idUnidadMedida" });
ProductoModelo.hasMany(ProductoEstadoModelo, { foreignKey: "idProducto" });
ProductoModelo.hasMany(PrecioProductoModelo, { foreignKey: "idProducto" });

module.exports = ProductoModelo;