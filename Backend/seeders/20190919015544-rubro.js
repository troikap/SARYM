'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('rubros', [
            { idRubro: 1, codRubro: 'ENTR', nombreRubro: 'Entradas', descripcionRubro: 'Entradas variadas', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 2, codRubro: 'PESC', nombreRubro: 'Pescados', descripcionRubro: 'Pescados frescos', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 3, codRubro: 'CAR', nombreRubro: 'Carnes', descripcionRubro: 'Carnes rojas de novillo, chivo', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 4, codRubro: 'PAST', nombreRubro: 'Pastas', descripcionRubro: 'Pastas caseras', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 5, codRubro: 'ENS', nombreRubro: 'Ensaladas', descripcionRubro: 'Ensaladas frescas de la casa', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 6, codRubro: 'SAND', nombreRubro: 'Sandwiches', descripcionRubro: 'Sandwiches de pan francés', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 7, codRubro: 'MAR', nombreRubro: 'Maricos', descripcionRubro: 'Mariscos frescos', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 8, codRubro: 'POST', nombreRubro: 'Postres', descripcionRubro: 'Postres', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 9, codRubro: 'BEB', nombreRubro: 'Bebidas', descripcionRubro: 'Bebidas varias, cervezas', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 10, codRubro: 'VIN', nombreRubro: 'Vinos', descripcionRubro: 'Vinos tintos y blancos', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 11, codRubro: 'GAS', nombreRubro: 'Gaseosas', descripcionRubro: 'Gaseosas línea Pepsi', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 12, codRubro: 'CEL', nombreRubro: 'Celiacos', descripcionRubro: 'Todo para celíacos', "createdAt": currentDate, "updatedAt": currentDate },
            { idRubro: 13, codRubro: 'VEG', nombreRubro: 'Veganos', descripcionRubro: 'Todo para veganos', "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('rubros', null, {})
    }
};