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

CajaController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
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
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        if (body[codtable] == null) {
          body[codtable] = response.dataValues[codtable]
        }
        CajaModelo.update(body, {
            where: {
                [idtable]: body[idtable]
            }
        }).then(result => {
          if (!result || result == 0) {
            locals['title'] = `No se Actualizo ${legend} con id ${body[idtable]}`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
          CajaEstadoModelo.update({ 
            descripcionCajaEstado: body['descripcionCajaEstado'] || response.dataValues.cajaestados[0].dataValues.descripcionCajaEstado,
            montoAperturaCajaEstado: body['montoAperturaCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoAperturaCajaEstado,
            montoCierreCajaEstado: body['montoCierreCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoCierreCajaEstado,
            [idtable4]: body[idtable4] || response.dataValues.cajaestados[0].dataValues[idtable4], // Usuario
           }, {where: {[idtable]: body[idtable], 
                      fechaYHoraBajaCajaEstado: null}
          }).then((resp) => {
          if (!resp || resp == 0) {
              locals['title'] = `No se actualizo ${legend2}.`;
              locals['tipo'] = 2;
          } else {
            locals['title'] = `Se actualizo ${legend2}.`;
            locals['tipo'] = 1;
          }
          res.json(locals);
        });
        }
      }).catch((error) => {
        let locals = tratarError.tratarError(error, legend);
        res.json(locals);
      });
    }
  });
};

