'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('movimientocajas', [{
            "idMovimientoCaja": 1,
            "idCaja": 1,
            "idTipoMovimientoCaja": 1,
            "idUsuario": 1,
            "montoMovimientoCaja": 250.09,
            "descripcionMovimientoCaja": "Pago de comida de mesa nro 20",
            "fechaYHoraMovimientoCaja": currentDate,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('movimientocajas', null, {})
    }
};