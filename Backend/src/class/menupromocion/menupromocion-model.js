'use strict'

const Sequelize = require('sequelize');
const MenuPromocionEstadoModelo = require('../menupromocionestado/menupromocionestado-model');
const PrecioMenuPromocionModelo = require('../preciomenupromocion/preciomenupromocion-model');
const TipoMenuPromocionModelo = require('../tipomenupromocion/tipomenupromocion-model');
const DetalleMenuPromocionProductoModelo = require('../detallemenupromocionproducto/detallemenupromocionproducto-model');
const DetallePedidoProductoModelo = require('../detallepedidoproducto/detallepedidoproducto-model');
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
        type: Sequelize.INTEGER,
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

MenuPromocionModelo.hasOne(TipoMenuPromocionModelo, { foreignKey: "idTipoMenuPromocion" });

/*
MenuPromocionModelo.hasMany(MenuPromocionEstadoModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(PrecioMenuPromocionModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(DetalleMenuPromocionProductoModelo, { foreignKey: "idMenuPromocion" });
MenuPromocionModelo.hasMany(DetallePedidoProductoModelo, { foreignKey: "idMenuPromocion" });
*/
module.exports = MenuPromocionModelo;

/*
create table menupromocion (
    idMenuPromocion INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idTipoMenuPromocion INT(5) NOT NULL,
    codMenuPromocion VARCHAR(50) NOT NULL,
    nombreMenuPromocion VARCHAR(50) NOT NULL,
    descripcionMenuPromocion VARCHAR(50) NOT NULL,
    pathImagenMenuPromocion VARCHAR(100));
*/