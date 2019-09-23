'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productos', [
            {"idProducto": 1,"idRubro": 10,"idUnidadMedida": 1,"codProducto": "TERRUÑM","nombreProducto": "Mi Terruño Malbec","descripcionProducto": "6 meses de barrica","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 2,"idRubro": 10,"idUnidadMedida": 1,"codProducto": "TERRUÑC","nombreProducto": "Mi Terruño Cabernet","descripcionProducto": "6 meses de barrica","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 3,"idRubro": 10,"idUnidadMedida": 1,"codProducto": "TERRUÑS","nombreProducto": "Mi Terruño Sirah","descripcionProducto": "3 meses de barrica","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 4,"idRubro": 10,"idUnidadMedida": 1,"codProducto": "TERRUÑB","nombreProducto": "Mi Terruño Blend","descripcionProducto": "Tonos rojizos, vino joven","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 5,"idRubro": 10,"idUnidadMedida": 1,"codProducto": "TERRUÑC","nombreProducto": "Mi Terruño Chenín","descripcionProducto": "Uvas del valle de uco","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 6,"idRubro": 11,"idUnidadMedida": 1,"codProducto": "PEPSI","nombreProducto": "Pepsi","descripcionProducto": "Bebida gaseosa de 500cm","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 7,"idRubro": 11,"idUnidadMedida": 1,"codProducto": "POME","nombreProducto": "Paso de los toros - Pomelo","descripcionProducto": "Bebida gaseosa de 500cm","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 8,"idRubro": 11,"idUnidadMedida": 1,"codProducto": "TONIC","nombreProducto": "Paso de los toros - Tónica","descripcionProducto": "Bebida gaseosa de 500cm","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idProducto": 9,"idRubro": 11,"idUnidadMedida": 1,"codProducto": "SEVEN","nombreProducto": "Seven","descripcionProducto": "Bebida gaseosa de 500cm","pathImagenProducto": "https://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('productos', null, {})
    }
};