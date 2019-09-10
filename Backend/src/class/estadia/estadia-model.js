'use strict'

const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
const DetalleEstadiMesaModelo = requiere('../../detalleestadiamesa/detalleestadiamesa-model');
const ClienteEstadiaModelo = requiere('../../clienteestadia/clienteestadia-model');
const EstadiaEstadoModelo = requiere('../../estadiaestado/estadiaestado-model');
const ReservaModelo = requiere('../../reserva/reserva-model');
const PedidoModelo = requiere('../../pedido/pedido-model');
const ComensalModelo = requiere('../../comensal/comensal-model');


// DEFINICION DEL MODELO
const EstadiaModelo = sequelize.define('estadia', {
    // attributes
    idEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    idReserva: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idMozoEstadia: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantPersonas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fechaYHoraInicioEstadia: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechaYHoraFinEstadia: {
        type: Sequelize.DATE
    },
    tokenEstadia: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
        // options
    });

EstadiaModelo.hasMany(DetalleEstadiMesaModelo, { foreignKey: "idEstadia" });
EstadiaModelo.hasMany(ClienteEstadiaModelo, { foreignKey: "idEstadia" });
EstadiaModelo.hasMany(EstadiaEstadoModelo, { foreignKey: "idEstadia" });
EstadiaModelo.hasMany(ReservaModelo, { foreignKey: "idEstadia" });
//Pedido modelo es 0..N, verificar "hasOne"
EstadiaModelo.hasOne(PedidoModelo, { foreignKey: "idEstadia" });
EstadiaModelo.hasOne(ComensalModelo, { foreignKey: "idEstadia" });


module.exports = EstadiaModelo;

/*
create table estadia (
	idEstadia INT(12) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	idReserva INT(12) UNSIGNED NOT NULL,
    idMozoEstadia INT(12) UNSIGNED NOT NULL,
    cantPersonas INT(5) UNSIGNED NOT NULL,
	fechaYHoraInicioEstadia datetime NOT NULL,
    fechaYHoraFinEstadia datetime,
    tokenEstadia VARCHAR(50) NOT NULL)
*/