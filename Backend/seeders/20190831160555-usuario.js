'use strict';

const fechaArgentina = require("../src/middlewares/fechaArgentina");
var currentDate = fechaArgentina.getFechaArgentina();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('usuarios', [{
            "idUsuario": 1,
            "cuitUsuario": 20368506886,
            "nombreUsuario": "Lucas",
            "apellidoUsuario": "Perez",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 36850688,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "lucaz_pato@gmail.com",
            "idDepartamento": 1,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875478,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 2,
            "cuitUsuario": 20368506881,
            "nombreUsuario": "Mari",
            "apellidoUsuario": "Castillo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 36850688,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "lucaz_pato@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 3,
            "cuitUsuario": 20368506882,
            "nombreUsuario": "Andres",
            "apellidoUsuario": "Tonelli",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 36850688,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "lucaz_pato@gmail.com",
            "idDepartamento": 3,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875477,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 4,
            "cuitUsuario": 11111111111,
            "nombreUsuario": "Admin",
            "apellidoUsuario": "Admin",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 11111111,
            "domicilioUsuario": "UTN FRM",
            "emailUsuario": "sarymresto@gmail.com",
            "idDepartamento": 1,
            "nroCelularUsuario": 1111111111,
            "nroTelefonoUsuario": 1111111111,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 5,
            "cuitUsuario": 20111111111,
            "nombreUsuario": "Admin",
            "apellidoUsuario": "Activo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 11111111,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "adminactivo@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 6,
            "cuitUsuario": 20111111112,
            "nombreUsuario": "Admin",
            "apellidoUsuario": "Suspendido",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 11111111,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "adminsuspendido@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 7,
            "cuitUsuario": 20111111113,
            "nombreUsuario": "Admin",
            "apellidoUsuario": "Eliminado",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 11111111,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "admineliminado@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 8,
            "cuitUsuario": 20222222221,
            "nombreUsuario": "Encargado",
            "apellidoUsuario": "Activo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 22222222,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "encargadoactivo@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 9,
            "cuitUsuario": 20222222222,
            "nombreUsuario": "Encargado",
            "apellidoUsuario": "Suspendido",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 22222222,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "encargadosuspendido@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 10,
            "cuitUsuario": 20222222223,
            "nombreUsuario": "Encargado",
            "apellidoUsuario": "Eliminado",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 22222222,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "encargadoeliminado@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 11,
            "cuitUsuario": 20333333331,
            "nombreUsuario": "Mozo",
            "apellidoUsuario": "Activo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 22222222,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "mozoactivo@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 12,
            "cuitUsuario": 20333333332,
            "nombreUsuario": "Mozo",
            "apellidoUsuario": "Suspendido",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 33333333,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "mozosuspendido@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 13,
            "cuitUsuario": 20333333333,
            "nombreUsuario": "Mozo",
            "apellidoUsuario": "Eliminado",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 33333333,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "mozoeliminado@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 14,
            "cuitUsuario": 20444444441,
            "nombreUsuario": "Cocinero",
            "apellidoUsuario": "Activo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 44444444,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "cocineroactivo@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 15,
            "cuitUsuario": 20444444442,
            "nombreUsuario": "Cocinero",
            "apellidoUsuario": "Suspendido",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 44444444,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "cocinerosuspendido@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 16,
            "cuitUsuario": 20444444443,
            "nombreUsuario": "Cocinero",
            "apellidoUsuario": "Eliminado",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 44444444,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "cocineroeliminado@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 17,
            "cuitUsuario": 20555555551,
            "nombreUsuario": "Cliente",
            "apellidoUsuario": "Activo",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 55555555,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "clienteactivo@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        {
            "idUsuario": 18,
            "cuitUsuario": 20555555552,
            "nombreUsuario": "Cliente",
            "apellidoUsuario": "Suspendido",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 55555555,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "clientesuspendido@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        }, {
            "idUsuario": 19,
            "cuitUsuario": 20555555553,
            "nombreUsuario": "Cliente",
            "apellidoUsuario": "Eliminado",
            "contrasenaUsuario": "$2b$10$wimyYXNtw97sxl14KIlX5uDzt5hGPxJVgfbl7fcpqa89vtJjYb/z6",
            "dniUsuario": 55555555,
            "domicilioUsuario": "Villa Mercedes 1235",
            "emailUsuario": "clienteeliminado@gmail.com",
            "idDepartamento": 2,
            "nroCelularUsuario": 2614318023,
            "nroTelefonoUsuario": 2613875472,
            "createdAt": currentDate,
            "updatedAt": currentDate
        },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('usuarios', null, {})
    }
};