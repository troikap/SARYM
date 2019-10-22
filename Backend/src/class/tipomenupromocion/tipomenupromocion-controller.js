"use strict";

let tratarError = require("../../middlewares/handleError");
const TipoMenuPromocionModelo = require("../tipomenupromocion/tipomenupromocion-model"),
  TipoMenuPromocionController = () => {},
  attributes = require('../attributes'),
  legend = "TipoMenuPromocion",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;
  
TipoMenuPromocionController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  TipoMenuPromocionModelo.findAll({
    where: {
      [Op.or]: [
        {idTipoMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
        {[nombretable]: {[Op.substring]: req.params.anyAttribute}},
      ]
    },
    attributes: attributes.tipomenupromocion}).then(project => {
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

TipoMenuPromocionController.getToName = (req, res, next) => {
  let locals = {};
  TipoMenuPromocionModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.tipomenupromocion}).then(project => {
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

TipoMenuPromocionController.getAll = (req, res, next) => {
  let locals = {};
  TipoMenuPromocionModelo.findAll({ 
    attributes: attributes.tipomenupromocion}).then(projects => {
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

TipoMenuPromocionController.getOne = (req, res, next) => {
  let locals = {};
  TipoMenuPromocionModelo.findOne({
    where: {[idtable]: req.params[idtable]},
    attributes: attributes.tipomenupromocion}).then(project => {
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

TipoMenuPromocionController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    TipoMenuPromocionModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributes.tipomenupromocion}).then(project => {
      if (!project || project == 0) {
        TipoMenuPromocionModelo.create(req.body).then(result => {
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
    TipoMenuPromocionModelo.create(req.body).then(result => {
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

TipoMenuPromocionController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    TipoMenuPromocionModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributes.tipomenupromocion}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreTipoMenuPromocion != response.dataValues.nombreTipoMenuPromocion
          ) {actualizar = true}
        if (actualizar) {
          TipoMenuPromocionModelo.update(
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

TipoMenuPromocionController.destroy = (req, res, next) => {
  let locals = {};
  TipoMenuPromocionModelo.destroy({
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

TipoMenuPromocionController.error404 = (req, res, next) => {
  let locals = {};
  locals['title'] = `Error 404 No existe esa Ruta.`;
  locals['tipo'] = 0;
  res.status(404).send(locals);
};

module.exports = TipoMenuPromocionController;