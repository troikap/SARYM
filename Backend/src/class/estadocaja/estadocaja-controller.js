"use strict";

let tratarError = require("../../middlewares/handleError");
const EstadoCajaModelo = require("../estadocaja/estadocaja-model"),
  EstadoCajaController = () => {},
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "EstadoCaja",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  attributesPersonalizados = [
    "idEstadoCaja",
    "codEstadoCaja",
    "nombreEstadoCaja",
  ];

EstadoCajaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  EstadoCajaModelo.findAll({
    where: {
      [Op.or]: [
        {idEstadoCaja: {[Op.substring]: req.params.anyAttribute}},
        {codEstadoCaja: {[Op.substring]: req.params.anyAttribute}},
        {nombreEstadoCaja: {[Op.substring]: req.params.anyAttribute}},
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

EstadoCajaController.getToName = (req, res, next) => {
  let locals = {};
  EstadoCajaModelo.findAll({
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

EstadoCajaController.getAll = (req, res, next) => {
  let locals = {};
  EstadoCajaModelo.findAll({ 
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

EstadoCajaController.getOne = (req, res, next) => {
  let locals = {};
  EstadoCajaModelo.findOne({
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

EstadoCajaController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    EstadoCajaModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributesPersonalizados}).then(project => {
      if (!project || project == 0) {
        EstadoCajaModelo.create(req.body).then(result => {
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
    EstadoCajaModelo.create(req.body).then(result => {
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

EstadoCajaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    EstadoCajaModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributesPersonalizados}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.codEstadoCaja != response.dataValues.codEstadoCaja || 
          body.nombreEstadoCaja != response.dataValues.nombreEstadoCaja
          ) {actualizar = true}
        if (actualizar) {
          EstadoCajaModelo.update(
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

EstadoCajaController.destroy = (req, res, next) => {
  let locals = {};
  EstadoCajaModelo.destroy({
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

module.exports = EstadoCajaController;