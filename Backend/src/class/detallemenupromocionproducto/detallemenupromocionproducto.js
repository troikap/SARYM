'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

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

/*
create table detallemenupromocionproducto (
    idDetalleMenuPromocionProducto INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idProducto INT(10) UNSIGNED NOT NULL,
    idMenuPromocion INT(10) UNSIGNED NOT NULL,
    cantidadProductoMenuPromocion INT(10) NOT NULL);
*/