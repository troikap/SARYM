"use strict";

const Sequelize = require("sequelize");
const EstadoProductoModelo = require("../estadoproducto/estadoproducto-model");
var sequelize = require("../../database/connection");

// DEFINICION DEL MODELO
const ProductoEstadoModelo = sequelize.define(
    "productoestado", {
    // attributes
    idProductoEstado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadoProducto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descripcionProductoEstado: {
        type: Sequelize.STRING
    },
    fechaYHoraAltaProductoEstado: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraBajaProductoEstado: {
        type: Sequelize.DATE
    }
}, {
    // options
}
);

ProductoEstadoModelo.belongsTo(EstadoProductoModelo, { foreignKey: "idEstadoProducto" });

module.exports = ProductoEstadoModelo;