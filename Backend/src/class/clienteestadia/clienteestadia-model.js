'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');

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

/*
create table clienteestadia (
    idClienteEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT(12) UNSIGNED NOT NULL,
    idEstadia INT(12) UNSIGNED NOT NULL)
*/