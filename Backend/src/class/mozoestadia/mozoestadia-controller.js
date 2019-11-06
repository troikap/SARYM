"use strict";

require('../../config');
const MozoEstadiaModelo = require("./mozoestadia-model"),
  MozoEstadiaController = () => { },
  attributes = require('../attributes'),
  tratarError = require("../../middlewares/handleError"),
  UsuarioModelo = require("../usuario/usuario-model"),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  legend = "MozoEstadia",
  legend2 = "Usuario",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`;


  MozoEstadiaController.getAll = (req, res, next) => {
    let locals = {};
    MozoEstadiaModelo.findAll({
      attributes: attributes.mozoestadia,
      where: { fechaYHoraFinMozoEstadia: null },
      include: [
        {
          model: UsuarioModelo,
          attributes: attributes.usuario,
        },
      ]
    })
    .then(projects => {
      if (!projects || projects == 0) {
        locals['title'] = `No existen registros de ${legend}.`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = projects;
        locals['tipo'] = 1;
      }
      res.json(locals);
    });
  };

  MozoEstadiaController.getOne = (req, res, next) => {
    let locals = {};
    let params = req.params;
    MozoEstadiaModelo.findOne({
      where: { [idtable]: params[idtable] },
      attributes: attributes.mozoestadia,
      include: [
        {
          model: UsuarioModelo,
          attributes: attributes.usuario,
        },
      ]
    }).then(project => {
      if (!project || project == 0) {
        locals['title'] = `No existe registro con id: ${params[idtable]}.`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
    });
  };

  MozoEstadiaController.create = (req, res) => {
    let locals = {};
    let body = req.body;
    MozoEstadiaModelo.findOne( { where: {[idtable2]: body[idtable2] , 'fechaYHoraFinMozoEstadia': null } }).then( responses => {
      if ( !responses || responses == 0 ) {
        body['fechaYHoraInicioMozoEstadia'] = fechaArgentina.getFechaArgentina();
        MozoEstadiaModelo.create(body).then(result => {
            locals['title'] = `${legend} creado`;
            locals['data'] = result;
            locals['id'] = result[idtable];
            locals['tipo'] = 1;
            res.json(locals);
        }).catch((error) => {
            locals = tratarError.tratarError(error, legend);
            res.json(locals);
        });
      } else {
        locals['title'] = `Ya existe instancia de ${legend} con Usuario ${body[idtable2]}`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    })
  };

  MozoEstadiaController.actualizarDatos = (req, res) => {
    let locals = {};
    let body = req.body;
    MozoEstadiaModelo.findOne({
      where: {
        [idtable]: body[idtable] },
        attributes: attributes.mozoestadia,
        where: { fechaYHoraFinMozoEstadia: null },
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      }).then(response => {
        if (!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
            body['fechaYHoraFinMozoEstadia'] = fechaArgentina.getFechaArgentina();
            MozoEstadiaModelo.update(body, {
              where: {[idtable2]: body[idtable2] , 'fechaYHoraFinMozoEstadia': null}
          }).then(result => {
            if (!result || result == 0) {
                locals['title'] = `No se actualizo ${legend}.`;
                locals['tipo'] = 2;
            } else {
              locals['title'] = `Se actualizo ${legend}.`;
              locals['tipo'] = 1;
            }
            res.json(locals);
        }).catch((error) => {
          let locals = tratarError.tratarError(error, legend);
          res.json(locals);
        });
      }
    });
  };

  module.exports = MozoEstadiaController;