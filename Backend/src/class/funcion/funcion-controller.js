"use strict";

let tratarError = require("../../middlewares/handleError");
const FuncionModelo = require("../funcion/funcion-model"),
  FuncionController = () => {},
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "Funcion",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

FuncionController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  FuncionModelo.findAll({
    where: {
      [Op.or]: [
        {idFuncion: {[Op.substring]: req.params.anyAttribute}},
        {nombreFuncion: {[Op.substring]: req.params.anyAttribute}},
      ]
    },
    attributes: attributes.funcion}).then(project => {
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

FuncionController.getToName = (req, res, next) => {
  let locals = {};
  FuncionModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.funcion}).then(project => {
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

FuncionController.getAll = (req, res, next) => {
  let locals = {};
  FuncionModelo.findAll({ 
    attributes: attributes.funcion}).then(projects => {
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

FuncionController.getOne = (req, res, next) => {
  let locals = {};
  FuncionModelo.findOne({
    where: {[idtable]: req.params[idtable]},
    attributes: attributes.funcion}).then(project => {
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

FuncionController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    FuncionModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributes.funcion}).then(project => {
      if (!project || project == 0) {
        FuncionModelo.create(req.body).then(result => {
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
    FuncionModelo.create(req.body).then(result => {
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

FuncionController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    FuncionModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributes.funcion}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreFuncion != response.dataValues.nombreFuncion
          ) {actualizar = true}
        if (actualizar) {
          FuncionModelo.update(
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

FuncionController.destroy = (req, res, next) => {
  let locals = {};
  FuncionModelo.destroy({
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

module.exports = FuncionController;