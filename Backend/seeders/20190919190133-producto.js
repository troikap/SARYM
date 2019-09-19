'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productos', [{
            "idProducto": 1,
            "idRubro": 1,
            "idUnidadMedida": 1,
            "codProducto": "CODIGO*1234",
            "nombreProducto": "Coca Cola",
            "descripcionProducto": "Bebida gaseosa de 500cm",
            "pathImagenProducto": "https://algunaurl.com",
            "createdAt": currentDate,
            "updatedAt": currentDate
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productos', null, {})
    }
};