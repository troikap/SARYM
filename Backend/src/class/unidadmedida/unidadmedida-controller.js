"use strict";

const tratarError = require("../../middlewares/handleError"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  UnidadMedidaController = () => {},
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "UnidadMedida",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

UnidadMedidaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  UnidadMedidaModelo.findAll({
    where: {
      [Op.or]: [
        {idUnidadMedida: {[Op.substring]: req.params.anyAttribute}},
        {codUnidadMedida: {[Op.substring]: req.params.anyAttribute}},
        {nombreUnidadMedida: {[Op.substring]: req.params.anyAttribute}},
        {caracterUnidadMedida: {[Op.substring]: req.params.anyAttribute}},
      ]
    },
    attributes: attributes.unidadmedida}).then(project => {
      if (!project || project == 0) {
        locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
  });
};

UnidadMedidaController.getToName = (req, res, next) => {
  let locals = {};
  UnidadMedidaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.unidadmedida}).then(project => {
    if (!project || project == 0) {
      locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

UnidadMedidaController.getAll = (req, res, next) => {
  let locals = {};
  UnidadMedidaModelo.findAll({ 
    attributes: attributes.unidadmedida}).then(projects => {
    if (!projects || projects == 0) {
      locals['title'] = `No existen registros de ${legend}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = projects;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

UnidadMedidaController.getOne = (req, res, next) => {
  let locals = {};
  UnidadMedidaModelo.findOne({
    where: {[idtable]: req.params[idtable]},
    attributes: attributes.unidadmedida}).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe el registro : ${req.params[idtable]}` ;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project.dataValues;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

UnidadMedidaController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    UnidadMedidaModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributes.unidadmedida}).then(project => {
      if (!project || project == 0) {
        UnidadMedidaModelo.create(req.body).then(result => {
          locals['title'] = `${legend} creado.`;
          locals['data'] = result;
          locals['id'] = result[idtable];
          locals['tipo'] = 1;
          res.json(locals);
        }).catch((error) => {
          let locals = tratarError.tratarError(error, legend);
          res.json(locals);
        });
      } else {
        locals['title'] = `${[idtable]} ya existe.`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    });
  } else {
    UnidadMedidaModelo.create(req.body).then(result => {
      locals['title'] = `${legend} creado.`;
      locals['data'] = result;
      locals['id'] = result[idtable];
      locals['tipo'] = 1;
      res.json(locals);
    }).catch((error) => {
      let locals = tratarError.tratarError(error, legend);
      res.json(locals);
    });
  }
};

UnidadMedidaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    UnidadMedidaModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributes.unidadmedida}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.codUnidadMedida != response.dataValues.codUnidadMedida || 
          body.descripcionUnidadMedida != response.dataValues.descripcionUnidadMedida ||
          body.nombreUnidadMedida != response.dataValues.nombreUnidadMedida ||
          body.caracterUnidadMedida != response.dataValues.caracterUnidadMedida
          ) {actualizar = true}
        if (actualizar) {
          UnidadMedidaModelo.update(
            body, 
            {where: {[idtable]: body[idtable]}}).then(result => {
              if (result) {
                locals['title'] = `Registro ${legend} Actualizado`;
                locals['tipo'] = 1;
              } else {
                locals['title'] = `Registro ${legend} NO Actualizado`;
                locals['tipo'] = 2;
              }
              res.json(locals)
            }).catch((error) => {
              let locals = tratarError.tratarError(error, legend);
              res.json(locals);
            });
        } else {
          locals['title'] = `No ha Modificado ningún Registro de ${legend}.`;
          locals['tipo'] = 2;
          res.json(locals);
        }
      }
    });
  } else {
    locals['title'] = `No envio id de ${legend}.`;
    locals['tipo'] = 2;
    res.json(locals);
  }
};

UnidadMedidaController.destroy = (req, res, next) => {
  let locals = {};
  UnidadMedidaModelo.destroy({
    where: {[idtable]: req.params[idtable]}}).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe el registro de ${legend}: ${req.params[idtable]}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend} Eliminado Fisicamente`;
      locals['tipo'] = 1;
    }
    res.json(locals);
  }).catch((error) => {
    let locals = tratarError.tratarError(error, legend);
    res.json(locals);
  });
};

module.exports = UnidadMedidaController;