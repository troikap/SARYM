"use strict";

const tratarError = require("../../middlewares/handleError"),
  CajaModelo = require("../caja/caja-model"),
  CajaController = () => {},
  attributes = require('../attributes'),
  CajaEstadoModelo = require("../cajaestado/cajaestado-model"),
  EstadoCajaModelo = require("../estadocaja/estadocaja-model"),
  UsuarioModelo = require("../usuario/usuario-model"),
  legend = "Caja",
  legend2 = "CajaEstado",
  legend3 = "EstadoCaja",
  legend4 = "Usuario",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  nametable = `nro${legend}`,
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
              Sequelize.literal("`cajaestados->estadocaja`.`nombreEstadoCaja` LIKE '%" + req.params.anyAttribute + "%'"),
              Sequelize.literal("`cajaestados->usuario`.`nombreUsuario` LIKE '%" + req.params.anyAttribute + "%'"),
              Sequelize.literal("`cajaestados->usuario`.`apellidoUsuario` LIKE '%" + req.params.anyAttribute + "%'"),
              ]
          },
      attributes: attributes.caja,
      include: [
        {
          model: CajaEstadoModelo,
          where: { fechaYHoraBajaCajaEstado: null },
          attributes: attributes.cajaestado,
          include: [
            {
              model: EstadoCajaModelo,
              attributes: attributes.estadocaja
            },
            {
              model: UsuarioModelo,
              attributes: attributes.usuario
            }
          ]
        }
      ]
  }).then(project => {
      if (!project || project == 0) {
        locals['title'] = `No existe registro con valor : ${req.params.anyAttribute}.`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
  });
};

