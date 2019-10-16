"use strict";

const RubroModelo = require("../rubro/rubro-model"),
  RubroController = () => {},
  legend = "Rubro",
  idtable = `id${legend}`,
  table = "rol",
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

RubroController.getToAllAttributes = (req, res, next) => {
  RubroModelo.findAll({
      where: {
          [Op.or]: [
              {codRubro: {[Op.substring]: req.params.anyAttribute}},
              {idRubro: {[Op.substring]: req.params.anyAttribute}},
              {nombreRubro: {[Op.substring]: req.params.anyAttribute}},
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

RubroController.getToName = (req, res, next) => {
  RubroModelo.findAll({
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

RubroController.getAll = (req, res, next) => {
  RubroModelo.findAll({ raw: true }).then(projects => {
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

RubroController.getOne = (req, res, next) => {
  RubroModelo.findOne({
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

RubroController.create = (req, res) => {
  if (req.body[idtable]) {
    RubroModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        RubroModelo.create(req.body).then(result => {
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
          RubroModelo.update(req.body, {
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
    RubroModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

RubroController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    RubroModelo.findOne({
      where: { [idtable]: body[idtable] },
      attributes: [
        "idRubro",
        "codRubro",
        "nombreRubro",
        "descripcionRubro"
      ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.codRubro != response.dataValues.codRubro || 
          body.nombreRubro != response.dataValues.nombreRubro ||
          body.descripcionRubro != response.dataValues.descripcionRubro
          ) {
            actualizar = true
          }
        if (actualizar) {
          RubroModelo.update(body, {where: {[idtable]: body[idtable]}})
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

RubroController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  RubroModelo.getOne([idtabla], (err, rows) => {
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

RubroController.destroy = (req, res, next) => {
  RubroModelo.destroy({
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

RubroController.error404 = (req, res, next) => {
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

module.exports = RubroController;