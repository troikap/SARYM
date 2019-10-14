"use strict";

const EstadoCajaModelo = require("./estadocaja-model"),
  EstadoCajaController = () => {},
  legend = "EstadoCaja",
  idtable = "idEstadoCaja",
  table = "estadocaja";

EstadoCajaController.getAll = (req, res, next) => {
  EstadoCajaModelo.findAll({ raw: true }).then(projects => {
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

EstadoCajaController.getOne = (req, res, next) => {
  EstadoCajaModelo.findOne({
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

EstadoCajaController.create = (req, res) => {
  if (req.body[idtable]) {
    EstadoCajaModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        EstadoCajaModelo.create(req.body).then(result => {
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
          EstadoCajaModelo.update(req.body, {
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
    EstadoCajaModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

EstadoCajaController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  UsuarioEstadoCajaModelo.getOne([idtabla], (err, rows) => {
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

EstadoCajaController.destroy = (req, res, next) => {
  EstadoCajaModelo.destroy({
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

EstadoCajaController.error404 = (req, res, next) => {
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

module.exports = EstadoCajaController;