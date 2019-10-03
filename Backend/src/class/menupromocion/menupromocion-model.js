'use strict'

const Sequelize = require('sequelize');
const TipoMenuPromocionModelo = require('../tipomenupromocion/tipomenupromocion-model');
const DetallePedidoProductoModelo = require('../detallepedidoproducto/detallepedidoproducto-model');
const MenuPromocionEstadoModelo = require('../menupromocionestado/menupromocionestado-model');
const PrecioMenuPromocionModelo = require('../preciomenupromocion/preciomenupromocion-model');
const DetalleMenuPromocionProductoModelo = require('../detallemenupromocionproducto/detallemenupromocionproducto-model');

var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MenuPromocionModelo = sequelize.define('menupromocion', {
    // attributes
    idMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idTipoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    codMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nombreMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descripcionMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pathImagenMenuPromocion: {
        type: Sequelize.STRING
    }
}, {
    // options
});

MenuPromocionModelo.belongsTo(TipoMenuPromocionModelo, { foreignKey: "idTipoMenuPromocion" });
MenuPromocionModelo.hasMany(DetallePedidoProductoModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(MenuPromocionEstadoModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(PrecioMenuPromocionModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(DetalleMenuPromocionProductoModelo, { foreignKey: "idMenuPromocion" });

module.exports = MenuPromocionModelo;