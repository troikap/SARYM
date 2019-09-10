'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const TipoMovimientoCaja = sequelize.define('tipomovimientocaja', {
    // attributes
    idTipoMenuPromocion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombreTipoMovimientoCaja: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

/*
create table tipomovimientocaja (
    idTipoMovimientoCaja INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    nombreTipoMovimientoCaja VARCHAR(50) NOT NULL)
*/