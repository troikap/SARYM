"use strict";

const SectorModelo = require("../sector/sector-model"),
  SectorController = () => {},
  legend = "Sector",
  idtable = `id${legend}`,
  table = "sector",
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

SectorController.getToAllAttributes = (req, res, next) => {
  SectorModelo.findAll({
      where: {
          [Op.or]: [
              {codSector: {[Op.substring]: req.params.anyAttribute}},
              {idSector: {[Op.substring]: req.params.anyAttribute}},
              {nombreSector: {[Op.substring]: req.params.anyAttribute}},
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

SectorController.getToName = (req, res, next) => {
    SectorModelo.findAll({
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

SectorController.getAll = (req, res, next) => {
  SectorModelo.findAll({ raw: true }).then(projects => {
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

SectorController.getOne = (req, res, next) => {
  SectorModelo.findOne({
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

SectorController.create = (req, res) => {
  console.log("Estamos LLEGANDO M", req.body)
  if (req.body[idtable]) {
    SectorModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        SectorModelo.create(req.body).then(result => {
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
          SectorModelo.update(req.body, {
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
    SectorModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

SectorController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  SectorModelo.getOne([idtabla], (err, rows) => {
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

SectorController.destroy = (req, res, next) => {
  SectorModelo.destroy({
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

module.exports = SectorController;