"use strict";

let tratarError = require("../../middlewares/handleError");
const TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  TipoMonedaController = () => {},
  legend = "TipoMoneda",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  attributesPersonalizados = [
    "idTipoMoneda",
    "nombreTipoMoneda",
    "simboloTipoMoneda",
  ];
  
TipoMonedaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  TipoMonedaModelo.findAll({
    where: {
      [Op.or]: [
        {idTipoMoneda: {[Op.substring]: req.params.anyAttribute}},
        {[nombretable]: {[Op.substring]: req.params.anyAttribute}},
        {simboloTipoMoneda: {[Op.substring]: req.params.anyAttribute}},
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

TipoMonedaController.getToName = (req, res, next) => {
  let locals = {};
  TipoMonedaModelo.findAll({
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

TipoMonedaController.getAll = (req, res, next) => {
  let locals = {};
  TipoMonedaModelo.findAll({ 
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

TipoMonedaController.getOne = (req, res, next) => {
  let locals = {};
  TipoMonedaModelo.findOne({
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

TipoMonedaController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    TipoMonedaModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributesPersonalizados}).then(project => {
      if (!project || project == 0) {
        TipoMonedaModelo.create(req.body).then(result => {
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
    TipoMonedaModelo.create(req.body).then(result => {
      locals['title'] = `${legend} creado.`;
      locals['data'] = result;
      locals['id'] = result[idtable];
      locals['tipo'] = 1;
      res.json(locals) 
    }).catch((error) => {
      let locals = tratarError.tratarError(error, legend);
      res.json(locals);
    });
  }
};

TipoMonedaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    TipoMonedaModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributesPersonalizados}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreTipoMoneda != response.dataValues.nombreTipoMoneda || 
          body.simboloTipoMoneda != response.dataValues.simboloTipoMoneda
          ) {actualizar = true}
        if (actualizar) {
          TipoMonedaModelo.update(
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

TipoMonedaController.destroy = (req, res, next) => {
  let locals = {};
  TipoMonedaModelo.destroy({
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

TipoMonedaController.error404 = (req, res, next) => {
  let locals = {};
  locals['title'] = `Error 404 en ${legend}.`;
  locals['tipo'] = 0;
  res.status(404).send(locals);
};

module.exports = TipoMonedaController;