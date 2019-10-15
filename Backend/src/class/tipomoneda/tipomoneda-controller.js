"use strict";

const TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  TipoMonedaController = () => {},
  legend = "TipoMoneda",
  idtable = `id${legend}`,
  table = "tipomoneda",
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

TipoMonedaController.getToAllAttributes = (req, res, next) => {
  TipoMonedaModelo.findAll({
    where: {
      [Op.or]: [
          {nombreTipoMoneda: {[Op.substring]: req.params.anyAttribute}},
          {simboloTipoMoneda: {[Op.substring]: req.params.anyAttribute}},
          {idTipoMoneda: {[Op.substring]: req.params.anyAttribute}},
          ]
      }
  }).then(project => {
    if (!project || project == 0) {
        let locals = {
            title: "No existe el registro : " + req.params[nombretable]
        };
        res.json(locals);
    } else {
        let locals = {
            title: `${legend}`,
            data: project
        };
        res.json(locals);
    }
  });
};

TipoMonedaController.getToName = (req, res, next) => {
  TipoMonedaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }}
  }).then(project => {
    if (!project || project == 0) {
      let locals = {
        title: "No existe el registro : " + req.params[nombretable]
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend}`,
        data: project
      };
      res.json(locals);
    }
  });
};

TipoMonedaController.getAll = (req, res, next) => {
  TipoMonedaModelo.findAll({ raw: true }).then(projects => {
    if (!projects || projects == 0) {
      let locals = {
        title: `No existen registros de ${legend}`
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend}`,
        data: projects
      };
      res.json(locals);
    }
  });
};

TipoMonedaController.getOne = (req, res, next) => {
  TipoMonedaModelo.findOne({
    where: { [idtable]: req.params[idtable] }
  }).then(project => {
    if (!project || project == 0) {
      let locals = {
        title: "No existe el registro : " + req.params[idtable]
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend}`,
        data: project.dataValues
      };
      res.json(locals);
    }
  });
};

TipoMonedaController.create = (req, res) => {
  if (req.body[idtable]) {
    TipoMonedaModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        TipoMonedaModelo.create(req.body).then(result => {
          let locals = {
            title: `Creando ${legend}`,
            id: result[idtable],
            data: result
          };
          res.json(locals);
        });
      } else {
        var check = false;
        for (let attribute in req.body) {
          if (
            String(req.body[attribute]) != String(project.dataValues[attribute])
          ) {
            check = true;
          }
        }
        if (check) {
          TipoMonedaModelo.update(req.body, {
            where: {
              [idtable]: req.body[idtable]
            }
          }).then(result => {
            let locals = {
              title: `Actualizando ${legend}: ${req.body[idtable]}`
            };
            res.json(locals);
          });
        } else {
          let locals = {
            title: `No existe ninguna modificación de ${legend}: ${req.body[idtable]}`
          };
          res.json(locals);
        }
      }
    });
  } else {
    TipoMonedaModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

TipoMonedaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    TipoMonedaModelo.findOne({
      where: { [idtable]: body[idtable] },
      attributes: [
        "idTipoMoneda",
        "nombreTipoMoneda",
        "simboloTipoMoneda",
      ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreTipoMoneda != response.dataValues.nombreTipoMoneda || 
          body.simboloTipoMoneda != response.dataValues.simboloTipoMoneda
          ) {
            actualizar = true
          }
        if (actualizar) {
          TipoMonedaModelo.update(body, {where: {[idtable]: body[idtable]}})
            .then(result => {
              if (result) {
                locals['title'] = `Registro ${legend} Actualizado`;
                locals['tipo'] = 1;
              } else {
                locals['title'] = `Registro ${legend} NO Actualizado`;
                locals['tipo'] = 2;
              }
              res.json(locals)
            })
        } else {
          locals['title'] = `No ha Modificado ningún Registro de ${legend}`,
          locals['tipo'] = 2;
          res.json(locals);
        }
      }
    });
  } else {
      locals['title'] = `No envio id de ${legend}`;
      locals['tipo'] = 2;
    res.json(locals);
  }
};

TipoMonedaController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  TipoMonedaModelo.getOne([idtabla], (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${[idtabla]}`,
        description: "Error de Sintaxis SQL",
        error: err
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${leyenda}: ${[idtabla]}`,
        data: rows
      };
      res.json(locals);
    }
  });
};

TipoMonedaController.destroy = (req, res, next) => {
  TipoMonedaModelo.destroy({
    where: {
      [idtable]: req.params[idtable]
    }
  }).then(response => {
    if (!response || response == 0) {
      let locals = {
        title: `No existe el registro de ${legend}: ` + req.params[idtable]
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend} Eliminado Fisicamente`
      };
      res.json(locals);
    }
  });
};

TipoMonedaController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: `Recurso No Encontrado`,
      error: error
    };
  error.status = 404;
  res.json(locals);
  next();
};

module.exports = TipoMonedaController;