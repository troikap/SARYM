"use strict";

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("funcions", [{ //////////////////ADMINISTRADOR///////////////
                idFuncion: 1,
                nombreFuncion: "Consulta Usuario",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 2,
                nombreFuncion: "Editar Usuario",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 3,
                nombreFuncion: "Consulta Unidad Medida",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 4,
                nombreFuncion: "Editar Unidad Medida",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 5,
                nombreFuncion: "Consulta Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 6,
                nombreFuncion: "Editar Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 7,
                nombreFuncion: "Consulta Mesa",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 8,
                nombreFuncion: "Editar Mesa",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 9,
                nombreFuncion: "Consulta Rubro",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 10,
                nombreFuncion: "Editar Rubro",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 11,
                nombreFuncion: "Consulta Sector",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 12,
                nombreFuncion: "Editar Sector",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 13,
                nombreFuncion: "Consulta Tipo Moneda",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 14,
                nombreFuncion: "Editar Tipo Moneda",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 15,
                nombreFuncion: "Consulta Producto",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 16,
                nombreFuncion: "Editar Producto",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 17,
                nombreFuncion: "Consultar Menu-Promocion",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 18,
                nombreFuncion: "Editar  Menu-Promocion",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 19,
                nombreFuncion: "Generar Reporte",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 20,
                nombreFuncion: "Cargar Imagen Producto o Menu-Promocion",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 21,
                nombreFuncion: "Gestionar Backup",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 22,
                nombreFuncion: "Consulta Rol",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 23,
                nombreFuncion: "Editar Rol",
                createdAt: currentDate,
                updatedAt: currentDate
            }, //////////////////ENCARGADO///////////////
            {
                idFuncion: 24,
                nombreFuncion: "Consulta Abrir Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 25,
                nombreFuncion: "Editar Abrir Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 26,
                nombreFuncion: "Consulta Cerrar Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 27,
                nombreFuncion: "Editar Cerrar Caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 28,
                nombreFuncion: "Consultar movimiento de caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 29,
                nombreFuncion: "Generar movimiento de caja",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 30,
                nombreFuncion: "Consulta Habilitar-Deshabilitar Producto",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 31,
                nombreFuncion: "Editar Habilitar-Deshabilitar Producto",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 32,
                nombreFuncion: "Consulta Mozo-Estadia",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 33,
                nombreFuncion: "Editar Mozo-Estadia",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 34,
                nombreFuncion: "Consulta Anular Pedido",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 35,
                nombreFuncion: "Editar Anular Pedido",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 36,
                nombreFuncion: "Consulta de Gestion de Estado-Estadia",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 37,
                nombreFuncion: "Edicion de Gestion de Estado-Estadia",
                createdAt: currentDate,
                updatedAt: currentDate
            }, //////////////////COCINA////////////////
            {
                idFuncion: 38,
                nombreFuncion: "Consulta Comanda Cocina",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 39,
                nombreFuncion: "Enviar Pedido (Comanda Cocina)",
                createdAt: currentDate,
                updatedAt: currentDate
            },
            {
                idFuncion: 40,
                nombreFuncion: "Cambiar Estado Pedido (Comanda Cocina)",
                createdAt: currentDate,
                updatedAt: currentDate
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("funcions", null, {});
    }
};