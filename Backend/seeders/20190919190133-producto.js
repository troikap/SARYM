'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productos', [
            { "idProducto": 1, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑM", "nombreProducto": "Mi Terruño Malbec", "descripcionProducto": "6 meses de barrica", "pathImagenProducto": "malbec.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProducto": 2, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑC", "nombreProducto": "Mi Terruño Cabernet", "descripcionProducto": "6 meses de barrica", "pathImagenProducto": "cabernet.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 3, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑS", "nombreProducto": "Mi Terruño Sirah", "descripcionProducto": "3 meses de barrica", "pathImagenProducto": "sirah.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProducto": 4, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑB", "nombreProducto": "Mi Terruño Blend", "descripcionProducto": "Tonos rojizos, vino joven", "pathImagenProducto": "blend.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProducto": 5, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑC2", "nombreProducto": "Mi Terruño Chenín", "descripcionProducto": "Uvas del valle de uco", "pathImagenProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 6, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "PEPSI", "nombreProducto": "Pepsi", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "pepsi.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 7, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "POME", "nombreProducto": "Paso de los toros - Pomelo", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "pasotoros.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 8, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "TONIC", "nombreProducto": "Paso de los toros - Tónica", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "tonicapasotoros.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 9, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "SEVEN", "nombreProducto": "Seven Up", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "sevenup.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 10, "idRubro": 4, "idUnidadMedida": 6, "cantidadMedida": 8, "codProducto": "PIZZA", "nombreProducto": "Pizza", "descripcionProducto": "Pizza Mozzarella a la piedra 8 porciones.", "pathImagenProducto": "pizza.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 11, "idRubro": 4, "idUnidadMedida": 2, "cantidadMedida": 700, "codProducto": "HAMBURGUESA", "nombreProducto": "Hamburguesa", "descripcionProducto": "Hamburguesa simple con lechuga y tomate.", "pathImagenProducto": "hamburguesa.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 12, "idRubro": 4, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "EMPANADA", "nombreProducto": "Empanada", "descripcionProducto": "Empanada de carne, cebbola y huevo.", "pathImagenProducto": "empanadas.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 13, "idRubro": 4, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "TACO", "nombreProducto": "Taco", "descripcionProducto": "Taco de carne con jamon, queso y salsas.", "pathImagenProducto": "taco.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 14, "idRubro": 1, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "PANCHO", "nombreProducto": "Pancho", "descripcionProducto": "Pancho simple con condimentos.", "pathImagenProducto": "pancho.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 15, "idRubro": 1, "idUnidadMedida": 2, "cantidadMedida": 500, "codProducto": "PAPAS", "nombreProducto": "Papas Fritas", "descripcionProducto": "Papas fritas medianas.", "pathImagenProducto": "papas.jpg", "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productos', null, {})
    }
};