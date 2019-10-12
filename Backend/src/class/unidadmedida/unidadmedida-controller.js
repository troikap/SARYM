"use strict";

const UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  UnidadMedidaController = () => {},
  legend = "UnidadMedida",
  idtable = `id${legend}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

UnidadMedidaController.getToName = (req, res, next) => {
  UnidadMedidaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }}
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = "No existe el registro : " + req.params[nombretable];
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};
  
UnidadMedidaController.getAll = (req, res, next) => {
  UnidadMedidaModelo.findAll({ raw: true }).then(projects => {
    if (!projects || projects == 0) {
      locals['title'] = `No existen registros de ${legend}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      locals['title'] = `${legend}`,
      locals['data'] = projects;
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};

UnidadMedidaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    UnidadMedidaModelo.findOne({
      where: { [idtable]: body[idtable] },
      attributes: [
        'codUnidadMedida',
        'descripcionUnidadMedida',
        'nombreUnidadMedida',
        'caracterUnidadMedida',
      ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        let actualizarCod = false;
        if ( 
          body.codUnidadMedida != response.dataValues.codUnidadMedida || 
          body.descripcionUnidadMedida != response.dataValues.descripcionUnidadMedida ||
          body.nombreUnidadMedida != response.dataValues.nombreUnidadMedida ||
          body.caracterUnidadMedida != response.dataValues.caracterUnidadMedida
          ) {
            if (body.codUnidadMedida != response.dataValues.codUnidadMedida) {
              actualizarCod = true;
            }
            actualizar = true
          }
        if (actualizar) {
          if (actualizarCod){
            UnidadMedidaModelo.findOne({
              where: { codUnidadMedida: body.codUnidadMedida },
            })
            .then( (resp) => {
              if (!resp || resp == null) {
                UnidadMedidaModelo.update(body, {where: {[idtable]: body[idtable]}})
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
                locals['title'] = `Codigo de ${legend} ya existe.`,
                locals['tipo'] = 2;
                res.json(locals)
              }
            })
          } else {
            UnidadMedidaModelo.update(body, {where: {[idtable]: body[idtable]}}).then(result => {
              if (result) {
                locals['title'] =  `Registro ${legend} Actualizado`;
                locals['tipo'] = 1;
              } else {
                locals['title'] =  `Registro ${legend} NO Actualizado`,
                locals['tipo'] = 2;
              }
              res.json(locals)
            })
          }
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

UnidadMedidaController.getOne = (req, res, next) => {
  UnidadMedidaModelo.findOne({
    where: { [idtable]: req.params[idtable] }
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = "No existe el registro : " + req.params[idtable];
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project.dataValues;
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};

UnidadMedidaController.create = (req, res) => {
  if (req.body[idtable]) {
    UnidadMedidaModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        UnidadMedidaModelo.create(req.body).then(result => {
          locals['title'] = `Creando ${legend}`;
          locals['id'] = result[idtable];
          locals['data'] = result;
          locals['tipo'] = 1;
          res.json(locals);
        });
      } else {
        locals['title'] = "Registro Existente.";
        locals['tipo'] = 2;
        res.json(locals);
      }
    });
  } else {
    UnidadMedidaModelo.create(req.body).then(result => {
      locals['title'] = `Creando Nuevo ${legend}: ${result[idtable]}`;
      locals['data'] = result;
      locals['tipo'] = 1;
      res.json(locals);
    });
  }
};

UnidadMedidaController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  UnidadMedidaModelo.getOne([idtabla], (err, rows) => {
    if (err) {
      locals['title'] = `Error al buscar el registro con el id: ${[idtabla]}`;
      locals['data'] = err;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      locals['title'] = `${leyenda}: ${[idtabla]}`;
      locals['data'] = rows;
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};

UnidadMedidaController.destroy = (req, res, next) => {
  UnidadMedidaModelo.destroy({
    where: {
      [idtable]: req.params[idtable]
    }
  }).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe el registro de ${legend}: ` + req.params[idtable];
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      locals['title'] = `${legend} Eliminado Fisicamente`
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};

UnidadMedidaController.error404 = (req, res, next) => {
  locals['title'] = "Error 404";
  locals['data'] = `Recurso No Encontrado`;
  locals['tipo'] = 2;
  res.json(locals);
  next();
};

module.exports = UnidadMedidaController;