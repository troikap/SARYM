"use strict";

// let tratarError = require("../../middlewares/handleError");
// const UbicacionModelo = require("../ubicacion/ubicacion-model"),
//   UbicacionController = () => {},
//   legend = "Ubicacion",
//   idtable = `id${legend}`,
//   nombretable = `nro${legend}`,
//   Sequelize = require('sequelize'),
//   Op = Sequelize.Op,
//   attributesPersonalizados = [
//     "idUbicacion",
//     "nroUbicacion",
//     "descripcionUbicacion",
//   ];

// UbicacionController.getToAllAttributes = (req, res, next) => {
//   let locals = {};
//   UbicacionModelo.findAll({
//     where: {
//       [Op.or]: [
//         {idUbicacion: {[Op.substring]: req.params.anyAttribute}},
//         {nroUbicacion: {[Op.substring]: req.params.anyAttribute}},
//         {descripcionUbicacion: {[Op.substring]: req.params.anyAttribute}},
//       ]
//     },
//     attributes: attributesPersonalizados}).then(project => {
//       if (!project || project == 0) {
//         locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
//         locals['tipo'] = 2;
//       } else {
//         locals['title'] = `${legend}`;
//         locals['data'] = project;
//         locals['tipo'] = 1;
//       }
//       res.json(locals);
//   });
// };

// UbicacionController.getToName = (req, res, next) => {
//   let locals = {};
//   UbicacionModelo.findAll({
//     where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
//     attributes: attributesPersonalizados}).then(project => {
//     if (!project || project == 0) {
//       locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
//       locals['tipo'] = 2;
//     } else {
//       locals['title'] = `${legend}`;
//       locals['data'] = project;
//       locals['tipo'] = 1;
//     }
//     res.json(locals);
//   });
// };

// UbicacionController.getAll = (req, res, next) => {
//   let locals = {};
//   UbicacionModelo.findAll({ 
//     attributes: attributesPersonalizados}).then(projects => {
//     if (!projects || projects == 0) {
//       locals['title'] = `No existen registros de ${legend}`;
//       locals['tipo'] = 2;
//     } else {
//       locals['title'] = `${legend}`;
//       locals['data'] = projects;
//       locals['tipo'] = 1;
//     }
//     res.json(locals);
//   });
// };

// UbicacionController.getOne = (req, res, next) => {
//   let locals = {};
//   UbicacionModelo.findOne({
//     where: {[idtable]: req.params[idtable]},
//     attributes: attributesPersonalizados}).then(project => {
//     if (!project || project == 0) {
//       locals['title'] = `No existe el registro : ${req.params[idtable]}` ;
//       locals['tipo'] = 2;
//     } else {
//       locals['title'] = `${legend}`;
//       locals['data'] = project.dataValues;
//       locals['tipo'] = 1;
//     }
//     res.json(locals);
//   });
// };

// UbicacionController.create = (req, res) => {
//   let locals = {};
//   if (req.body[idtable]) {
//     UbicacionModelo.findOne({
//       where: {[idtable]: req.body[idtable]},
//       attributes: attributesPersonalizados}).then(project => {
//       if (!project || project == 0) {
//         UbicacionModelo.create(req.body).then(result => {
//           locals['title'] = `${legend} creado.`;
//           locals['data'] = result;
//           locals['id'] = result[idtable];
//           locals['tipo'] = 1;
//           res.json(locals);
//         }).catch((error) => {
//           let locals = tratarError.tratarError(error, legend);
//           res.json(locals);
//         });
//       } else {
//         locals['title'] = `${[idtable]} ya existe.`;
//         locals['tipo'] = 2;
//         res.json(locals);
//       }
//     });
//   } else {
//     UbicacionModelo.create(req.body).then(result => {
//       locals['title'] = `${legend} creado.`;
//       locals['data'] = result;
//       locals['id'] = result[idtable];
//       locals['tipo'] = 1;
//       res.json(locals);
//     }).catch((error) => {
//       let locals = tratarError.tratarError(error, legend);
//       res.json(locals);
//     });
//   }
// };

// UbicacionController.update = (req, res) => {
//   let locals = {};
//   let body = req.body;
//   if (body[idtable]) {
//     UbicacionModelo.findOne({
//       where: {[idtable]: body[idtable]},
//       attributes: attributesPersonalizados}).then(response => {
//       if (!response || response == 0) {
//         locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
//         locals['tipo'] = 2;
//         res.json(locals);
//       } else {
//         let actualizar = false;
//         if ( 
//           body.nroUbicacion != response.dataValues.nroUbicacion || 
//           body.descripcionUbicacion != response.dataValues.descripcionUbicacion
//           ) {actualizar = true}
//         if (actualizar) {
//           UbicacionModelo.update(
//             body, 
//             {where: {[idtable]: body[idtable]}}).then(result => {
//               if (result) {
//                 locals['title'] = `Registro ${legend} Actualizado`;
//                 locals['tipo'] = 1;
//               } else {
//                 locals['title'] = `Registro ${legend} NO Actualizado`;
//                 locals['tipo'] = 2;
//               }
//               res.json(locals)
//             }).catch((error) => {
//               let locals = tratarError.tratarError(error, legend);
//               res.json(locals);
//             });
//         } else {
//           locals['title'] = `No ha Modificado ningún Registro de ${legend}.`;
//           locals['tipo'] = 2;
//           res.json(locals);
//         }
//       }
//     });
//   } else {
//     locals['title'] = `No envio id de ${legend}.`;
//     locals['tipo'] = 2;
//     res.json(locals);
//   }
// };

// UbicacionController.destroy = (req, res, next) => {
//   let locals = {};
//   UbicacionModelo.destroy({
//     where: {[idtable]: req.params[idtable]}}).then(response => {
//     if (!response || response == 0) {
//       locals['title'] = `No existe el registro de ${legend}: ${req.params[idtable]}`;
//       locals['tipo'] = 2;
//     } else {
//       locals['title'] = `${legend} Eliminado Fisicamente`;
//       locals['tipo'] = 1;
//     }
//     res.json(locals);
//   }).catch((error) => {
//     let locals = tratarError.tratarError(error, legend);
//     res.json(locals);
//   });
// };

// module.exports = UbicacionController;