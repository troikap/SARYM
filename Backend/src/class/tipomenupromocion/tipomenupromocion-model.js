'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

const TipoMenuPromocionModelo = sequelize.define('tipomenupromocion', {
    // attributes
    idTipoMenuPromocion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombreTipoMenuPromocion: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    // options
});

module.exports = TipoMenuPromocionModelo;