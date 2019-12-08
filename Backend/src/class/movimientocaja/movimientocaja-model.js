'use strict'

const Sequelize = require('sequelize');
const TipoMovimientoCajaModelo = require('../tipomovimientocaja/tipomovimientocaja-model');
const UsuarioModelo = require('../usuario/usuario-model');
const PagoModelo = require('../pago/pago-model');
var sequelize = require('../../database/connection');

// DEFINICION DEL MODELO
const MovimientoCajaModelo = sequelize.define('movimientocaja', {
	// attributes
	idMovimientoCaja: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	idCaja: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idTipoMovimientoCaja: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idUsuario: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	idPago: {
		type: Sequelize.INTEGER,
	},
	montoMovimientoCaja: {
		type: Sequelize.FLOAT,
		allowNull: false
	},
	descripcionMovimientoCaja: {
		type: Sequelize.STRING,
		allowNull: false
	},
	fechaYHoraMovimientoCaja: {
		type: Sequelize.DATE,
		allowNull: false
	}
}, {
	// options
});

MovimientoCajaModelo.belongsTo(TipoMovimientoCajaModelo, { foreignKey: "idTipoMovimientoCaja" });
MovimientoCajaModelo.belongsTo(UsuarioModelo, { foreignKey: "idUsuario" });
MovimientoCajaModelo.belongsTo(PagoModelo, { foreignKey: "idPago" });


module.exports = MovimientoCajaModelo;