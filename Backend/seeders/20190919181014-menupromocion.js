'use strict';

var currentDate = new Date();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('menupromocions', [
            {"idMenuPromocion": 1,"idTipoMenuPromocion": 1, "codMenuPromocion": "PEPE","nombreMenuPromocion": "Picada Don Pepe", "descripcionMenuPromocion": "jamón crudo, matambre casero, salame tandilero, longaniza, morcilla criolla, queso fontina, roquefort, palmitos, palta, ensalada rusa y aceitunas","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 2,"idTipoMenuPromocion": 1, "codMenuPromocion": "PIC1","nombreMenuPromocion": "Picada de jamón crudo con rúcula, oliva y parmesano", "descripcionMenuPromocion": "Para compartir entre dos","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 3,"idTipoMenuPromocion": 1, "codMenuPromocion": "PICTAN","nombreMenuPromocion": "Picada de salame tandilero y longaniza con queso fontina", "descripcionMenuPromocion": "Para compartir entre dos","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 4,"idTipoMenuPromocion": 1, "codMenuPromocion": "EMP","nombreMenuPromocion": "Empanadas de carne o muzzarella con cebolla y albahaca", "descripcionMenuPromocion": "Por unidad","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 5,"idTipoMenuPromocion": 1, "codMenuPromocion": "RABA","nombreMenuPromocion": "Rabas a la Romana", "descripcionMenuPromocion": "Rabas frescas, pimienta sal y limón","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 6,"idTipoMenuPromocion": 1, "codMenuPromocion": "PICMAR","nombreMenuPromocion": "Picada de mariscos", "descripcionMenuPromocion": "Cornalitos, rabas, mejillón y jaivas","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 7,"idTipoMenuPromocion": 1, "codMenuPromocion": "PARR","nombreMenuPromocion": "Parrillada", "descripcionMenuPromocion": "Para compartir entre dos, cortes vacunos, de cerdo, morcilla y chorizo","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 8,"idTipoMenuPromocion": 1, "codMenuPromocion": "LOMO","nombreMenuPromocion": "Bife de lomo o filet", "descripcionMenuPromocion": "De novillo","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 9,"idTipoMenuPromocion": 1, "codMenuPromocion": "CHOR","nombreMenuPromocion": "Bife de chorizo", "descripcionMenuPromocion": "Grande","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 10,"idTipoMenuPromocion": 1, "codMenuPromocion": "ASA","nombreMenuPromocion": "Asado", "descripcionMenuPromocion": "Cortes de novillo para compartir entre dos","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 11,"idTipoMenuPromocion": 1, "codMenuPromocion": "PESP","nombreMenuPromocion": "Punta de espalda de cerdo", "descripcionMenuPromocion": "Con limón y romero","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 12,"idTipoMenuPromocion": 1, "codMenuPromocion": "TRUCH","nombreMenuPromocion": "Trucha", "descripcionMenuPromocion": "Ahumada con puré","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 13,"idTipoMenuPromocion": 1, "codMenuPromocion": "SALM","nombreMenuPromocion": "Salmón Rosado", "descripcionMenuPromocion": "Ahumado o al horno, con puré","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 14,"idTipoMenuPromocion": 1, "codMenuPromocion": "FLAN","nombreMenuPromocion": "Flan casero", "descripcionMenuPromocion": "Con dulce de leche o crema","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 15,"idTipoMenuPromocion": 1, "codMenuPromocion": "FRUTI","nombreMenuPromocion": "Frutillas con crema", "descripcionMenuPromocion": "Crema chantilly","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 16,"idTipoMenuPromocion": 1, "codMenuPromocion": "ALCA","nombreMenuPromocion": "Alcayota con nueces y queso fontina", "descripcionMenuPromocion": "Papas fritas de 180gr para compartir entre 2","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 17,"idTipoMenuPromocion": 2, "codMenuPromocion": "TRIC","nombreMenuPromocion": "Copa Tricolor Helado", "descripcionMenuPromocion": "Helados de chocolate, frutilla y vainilla","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 18,"idTipoMenuPromocion": 1, "codMenuPromocion": "TALLA","nombreMenuPromocion": "Tallarines con salsa de mariscos", "descripcionMenuPromocion": "Con crema de leche y mariscos","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 19,"idTipoMenuPromocion": 1, "codMenuPromocion": "CAPE","nombreMenuPromocion": "Capellettis a la carusso", "descripcionMenuPromocion": "Crema de leche, champiñones","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 20,"idTipoMenuPromocion": 1, "codMenuPromocion": "ÑOQUI","nombreMenuPromocion": "Ñoquis con salsa rosada", "descripcionMenuPromocion": "Crema de leche y salsa filetto","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 21,"idTipoMenuPromocion": 2, "codMenuPromocion": "LASA","nombreMenuPromocion": "Lasagna a la napolitana, copa de vino y flan con dulce de leche", "descripcionMenuPromocion": "Lasaña de verduras","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 22,"idTipoMenuPromocion": 2, "codMenuPromocion": "TALLAPEP","nombreMenuPromocion": "Tallarines Don Pepe, gaseosa y helado tricolor", "descripcionMenuPromocion": "Salsa boloñesa o filetto","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 23,"idTipoMenuPromocion": 2, "codMenuPromocion": "P-MILA","nombreMenuPromocion": "Milanesa de lomo con ensalda, copa de vino o gaseosa", "descripcionMenuPromocion": "De pollo o novillo","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 24,"idTipoMenuPromocion": 2, "codMenuPromocion": "P-LOMO","nombreMenuPromocion": "Lomo a la pimienta con papas fritas y copa de vino", "descripcionMenuPromocion": "Con limón y romero","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 25,"idTipoMenuPromocion": 2, "codMenuPromocion": "P-ENS","nombreMenuPromocion": "Ensalada Don Pepe con agua saborizada", "descripcionMenuPromocion": "Tomate – Lechuga – Apio – Berro – Repollo – Zanahoria – Rabanito","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 26,"idTipoMenuPromocion": 2, "codMenuPromocion": "P-PIZZ","nombreMenuPromocion": "Pizza 4 quesos más cerveza", "descripcionMenuPromocion": "8 porciones","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            {"idMenuPromocion": 27,"idTipoMenuPromocion": 2, "codMenuPromocion": "P-LOMOP","nombreMenuPromocion": "Lomopizza más cerveza", "descripcionMenuPromocion": "Pizza de mozarella con carne de novillo","pathImagenMenuPromocion": "http://algunaurl.com","createdAt": currentDate,"updatedAt": currentDate},
            




        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('menupromocions', null, {})
    }
};