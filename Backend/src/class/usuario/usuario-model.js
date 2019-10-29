"use strict";

const Sequelize = require("sequelize");
const UsuarioEstadoModelo = require("../usuarioestado/usuarioestado-model");
const RolUsuarioModelo = require("../rolusuario/rolusuario-model");
// const CajaEstadoModelo = require("../cajaestado/cajaestado-model");
// const MozoEstadiaModelo = require("../mozoestadia/mozoestadia-model");
// const ClienteEstadiaModelo = require("../clienteestadia/clienteestadia-model");
// const ReservaModelo = require("../reserva/reserva-model");
// const MovimientoCajaModelo = require("../movimientocaja/movimientocaja-model");
const DepartamentoModelo = require("../departamento/departamento-model");
const ComensalModelo = require("../comensal/comensal-model");
var sequelize = require("../../database/connection");

const UsuarioModelo = sequelize.define(
    "usuario", {
    // attributes
    idUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    cuitUsuario: {
        type: Sequelize.BIGINT(11),
        allowNull: false
    },
    nombreUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    apellidoUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contrasenaUsuario: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dniUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    domicilioUsuario: {
        type: Sequelize.STRING
    },
    emailUsuario: {
        type: Sequelize.STRING
    },
    idDepartamento: {
        type: Sequelize.INTEGER
    },
    nroCelularUsuario: {
        type: Sequelize.BIGINT(10)
    },
    nroTelefonoUsuario: {
        type: Sequelize.BIGINT(10)
    }
}, {
    // options
}
);

UsuarioModelo.hasMany(UsuarioEstadoModelo, { foreignKey: "idUsuario" });
UsuarioModelo.hasMany(RolUsuarioModelo, { foreignKey: "idUsuario" });
// UsuarioModelo.hasMany(CajaEstadoModelo, { foreignKey: "idUsuario" });
// UsuarioModelo.hasMany(MozoEstadiaModelo, { foreignKey: "idUsuario" });
// UsuarioModelo.hasMany(ClienteEstadiaModelo, { foreignKey: "idUsuario" });
// UsuarioModelo.hasMany(ReservaModelo, { foreignKey: "idUsuario" });
// UsuarioModelo.hasMany(MovimientoCajaModelo, { foreignKey: "idUsuario" });
UsuarioModelo.hasOne(ComensalModelo, { foreignKey: "idUsuario" });
UsuarioModelo.belongsTo(DepartamentoModelo, { foreignKey: "idDepartamento" });

// UsuarioModelo.hasMany(ClienteEstadiaModelo, { foreignKey: "idUsuario" });

module.exports = UsuarioModelo;