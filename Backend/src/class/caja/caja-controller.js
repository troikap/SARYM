"use strict";

let tratarError = require("../../middlewares/handleError");
const CajaModelo = require("../caja/caja-model"),
  CajaController = () => {},
  CajaEstadoModelo = require("../cajaestado/cajaestado-model"),
  EstadoCajaModelo = require("../estadocaja/estadocaja-model"),
  UsuarioModelo = require("../usuario/usuario-model"),
  legend = "Caja",
  legend2 = "CajaEstado",
  idtable = `id${legend}`,
  nrotable = `nro${legend}`,
  codtable = `nro${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

CajaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  CajaModelo.findAll({
      where: {
          [Op.or]: [
              {idCaja: {[Op.substring]: req.params.anyAttribute}},
              {nroCaja: {[Op.substring]: req.params.anyAttribute}},
              ]
          }
  }).then(project => {
      if (!project || project == 0) {
        locals['title'] = "No existe el registro : " + req.params[nombretable];
        res.json(locals);
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        res.json(locals);
      }
  });
};

CajaController.getToName = (req, res, next) => {
  let locals = {};
  CajaModelo.findAll({
    where: { [nrotable]: { [Op.substring]: req.params[nrotable] }}
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = "No existe el registro : " + req.params[nrotable];
      res.json(locals);
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      res.json(locals);
    }
  });
};

CajaController.getAll = (req, res, next) => {
  let locals = {};
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
      locals['title'] = `No existen registros de ${legend}`;
      res.json(locals);
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = projects;
      res.json(locals);
    }
  });
};

CajaController.getOne = (req, res, next) => {
  let locals = {};
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
      locals['title'] = "No existe el registro : " + req.params[idtable]
      res.json(locals);
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project.dataValues;
      res.json(locals);
    }
  });
};

CajaController.create = (req, res) => {
  let locals = {};
  if ( req.body[codtable] ) {
    CajaModelo.findOne({
      where: {[codtable]: req.body[codtable]} 
    }).then( resp => {
      if ( !resp ) {
        if (req.body[idtable]) {
          CajaModelo.findOne({
            where: { [idtable]: req.body[idtable] }
          }).then(project => {
            if (!project || project == 0) {
              CajaModelo.create(req.body).then(result => {
                locals['title'] = `Creando ${legend}`;
                locals['id'] = result[idtable];
                locals['data'] = result;
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
                  locals['title'] = `Actualizando ${legend}: ${req.body[idtable]}`;
                  res.json(locals);
                });
              } else {
                locals['title'] = `No existe ninguna modificación de ${legend}: ${req.body[idtable]}`;
                res.json(locals);
              }
            }
          });
        } else {
          CajaModelo.create(req.body).then(result => {
            locals['title'] = `Creando Nuevo ${legend}: ${result[idtable]}`;
            locals['data'] = result;
            res.json(locals);
          });
        }
      } else {
        locals['title'] = `Codigo ${req.body[codtable]} ya existe`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    })
  }
};

CajaController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    CajaModelo.findOne({
      where: {
        [idtable]: body[idtable] },
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
      }).then(response => {
        locals['data'] = response;
          if (!response || response == 0) {
              locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
              res.json(locals);
          } else {
              var actualizarEstado = false;
              var check = false;
              if (
                  body.nroCaja != response.dataValues.nroCaja
              ) {
                  check = true
              }
              if ((body.idEstadoCaja != response.dataValues.cajaestados[0].dataValues.estadocaja.dataValues.idEstadoCaja) ||
                  (body.idUsuario != response.dataValues.cajaestados[0].dataValues.usuario.dataValues.idUsuario) ||
                  body['descripcionCajaEstado'] != response.dataValues.cajaestados[0].descripcionCajaEstado ||
                  body['montoAperturaCajaEstado'] != response.dataValues.cajaestados[0].montoAperturaCajaEstado ||
                  body['montoCierreCajaEstado'] != response.dataValues.cajaestados[0].montoCierreCajaEstado
              ) {
                  check = true;
                  actualizarEstado = true;
              }
              // GUARDANDO
              if (check) {
                  CajaModelo.update(body, {
                      where: {
                          [idtable]: body[idtable]
                      }
                  }).then(result => {
                    if (actualizarEstado) {
                        CajaEstadoModelo.update({ fechaYHoraBajaCajaEstado: Date() }, {
                            where: {
                                [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
                            })
                            .then((resp) => {
                                if (!resp || resp == 0) {
                                    locals['title'] = "Error al Eliminar CajaEstado"
                                    res.json(locals)
                                } else {
                                    locals['estado'] = "Actualizado Estado";
                                    let pushEstado = {};
                                    if (body.idEstadoCaja) {
                                        pushEstado['idEstadoCaja'] = body.idEstadoCaja
                                    } else {
                                        pushEstado['idEstadoCaja'] = response.idEstadoCaja
                                    }
                                    if (body.idUsuario) {
                                      pushEstado['idUsuario'] = body.idUsuario
                                    } else {
                                      pushEstado['idUsuario'] = response.idUsuario
                                    }
                                    pushEstado[idtable] = body[idtable];
                                    pushEstado['fechaYHoraAltaCajaEstado'] = new Date();
                                    pushEstado['descripcionCajaEstado'] = (body.descripcionCajaEstado || response.descripcionCajaEstado);
                                    pushEstado['montoAperturaCajaEstado'] = (body.montoAperturaCajaEstado || response.montoAperturaCajaEstado);
                                    pushEstado['montoCierreCajaEstado'] = (body.montoCierreCajaEstado || response.montoCierreCajaEstado);
                                    CajaEstadoModelo.create(pushEstado)
                                      .then(result => {
                                          if (result) {
                                              locals['title'] = `${legend} creado`;
                                              locals[legend2] = result;
                                          } else {
                                              locals[legend2] = "nada";
                                          }
                                      });
                                }
                            })
                      }
                      let locals = {
                          title: `Registro ${legend} Actualizado`,
                          tipo: 1
                      };
                      res.json(locals);
                  }).catch((error) => {
                    let locals = tratarError.tratarError(error, legend);
                    res.json(locals);
                  });
              } else {
                  let locals = {
                      title: `No ha Modificado ningún Registro de ${legend}`,
                      tipo: 2
                  };
                  res.json(locals);
              }
          }
      });
  } else {
      locals['title'] = `No envio id de ${legend}`;
      res.json(locals);
  }
};

CajaController.delete = (req, res, next) => {
  let locals = {};
  let [idtabla] = req.params[idtabla];
  CajaModelo.getOne([idtabla], (err, rows) => {
    if (err) {
      locals['title'] = `Error al buscar el registro con el id: ${[idtabla]}`;
      locals['description'] = "Error de Sintaxis SQL";
      locals['error'] = err;
      res.json(locals);
    } else {
      locals['title'] = `${leyenda}: ${[idtabla]}`;
      locals['data'] = rows;
      res.json(locals);
    }
  });
};

CajaController.destroy = (req, res, next) => {
  let locals = {};
  CajaModelo.destroy({
    where: {
      [idtable]: req.params[idtable]
    }
  }).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe el registro de ${legend}: ` + req.params[idtable];
      res.json(locals);
    } else {
      locals['title'] = `${legend} Eliminado Fisicamente`;
      res.json(locals);
    }
  });
};

module.exports = CajaController;