"use strict";

let tratarError = require("../../middlewares/handleError");
const EstadoMesaModelo  = require("../estadomesa/estadomesa-model"),
  EstadoMesaController = () => {},
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "EstadoMesa",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  attributesPersonalizados = [
    "idEstadoMesa",
    "codEstadoMesa",
    "nombreEstadoMesa",
    "colorEstadoMesa",
  ];

EstadoMesaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  EstadoMesaModelo.findAll({
    where: {
      [Op.or]: [
        {idEstadoMesa: {[Op.substring]: req.params.anyAttribute}},
        {codEstadoMesa: {[Op.substring]: req.params.anyAttribute}},
        {nombreEstadoMesa: {[Op.substring]: req.params.anyAttribute}},
        {colorEstadoMesa: {[Op.substring]: req.params.anyAttribute}},
      ]
    },
    attributes: attributesPersonalizados}).then(project => {
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

EstadoMesaController.getToName = (req, res, next) => {
  let locals = {};
  EstadoMesaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributesPersonalizados}).then(project => {
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

EstadoMesaController.getAll = (req, res, next) => {
  let locals = {};
  EstadoMesaModelo.findAll({ 
    attributes: attributesPersonalizados}).then(projects => {
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

EstadoMesaController.getOne = (req, res, next) => {
  let locals = {};
  EstadoMesaModelo.findOne({
    where: {[idtable]: req.params[idtable]},
    attributes: attributesPersonalizados}).then(project => {
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

EstadoMesaController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    EstadoMesaModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributesPersonalizados}).then(project => {
      if (!project || project == 0) {
        EstadoMesaModelo.create(req.body).then(result => {
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
    EstadoMesaModelo.create(req.body).then(result => {
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

EstadoMesaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    EstadoMesaModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributesPersonalizados}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.codEstadoMesa != response.dataValues.codEstadoMesa || 
          body.descripcionEstadoMesa != response.dataValues.descripcionEstadoMesa ||
          body.nombreEstadoMesa != response.dataValues.nombreEstadoMesa ||
          body.colorEstadoMesa != response.dataValues.colorEstadoMesa
          ) {actualizar = true}
        if (actualizar) {
          EstadoMesaModelo.update(
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

EstadoMesaController.destroy = (req, res, next) => {
  let locals = {};
  EstadoMesaModelo.destroy({
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

module.exports = EstadoMesaController;
