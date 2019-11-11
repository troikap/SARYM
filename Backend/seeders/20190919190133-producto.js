'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productos', [
            { "idProducto": 1, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑM", "nombreProducto": "Mi Terruño Malbec", "descripcionProducto": "6 meses de barrica", "pathImagenProducto": "malbec.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 2, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑC", "nombreProducto": "Mi Terruño Cabernet", "descripcionProducto": "6 meses de barrica", "pathImagenProducto": "cabernet.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 3, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑS", "nombreProducto": "Mi Terruño Sirah", "descripcionProducto": "3 meses de barrica", "pathImagenProducto": "sirah.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 4, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑB", "nombreProducto": "Mi Terruño Blend", "descripcionProducto": "Tonos rojizos, vino joven", "pathImagenProducto": "blend.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            // { "idProducto": 5, "idRubro": 10, "idUnidadMedida": 1, "cantidadMedida": 750, "codProducto": "TERRUÑC2", "nombreProducto": "Mi Terruño Chenín", "descripcionProducto": "Uvas del valle de uco", "pathImagenProducto": null, "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 6, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "PEPSI", "nombreProducto": "Pepsi", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "pepsi.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 7, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "POME", "nombreProducto": "Paso de los toros - Pomelo", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "pasotoros.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 8, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "TONIC", "nombreProducto": "Paso de los toros - Tónica", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "tonicapasotoros.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 9, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 500, "codProducto": "SEVEN", "nombreProducto": "Seven Up", "descripcionProducto": "Bebida gaseosa de 500cm", "pathImagenProducto": "sevenup.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 10, "idRubro": 14, "idUnidadMedida": 6, "cantidadMedida": 1, "codProducto": "PIZZA", "nombreProducto": "Pizza", "descripcionProducto": "Pizza Mozzarella a la piedra p/ porción.", "pathImagenProducto": "pizza.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 11, "idRubro": 14, "idUnidadMedida": 4, "cantidadMedida": 700, "codProducto": "HAMBURGUESA", "nombreProducto": "Hamburguesa", "descripcionProducto": "Hamburguesa simple con lechuga y tomate.", "pathImagenProducto": "hamburguesa.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 12, "idRubro": 14, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "EMPANADA", "nombreProducto": "Empanada", "descripcionProducto": "Empanada de carne, cebolla y huevo.", "pathImagenProducto": "empanadas.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 13, "idRubro": 4, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "TACO", "nombreProducto": "Taco", "descripcionProducto": "Taco de carne con jamon, queso y salsas.", "pathImagenProducto": "taco.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 14, "idRubro": 14, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "PANCHO", "nombreProducto": "Pancho", "descripcionProducto": "Pancho simple con condimentos.", "pathImagenProducto": "pancho.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 15, "idRubro": 14, "idUnidadMedida": 2, "cantidadMedida": 500, "codProducto": "PAPAS", "nombreProducto": "Papas Fritas", "descripcionProducto": "Papas fritas medianas.", "pathImagenProducto": "papas.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 16, "idRubro": 3, "idUnidadMedida": 6, "cantidadMedida": 1, "codProducto": "COST1", "nombreProducto": "Costeleta de cerdo", "descripcionProducto": "Costeleta de cerdo acompañadas con papas rústicas y romero.", "pathImagenProducto": "costeleta.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 17, "idRubro": 10, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "BVIN1", "nombreProducto": "Baso de vino", "descripcionProducto": "Baso de vino tinto", "pathImagenProducto": "basovinotinto.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 18, "idRubro": 3, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "MILAPOLLO", "nombreProducto": "Milanesa de pollo", "descripcionProducto": "Milanesa de pollo con limón.", "pathImagenProducto": "milanesa.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 19, "idRubro": 1, "idUnidadMedida": 4, "cantidadMedida": 1, "codProducto": "PICADA1", "nombreProducto": "Tabla de Picada para 4 personas", "descripcionProducto": "jamón crudo, matambre casero, salame tandilero, longaniza, morcilla criolla, queso fontina, roquefort, palmitos, palta, ensalada rusa y aceitunas", "pathImagenProducto": "tabla.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 20, "idRubro": 8, "idUnidadMedida": 6, "cantidadMedida": 1, "codProducto": "COPHEL1", "nombreProducto": "Copa Helada", "descripcionProducto": "Copa helada de chocolate y coco.", "pathImagenProducto": "copahelada.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 21, "idRubro": 8, "idUnidadMedida": 6, "cantidadMedida": 1, "codProducto": "FLANCAS", "nombreProducto": "Flan casero", "descripcionProducto": "Flan casero de la casa.", "pathImagenProducto": "flan.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 22, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 1250, "codProducto": "SEVENGRAN", "nombreProducto": "Seven Up de 1,25 Lts", "descripcionProducto": "Seven Up - Línea Pepsi - 1,25Lts", "pathImagenProducto": "sevengrande.jpg", "createdAt": currentDate, "updatedAt": currentDate },
            { "idProducto": 23, "idRubro": 11, "idUnidadMedida": 1, "cantidadMedida": 1250, "codProducto": "PEPSIGRAN", "nombreProducto": "Pepsi de 1,25Lts", "descripcionProducto": "Pepsi 1,25Lts", "pathImagenProducto": "pepsigrande.jpg", "createdAt": currentDate, "updatedAt": currentDate },

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productos', null, {})
    }
};