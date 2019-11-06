"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "unidadmedidas", [
                {idUnidadMedida: 1, codUnidadMedida: "CM3", nombreUnidadMedida: "Centimetro/s Cúbico/s", descripcionUnidadMedida: "Centímetros Cúbicos", caracterUnidadMedida: "Cm3", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 2, codUnidadMedida: "GRS", nombreUnidadMedida: "Gramo/s", descripcionUnidadMedida: "Gramos", caracterUnidadMedida: "Grs", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 3, codUnidadMedida: "ON", nombreUnidadMedida: "Onza/s", descripcionUnidadMedida: "Onzas", caracterUnidadMedida: "Oz", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 4, codUnidadMedida: "UN", nombreUnidadMedida: "Unidad/es", descripcionUnidadMedida: "Unidades", caracterUnidadMedida: "Unid", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 5, codUnidadMedida: "LT", nombreUnidadMedida: "Litro/s", descripcionUnidadMedida: "Litros", caracterUnidadMedida: "Lt", createdAt: currentDate, updatedAt: currentDate},
                {idUnidadMedida: 6, codUnidadMedida: "POR", nombreUnidadMedida: "Porcion/es", descripcionUnidadMedida: "Porciones", caracterUnidadMedida: "Porc", createdAt: currentDate, updatedAt: currentDate}
                
            ], {});
    },

    down: (queryInterface, Sequelize) => {
        console.log("ERRRRRR")
        return queryInterface.bulkDelete("unidadmedidas", null, {});
    }
};