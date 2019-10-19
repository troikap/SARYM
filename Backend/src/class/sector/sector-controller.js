"use strict";

let tratarError = require("../../middlewares/handleError");
const SectorModelo = require("../sector/sector-model"),
  SectorController = () => {},
  legend = "Sector",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  bajatable = `fechaYHoraBaja${[legend]}`,
  date = new Date(),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  attributesPersonalizados = [
    "idSector",
    "codSector",
    "nombreSector",
    "fechaYHoraBajaSector",
  ];

SectorController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  SectorModelo.findAll({
    where: {
      [Op.or]: [
        {idSector: {[Op.substring]: req.params.anyAttribute}},
        {codSector: {[Op.substring]: req.params.anyAttribute}},
        {nombreSector: {[Op.substring]: req.params.anyAttribute}},
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

SectorController.getToName = (req, res, next) => {
  let locals = {};
  SectorModelo.findAll({
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

SectorController.getAll = (req, res, next) => {
  let locals = {};
  SectorModelo.findAll({ 
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

SectorController.getOne = (req, res, next) => {
  let locals = {};
  SectorModelo.findOne({
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

SectorController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    SectorModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributesPersonalizados}).then(project => {
      if (!project || project == 0) {
        SectorModelo.create(req.body).then(result => {
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
    SectorModelo.create(req.body).then(result => {
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

SectorController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    SectorModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributesPersonalizados}).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.codSector != response.dataValues.codSector || 
          body.nombreSector != response.dataValues.nombreSector
          ) {actualizar = true}
        if (body['bajaSector'] != null) {
          if ( body['bajaSector'] == true && response.dataValues.fechaYHoraBajaSector == null) {
            body['fechaYHoraBajaSector'] = new Date();
            actualizar = true
          } else if ( body['bajaSector'] == false && response.dataValues.fechaYHoraBajaSector != null) {
            body['fechaYHoraBajaSector'] = null;
            actualizar = true
          }
        }
        if (actualizar) {
          SectorModelo.update(
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

// SectorController.delete = (req, res, next) => {
//   let locals = {};
//   let body = {};
//   let idtabla = req.params[idtable];
//   body[bajatable] = date;
//   SectorModelo.update(
//     body, 
//     {where: {[idtable]: idtabla}}).then(result => {
//       if (result && result != 0) {
//         locals['title'] = `Registro ${legend} Actualizado`;
//         locals['tipo'] = 1;
//       } else {
//         locals['title'] = `Registro ${legend} NO Actualizado`;
//         locals['tipo'] = 2;
//       }
//       res.json(locals)
//     }).catch((error) => {
//       let locals = tratarError.tratarError(error, legend);
//       res.json(locals);
//   });
// }

SectorController.destroy = (req, res, next) => {
  let locals = {};
  SectorModelo.destroy({
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

module.exports = SectorController;