CajaController.getToName = (req, res, next) => {
  let locals = {};
  CajaModelo.findAll({where: { [nametable]: { [Op.substring]: req.params[nametable] }},
    attributes: attributes.caja,
    include: [
      {
        model: CajaEstadoModelo,
        where: { fechaYHoraBajaCajaEstado: null },
        attributes: attributes.cajaestado,
        include: [
          {
            model: EstadoCajaModelo,
            attributes: attributes.estadocaja
          },
          {
            model: UsuarioModelo,
            attributes: attributes.usuario
          }
        ]
      }
    ]
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe registro con valor : ${req.params[nametable]}.`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

CajaController.getAll = (req, res, next) => {
  let locals = {};
  CajaModelo.findAll({
    attributes: attributes.caja,
    include: [
      {
        model: CajaEstadoModelo,
        where: { fechaYHoraBajaCajaEstado: null },
        attributes: attributes.cajaestado,
        include: [
          {
            model: EstadoCajaModelo,
            attributes: attributes.estadocaja
          },
          {
            model: UsuarioModelo,
            attributes: attributes.usuario
          }
        ]
      }
    ]
  })
  .then(projects => {
    if (!projects || projects == 0) {
      locals['title'] = `No existen registros de ${legend}.`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = projects;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

CajaController.getOne = (req, res, next) => {
  let locals = {};
  CajaModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    include: [
      {
        model: CajaEstadoModelo,
        where: { fechaYHoraBajaCajaEstado: null },
        attributes: attributes.cajaestado,
        include: [
          {
            model: EstadoCajaModelo,
            attributes: attributes.estadocaja
          },
          {
            model: UsuarioModelo,
            attributes: attributes.usuario
          }
        ]
      }
    ]
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe registro con id: ${req.params[idtable]}.`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

CajaController.create = (req, res) => {
  let locals = {};
  if ( req.body[idtable] ) {
    CajaModelo.findOne({ where: {[idtable]: req.body[idtable]} }).then( resp => {
      if ( !resp || resp == 0 ) {        
        EstadoCajaModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
          if ( !responses || responses == 0 ) {
              locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
              locals['tipo'] = 2;
              res.json(locals);
          } else {
            UsuarioModelo.findOne({ where: {[idtable4]: req.body[idtable4]} }).then( respo => {
              if ( !respo || respo == 0 ) {
                locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                CajaModelo.create(req.body).then(result => {
                  locals['title'] = `${legend} creada.`;
                  locals['data'] = result;
                  locals['id'] = result[idtable];
                  locals['tipo'] = 1;
                  let pushCajaEstado = {};
                  pushCajaEstado['descripcionCajaEstado'] = "Reciente.";
                  pushCajaEstado['montoAperturaCajaEstado'] = 0;
                  pushCajaEstado['montoCierreCajaEstado'] = 0;
                  // pushCajaEstado['descripcionCajaEstado'] = req.body['descripcionCajaEstado'];
                  // pushCajaEstado['montoAperturaCajaEstado'] = req.body['montoAperturaCajaEstado'];
                  // pushCajaEstado['montoCierreCajaEstado'] = req.body['montoCierreCajaEstado'];
                  pushCajaEstado[idtable] = result[idtable];
                  pushCajaEstado['fechaYHoraAltaCajaEstado'] = new Date();
                  pushCajaEstado[idtable3] = 1;
                  pushCajaEstado[idtable4] = req.body[idtable4];
                  CajaEstadoModelo.create(pushCajaEstado).then( response => {
                    locals['title'] = `${legend} creado. ${legend2} creado.`;
                    locals['data'] = response;
                    locals['tipo'] = 1;
                    res.json(locals);
                  }).catch((error) => {
                    locals = tratarError.tratarError(error, legend);
                    res.json(locals);
                  });
                }).catch((error) => {
                  locals = tratarError.tratarError(error, legend);
                  res.json(locals);
                });
              }
            })
          }
        })
      } else {
        locals['title'] = `Ya existe registro con ${idtable}: ${req.body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    })
  } else {
    EstadoCajaModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
      if ( !responses || responses == 0 ) {
          locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
          locals['tipo'] = 2;
          res.json(locals);
      } else {
        UsuarioModelo.findOne({ where: {[idtable4]: req.body[idtable4]} }).then( respo => {
          if ( !respo || respo == 0 ) {
            locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            CajaModelo.create(req.body).then(result => {
              locals['title'] = `${legend} creada.`;
              locals['data'] = result;
              locals['id'] = result[idtable];
              locals['tipo'] = 1;
              let pushCajaEstado = {};
              pushCajaEstado['descripcionCajaEstado'] = "Reciente.";
              pushCajaEstado['montoAperturaCajaEstado'] = 0;
              pushCajaEstado['montoCierreCajaEstado'] = 0;
              // pushCajaEstado['descripcionCajaEstado'] = req.body['descripcionCajaEstado'];
              // pushCajaEstado['montoAperturaCajaEstado'] = req.body['montoAperturaCajaEstado'];
              // pushCajaEstado['montoCierreCajaEstado'] = req.body['montoCierreCajaEstado'];
              pushCajaEstado[idtable] = result[idtable];
              pushCajaEstado['fechaYHoraAltaCajaEstado'] = new Date();
              pushCajaEstado[idtable3] = 1;
              pushCajaEstado[idtable4] = req.body[idtable4];
              CajaEstadoModelo.create(pushCajaEstado).then( response => {
                locals['title'] = `${legend} creado. ${legend2} creado.`;
                locals['data'] = response;
                locals['tipo'] = 1;
                res.json(locals);
              }).catch((error) => {
                locals = tratarError.tratarError(error, legend);
                res.json(locals);
              });
            }).catch((error) => {
              locals = tratarError.tratarError(error, legend);
              res.json(locals);
            });
          }
        })
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
        attributes: attributes.caja,
        include: [
          {
            model: CajaEstadoModelo,
            where: { fechaYHoraBajaCajaEstado: null },
            attributes: attributes.cajaestado,
            include: [
              {
                model: EstadoCajaModelo,
                attributes: attributes.estadocaja
              },
              {
                model: UsuarioModelo,
                attributes: attributes.usuario
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