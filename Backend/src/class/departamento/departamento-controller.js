"use strict";

const DepartamentoModelo = require("./departamento-model"),
  DepartamentoController = () => {},
  legend = "Departamento",
  idtable = "idDepartamento",
  table = "departamento";

DepartamentoController.getAll = (req, res, next) => {
  DepartamentoModelo.findAll({  raw: true,
    attributes: [
      'idDepartamento',
      'nombreDepartamento'
    ] }).then(respons => {
    let locals = {};
    if (!respons || respons == 0) {
      locals = {
        title: `No existen registros de ${legend}`
      };
      res.json(locals);
    } else {
      locals[legend] = respons;
      res.json(locals);
    }
  });
};

DepartamentoController.getOne = (req, res, next) => {
  DepartamentoModelo.findOne({
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

DepartamentoController.create = (req, res) => {
  if (req.body[idtable]) {
    DepartamentoModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        DepartamentoModelo.create(req.body).then(result => {
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
          DepartamentoModelo.update(req.body, {
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
    DepartamentoModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

DepartamentoController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  DepartamentoModelo.getOne([idtabla], (err, rows) => {
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

DepartamentoController.destroy = (req, res, next) => {
  DepartamentoModelo.destroy({
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

module.exports = DepartamentoController;