CajaController.cambiarEstado = (req, res) => {
  let locals = {};
  let body = req.body;
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
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      if (!body[idtable4]) {
        locals['title'] = `No se envia ${legend4}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        EstadoCajaModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadocaja) =>{
          if(!estadocaja || estadocaja == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushCajaEstado = {};
            pushCajaEstado['fechaYHoraBajaCajaEstado'] = new Date();
              CajaEstadoModelo.update(pushCajaEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaCajaEstado'] = new Date();
                CajaEstadoModelo.create(body).then((resp) => {
                  if (!resp || resp == 0 ){
                    locals['title'] = `No se pudo crear ${legend2}.`;
                    locals['tipo'] = 2;
                  } else {
                    locals['title'] = `Se creo correctamente ${legend2}.`;
                    locals['tipo'] = 1;
                  }
                  res.json(locals);
                }).catch((error) => {
                  locals = tratarError.tratarError(error, legend);
                  res.json(locals);
                });
              }
            }).catch((error) => {
              locals = tratarError.tratarError(error, legend);
              res.json(locals);
            });
          }
        })
      }
    }
  });
};

CajaController.abrirCaja = (req, res) => {
  let locals = {};
  let body = req.body;
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
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      if (response.dataValues.cajaestados[0].dataValues.estadocaja.dataValues.nombreEstadoCaja == 'Cerrada' || 
      response.dataValues.cajaestados[0].dataValues.estadocaja.dataValues.nombreEstadoCaja == 'Creada') {
        let delCajaEstado = {};
        delCajaEstado['fechaYHoraBajaCajaEstado'] = new Date();
        CajaEstadoModelo.update(delCajaEstado , { where: { [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
        }).then((respons) => {
          if (!respons || respons == 0) {
            locals['title'] = `No se pudo dar de baja la ${legend} con id ${body[idtable]}.`;
            locals['tipo'] = 2;
          } else {
            let pushCajaEstado = {};
            pushCajaEstado[idtable] = body[idtable];
            pushCajaEstado['fechaYHoraAltaCajaEstado'] = new Date();
            pushCajaEstado[idtable3] = 2;
            pushCajaEstado[idtable4] = body[idtable4];
            pushCajaEstado['descripcionCajaEstado'] = body['descripcionCajaEstado'] || response.dataValues.cajaestados[0].dataValues.descripcionCajaEstado;
            pushCajaEstado['montoAperturaCajaEstado'] = body['montoAperturaCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoAperturaCajaEstado;
            CajaEstadoModelo.create(pushCajaEstado).then((resp) => {
              if (!resp || resp == 0 ){
                locals['title'] = `No se pudo crear ${legend2}.`;
                locals['tipo'] = 2;
              } else {
                locals['title'] = `Se creo correctamente ${legend2}.`;
                locals['tipo'] = 1;
              }
              res.json(locals);
            })
          }
        })
      } else {
        locals['title'] = `No puede pasar a ese estado.`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    }
  });
};

CajaController.cerrarCaja = (req, res) => {
  let locals = {};
  let body = req.body;
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
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        if (response.dataValues.cajaestados[0].dataValues.estadocaja.dataValues.nombreEstadoCaja == 'Abierta'){
          let delCajaEstado = {};
          delCajaEstado['fechaYHoraBajaCajaEstado'] = new Date();
          CajaEstadoModelo.update(delCajaEstado , { where: { [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
        }).then((respons) => {
          if (!respons || respons == 0) {
            locals['title'] = `No se pudo dar de baja la ${legend} con id ${body[idtable]}.`;
            locals['tipo'] = 2;
          } else {
            let pushCajaEstado = {};
            pushCajaEstado[idtable] = body[idtable];
            pushCajaEstado['fechaYHoraAltaCajaEstado'] = new Date();
            pushCajaEstado[idtable3] = 3;
            pushCajaEstado[idtable4] = body[idtable4];
            pushCajaEstado['descripcionCajaEstado'] = body['descripcionCajaEstado'] || response.dataValues.cajaestados[0].dataValues.descripcionCajaEstado;
            pushCajaEstado['montoCierreCajaEstado'] = body['montoCierreCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoAperturaCajaEstado;
            CajaEstadoModelo.create(pushCajaEstado).then((resp) => {
              if (!resp || resp == 0 ){
                locals['title'] = `No se pudo crear ${legend2}.`;
                locals['tipo'] = 2;
              } else {
                locals['title'] = `Se creo correctamente ${legend2}.`;
                locals['tipo'] = 1;
              }
              res.json(locals);
            })
          }
        })
      } else {
        locals['title'] = `No puede pasar a ese estado.`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    }
  });
};

// return sequelize.transaction(t => {

//   // chain all your queries here. make sure you return them.
//   return User.create({
//     firstName: 'Abraham',
//     lastName: 'Lincoln'
//   }, {transaction: t}).then(user => {
//     return user.setShooter({
//       firstName: 'John',
//       lastName: 'Boothe'
//     }, {transaction: t});
//   });

// }).then(result => {
//   // Transaction has been committed
//   // result is whatever the result of the promise chain returned to the transaction callback
// }).catch(err => {
//   // Transaction has been rolled back
//   // err is whatever rejected the promise chain returned to the transaction callback
// });

// CajaController.cambiarEstado = (req, res) => {
//   let locals = {};
//   let body = req.body;
//   CajaModelo.findOne({
//     where: {
//       [idtable]: body[idtable] },
//       attributes: attributes.caja,
//       include: [
//         {
//           model: CajaEstadoModelo,
//           where: { fechaYHoraBajaCajaEstado: null },
//           attributes: attributes.cajaestado,
//           include: [
//             {
//               model: EstadoCajaModelo,
//               attributes: attributes.estadocaja
//             },
//             {
//               model: UsuarioModelo,
//               attributes: attributes.usuario
//             }
//           ]
//         }
//       ]
//     }).then(response => {
//     if (!response || response == 0) {
//       locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
//       locals['tipo'] = 2;
//       res.json(locals);
//     } else {
//       sequelize.transaction(t => {
//         let pushCajaEstado = {};
//         pushCajaEstado['fechaYHoraBajaCajaEstado'] = new Date();
//           CajaEstadoModelo.update(pushCajaEstado , {
//             where: { [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
//         }, {transaction: t}).then((respons) => {
//           if(!respons || respons == 0) {
//             locals['title'] = `No existe ${legend2} habilitado.`;
//             locals['tipo'] = 2;
//             res.json(locals);
//           } else {
//             body['fechaYHoraAltaCajaEstado'] = new Date();
//             CajaEstadoModelo.create(body,{transaction: t}).then((resp) => {
//               if (!resp || resp == 0 ){
//                 locals['title'] = `No se pudo crear ${legend2}.`;
//                 locals['tipo'] = 2;
//               } else {
//                 locals['title'] = `Se creo correctamente ${legend2}.`;
//                 locals['tipo'] = 1;
//               }
//               res.json(locals);
//             }).catch((error) => {
//               locals = tratarError.tratarError(error, legend);
//               res.json(locals);
//             });
//           }
//         }).catch((error) => {
//           locals = tratarError.tratarError(error, legend);
//           res.json(locals);
//         });
//       });
//     }
//   });
// };

module.exports = CajaController;