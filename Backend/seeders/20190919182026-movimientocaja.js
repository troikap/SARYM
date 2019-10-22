'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('movimientocajas', [
        {
            "idMovimientoCaja": 1,
            "idCaja": 1,
            "idTipoMovimientoCaja": 1,
            "idUsuario": 1,
            "montoMovimientoCaja": 250.09,
            "descripcionMovimientoCaja": "Pago de comida de mesa nro 20",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idMovimientoCaja": 2,
            "idCaja": 1,
            "idTipoMovimientoCaja": 1,
            "idUsuario": 1,
            "montoMovimientoCaja": 300,
            "descripcionMovimientoCaja": "Pago de comida de mesa nro 20",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idMovimientoCaja": 3,
            "idCaja": 1,
            "idTipoMovimientoCaja": 2,
            "idUsuario": 1,
            "montoMovimientoCaja": 100,
            "descripcionMovimientoCaja": "Pago de impuesto",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idMovimientoCaja": 4,
            "idCaja": 2,
            "idTipoMovimientoCaja": 1,
            "idUsuario": 1,
            "montoMovimientoCaja": 2300,
            "descripcionMovimientoCaja": "Pago de reserva",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idMovimientoCaja": 5,
            "idCaja": 2,
            "idTipoMovimientoCaja": 1,
            "idUsuario": 1,
            "montoMovimientoCaja": 3000,
            "descripcionMovimientoCaja": "Pago de reserva con propina",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
    ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('movimientocajas', null, {})
    }
};