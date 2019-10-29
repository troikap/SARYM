'use strict'

const Sequelize = require('sequelize');
var sequelize = require('../../database/connection');
const UsuarioModelo = require("../usuario/usuario-model");

// DEFINICION DEL MODELO
const ClienteEstadiaModelo = sequelize.define('clienteestadia', {
    // attributes
    idClienteEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    // options
});



// ClienteEstadiaModelo.hasOne(UsuarioModelo, { foreignKey: "idUsuario" }) ;
ClienteEstadiaModelo.belongsTo(UsuarioModelo, { foreignKey: "idUsuario" });


module.exports = ClienteEstadiaModelo;