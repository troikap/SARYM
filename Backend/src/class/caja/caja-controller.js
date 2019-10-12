"use strict";

const CajaModelo = require("../caja/caja-model"),
  CajaController = () => {},
  CajaEstadoModelo = require("../cajaestado/cajaestado-model"),
  EstadoCajaModelo = require("../estadocaja/estadocaja-model"),
  UsuarioModelo = require("../usuario/usuario-model"),
  legend = "Caja",
  idtable = `id${legend}`,
  nrotable = `nro${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

CajaController.getToName = (req, res, next) => {
  CajaModelo.findAll({
    where: { [nrotable]: { [Op.substring]: req.params[nrotable] }}
  }).then(project => {
    if (!project || project == 0) {
      let locals = {
        title: "No existe el registro : " + req.params[nrotable]
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

CajaController.getAll = (req, res, next) => {
  CajaModelo.findAll({
    attributes: [
      'idCaja',
      'nroCaja',
    ],
    include: [
      {
        model: CajaEstadoModelo,
        where: { fechaYHoraBajaCajaEstado: null },
        attributes: [
          'descripcionCajaEstado',
          'montoAperturaCajaEstado',
          'montoCierreCajaEstado',
          'fechaYHoraAltaCajaEstado',
          'fechaYHoraBajaCajaEstado',
        ],
        include: [
          {
            model: EstadoCajaModelo,
            attributes: [
              'codEstadoCaja',
              'nombreEstadoCaja',
            ]
          },
          {
            model: UsuarioModelo,
            attributes: [
              "idUsuario",
              "cuitUsuario",
              "nombreUsuario",
              "apellidoUsuario",
              "emailUsuario",
            ]
           
          }
        ]
      }
    ]
  }
  )
  .then(projects => {
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

CajaController.getOne = (req, res, next) => {
  CajaModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: [
      'idCaja',
      'nroCaja',
    ],
    include: [
      {
        model: CajaEstadoModelo,
        where: { fechaYHoraBajaCajaEstado: null },
        attributes: [
          'descripcionCajaEstado',
          'montoAperturaCajaEstado',
          'montoCierreCajaEstado',
          'fechaYHoraAltaCajaEstado',
          'fechaYHoraBajaCajaEstado',
        ],
        include: [
          {
            model: EstadoCajaModelo,
            attributes: [
              'codEstadoCaja',
              'nombreEstadoCaja',
            ]
          },
          {
            model: UsuarioModelo,
            attributes: [
              "idUsuario",
              "cuitUsuario",
              "nombreUsuario",
              "apellidoUsuario",
              "emailUsuario",
            ]
           
          }
        ]
      }
    ]
    
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

CajaController.create = (req, res) => {
  if (req.body[idtable]) {
    CajaModelo.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(project => {
      if (!project || project == 0) {
        CajaModelo.create(req.body).then(result => {
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
          CajaModelo.update(req.body, {
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
    CajaModelo.create(req.body).then(result => {
      let locals = {
        title: `Creando Nuevo ${legend}: ${result[idtable]}`,
        data: result
      };
      res.json(locals);
    });
  }
};

CajaController.delete = (req, res, next) => {
  let [idtabla] = req.params[idtabla];
  CajaModelo.getOne([idtabla], (err, rows) => {
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

CajaController.destroy = (req, res, next) => {
  CajaModelo.destroy({
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

CajaController.error404 = (req, res, next) => {
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

module.exports = CajaController;