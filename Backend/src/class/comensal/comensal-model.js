'use strict'

const Sequelize = require('sequelize');

var sequelize = require('../../database/connection');

const ComensalModelo = sequelize.define('comensal', {
    //atributes
    idComensal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aliasComensal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edadComensal: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
{
    //options
}


/*
create table comensal (
    idComensal INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    idUsuario INT(10) UNSIGNED,
    idReserva INT(10) UNSIGNED,
    idEstadia INT(10) UNSIGNED,
    aliasComensal VARCHAR(50) NOT NULL, 
    edadComensal VARCHAR(50) NOT NULL);
*/