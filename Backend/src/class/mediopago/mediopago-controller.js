"use strict";

let tratarError = require("../../middlewares/handleError");
const MedioPagoModelo = require("../mediopago/mediopago-model"),
  MedioPagoController = () => {},
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "MedioPago",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  attributesPersonalizados = [
    "idMedioPago",
    "nombreMedioPago",
  ];

MedioPagoController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  MedioPagoModelo.findAll({
    where: {
      [Op.or]: [
        {idMedioPago: {[Op.substring]: req.params.anyAttribute}},
        {nombreMedioPago: {[Op.substring]: req.params.anyAttribute}},
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

MedioPagoController.getToName = (req, res, next) => {
  let locals = {};
  MedioPagoModelo.findAll({
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

MedioPagoController.getAll = (req, res, next) => {
  let locals = {};
  MedioPagoModelo.findAll({ 
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

MedioPagoController.getOne = (req, res, next) => {
  let locals = {};
  MedioPagoModelo.findOne({
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

MedioPagoController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    MedioPagoModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributesPersonalizados}).then(project => {
      if (!project || project == 0) {
        MedioPagoModelo.create(req.body).then(result => {
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
    MedioPagoModelo.create(req.body).then(result => {
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

MedioPagoController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    MedioPagoModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributesPersonalizados}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreMedioPago != response.dataValues.nombreMedioPago
          ) {actualizar = true}
        if (actualizar) {
          MedioPagoModelo.update(
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

MedioPagoController.destroy = (req, res, next) => {
  let locals = {};
  MedioPagoModelo.destroy({
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

module.exports = MedioPagoController;