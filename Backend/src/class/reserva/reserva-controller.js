"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  ReservaModelo = require("./reserva-model"),
  ReservaController = () => { },
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  UsuarioModelo = require("../usuario/usuario-model"),
  ReservaEstadoModelo = require("../reservaestado/reservaestado-model"),
  EstadoReservaModelo = require("../estadoreserva/estadoreserva-model"),
  DetalleReservaMesaModelo = require("../detallereservamesa/detallereservamesa-model"),
  MesaModelo = require("../mesa/mesa-model"),
  PedidoModelo = require("../pedido/pedido-model"),
  ComensalModelo = require("../comensal/comensal-model"),
  DetallePedidoProductoModelo = require("../detallepedidoproducto/detallepedidoproducto-model"),
  ProductoModelo = require("../producto/producto-model"),
  MenuPromocionModelo = require("../menupromocion/menupromocion-model"),
  PrecioMenuPromocionModelo = require("../preciomenupromocion/preciomenupromocion-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  PedidoEstadoModelo = require("../pedidoestado/pedidoestado-model"),
  EstadoPedidoModelo = require("../estadopedido/estadopedido-model"),
  TipoMenuPromocioModelo = require("../tipomenupromocion/tipomenupromocion-model"),

  legend = "Reserva",
  legend2 = "ReservaEstado",
  legend3 = "EstadoReserva",
  legend4 = "Mesa",
  legend5 = "Usuario",
  legend6 = "Comensal",
  legend7 = "DetalleReservaMesa",
  legend8 = "Pedido",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
  idtable8 = `id${legend8}`,

  nombretable = `cod${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

ReservaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  ReservaModelo.findAll({
    where: {
      [Op.or]: [
        {codReserva: {[Op.eq]: req.params.anyAttribute}},
        {idReserva: {[Op.eq]: req.params.anyAttribute}},
        Sequelize.literal("`usuario`.`nombreUsuario` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`usuario`.`apellidoUsuario` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`reservaestados->estadoreserva`.`nombreEstadoReserva` LIKE '%" + req.params.anyAttribute + "%'"),
      ]
    },
    attributes: attributes.reserva,
    include: [
      {
      model: UsuarioModelo,
      attributes: attributes.usuario,
      },
      {
        model: ReservaEstadoModelo,
        where: { fechaYHoraBajaReservaEstado: null },
        attributes: attributes.reservaestado,
        include: [
            {
            model: EstadoReservaModelo,
            attributes: attributes.estadoreserva
            }
        ]
      },
      {
        model: DetalleReservaMesaModelo,
        attributes: attributes.precioreserva,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      },
    ],
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe registro con valor : ${req.params["anyAttribute"]}.`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

ReservaController.getToName = (req, res, next) => {
  let locals = {};
  ReservaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.reserva,
    include: [
      {
      model: UsuarioModelo,
      attributes: attributes.usuario,
      },
      {
        model: ReservaEstadoModelo,
        where: { fechaYHoraBajaReservaEstado: null },
        attributes: attributes.reservaestado,
        include: [
            {
            model: EstadoReservaModelo,
            attributes: attributes.estadoreserva
            }
        ]
      },
      {
        model: DetalleReservaMesaModelo,
        attributes: attributes.precioreserva,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      },
    ],
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = "No existe ningun registro con la palabra : " + req.params[nombretable];
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

ReservaController.getAll = (req, res) => {
  let locals = {};
  ReservaModelo.findAll({ 
    attributes: attributes.reserva,
    include: [
      {
      model: UsuarioModelo,
      attributes: attributes.usuario,
      },
      {
        model: ReservaEstadoModelo,
        where: { fechaYHoraBajaReservaEstado: null },
        attributes: attributes.reservaestado,
        include: [
            {
            model: EstadoReservaModelo,
            attributes: attributes.estadoreserva
            }
        ]
      },
      {
        model: DetalleReservaMesaModelo,
        attributes: attributes.precioreserva,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      },
    ],
  }).then(projects => {
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
}

ReservaController.getOne = (req, res) => {
  let locals = {};
  ReservaModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.reserva,
    include: [
      {
        model: UsuarioModelo,
        attributes: attributes.usuario,
      },
      {
        model: ReservaEstadoModelo,
        where: { fechaYHoraBajaReservaEstado: null },
        attributes: attributes.reservaestado,
        include: [
            {
            model: EstadoReservaModelo,
            attributes: attributes.estadoreserva
            }
        ]
      },
      {
        model: DetalleReservaMesaModelo,
        attributes: attributes.precioreserva,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
        include: [
          {
            model: PedidoEstadoModelo,
            attributes: attributes.pedidoestado,
            where: { fechaYHoraBajaPedidoEstado: null},
            include: [
              {
                model: EstadoPedidoModelo,
                attributes: attributes.estadopedido,
              },
            ],
          },
          {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
              {
                model: ProductoModelo,
                attributes: attributes.producto,
                include: [
                  {
                    model: PrecioProductoModelo,
                    attributes: attributes.precioproducto,
                    where: { fechaYHoraHastaPrecioProducto: null},
                  },
                ]
              },
              {
                model: MenuPromocionModelo,
                attributes: attributes.menupromocion,
                include: [
                  {
                    model: PrecioMenuPromocionModelo,
                    attributes: attributes.preciomenupromocion,
                    where: { fechaYHoraHastaPrecioMenuPromocion: null},
                  },
                  {
                    model: TipoMenuPromocioModelo,
                    attributes: attributes.tipomenupromocion,
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      },
    ],
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

ReservaController.create = (req, res) => {
  let body = req.body;
  let locals = {};
  EstadoReservaModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
    if ( !responses || responses == 0 ) {
      locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      UsuarioModelo.findOne({ where: {[idtable5]: body[idtable5]} }).then( usuario => {
        if ( !usuario || usuario == 0 ) {
          locals['title'] = `No existe instancia de ${legend5} con ${idtable5}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
            ReservaModelo.create(body).then(result => {
            locals['title'] = `${legend} creada.`;
            locals['data'] = result;
            locals['id'] = result[idtable];
            locals['tipo'] = 1;
            let pushReservaEstado = {};
            pushReservaEstado['descripcionReservaEstado'] = body['descripcionReservaEstado'] || "Reciente.";
            pushReservaEstado[idtable] = result[idtable];
            pushReservaEstado['fechaYHoraAltaReservaEstado'] = fechaArgentina.getFechaArgentina();
            pushReservaEstado[idtable3] = 1;
                ReservaEstadoModelo.create(pushReservaEstado).then( response => {
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
};

ReservaController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
  console.log("BODY ", body)
  ReservaModelo.findOne({
    where: { [idtable]: body[idtable] },
    attributes: attributes.reserva,
    include: [
      {
      model: UsuarioModelo,
      attributes: attributes.usuario,
      },
      {
        model: ReservaEstadoModelo,
        where: { fechaYHoraBajaReservaEstado: null },
        attributes: attributes.reservaestado,
        include: [
            {
            model: EstadoReservaModelo,
            attributes: attributes.estadoreserva
            }
        ]
      },
      {
        model: DetalleReservaMesaModelo,
        attributes: attributes.precioreserva,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
        include: [
          {
            model: UsuarioModelo,
            attributes: attributes.usuario,
          },
        ]
      },
    ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
      ReservaModelo.update(body, {where: { [idtable]: body[idtable]}}).then(result => {
        if (!result || result == 0) {
          locals['title'] = `No se Actualizo ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 2;
        } else {
          locals['title'] = `Se Actualizo ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 1;
        }
        res.json(locals);
      }).catch((error) => {
        locals = tratarError.tratarError(error, legend);
        res.json(locals);
      });
    }
  });
};

ReservaController.cambiarEstado = (req, res) => {
  let locals = {};
  let body = req.body;
  ReservaModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.reserva,
      include: [
        {
        model: UsuarioModelo,
        attributes: attributes.usuario,
        },
        {
          model: ReservaEstadoModelo,
          where: { fechaYHoraBajaReservaEstado: null },
          attributes: attributes.reservaestado,
          include: [
              {
              model: EstadoReservaModelo,
              attributes: attributes.estadoreserva
              }
          ]
        },
        {
          model: DetalleReservaMesaModelo,
          attributes: attributes.precioreserva,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
          ]
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
        },
      ],
    }).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      if (!body[idtable3]) {
        locals['title'] = `No se envia ${legend3}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        if (response.dataValues.reservaestados[0].dataValues.estadoreserva[idtable3] != body[idtable3]) {
        EstadoReservaModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadoreserva) =>{
          if(!estadoreserva || estadoreserva == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushReservaEstado = {};
            pushReservaEstado['fechaYHoraBajaReservaEstado'] = fechaArgentina.getFechaArgentina();
              ReservaEstadoModelo.update(pushReservaEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaReservaEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaReservaEstado'] = fechaArgentina.getFechaArgentina();
                ReservaEstadoModelo.create(body).then((resp) => {
                  if (!resp || resp == 0 ){
                    locals['title'] = `No se pudo crear ${legend2}.`;
                    locals['tipo'] = 2;
                  } else {
                    locals['title'] = `Se realizo correctamente el cambio de Estado.`;
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
        } else {
            locals['title'] = `${legend} ya se encuentra en ese Estado.`;
            locals['tipo'] = 2;
            res.json(locals);
        }
      }
    }
  });
};

ReservaController.editarMesa = (req, res) => {
  let locals = { detalles: [] };
  let body = req.body;
  ReservaModelo.findOne({
      where: {
      [idtable]: body[idtable] },
      attributes: attributes.reserva,
      include: [
        {
        model: UsuarioModelo,
        attributes: attributes.usuario,
        },
        {
          model: ReservaEstadoModelo,
          where: { fechaYHoraBajaReservaEstado: null },
          attributes: attributes.reservaestado,
          include: [
              {
              model: EstadoReservaModelo,
              attributes: attributes.estadoreserva
              }
          ]
        },
        {
          model: DetalleReservaMesaModelo,
          attributes: attributes.precioreserva,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
          ]
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
        },
      ],
  }).then( async response => {
      if(!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${idtable}`;
          locals['tipo'] = 2;
          res.json(locals);
      } else {
          let i = 1;
          for ( let elem of body.detalle ) {
              if ( elem['idDetalleReservaMesa'] ) {
                  if ( elem['baja'] == true ) {
                      console.log("BORRAR   :---------------------------")
                      await DetalleReservaMesaModelo.destroy({where: {[idtable7]: elem[idtable7]}}).then((resp) => {
                          if(!resp || resp == 0) {
                              locals.detalles.push({
                                  ['title']: `Detalle NO eliminado con ${[idtable7]} = ${elem[[idtable7]]}`,
                                  ['tipo']: 2
                              })
                          } else {
                              locals.detalles.push({
                                  ['title']: `Detalle eliminado con ${[idtable7]} = ${elem[[idtable7]]}`,
                                  ['tipo']: 1
                              })
                          }
                      })
                  } 
              } else {
                  elem[idtable] = body[idtable];
                  if ( elem[idtable4] != null ) {
                      await MesaModelo.findOne({ where: {[idtable4]: elem[idtable4]}}).then( async (mesa) => {
                          if(!mesa || mesa == 0) {
                              locals.detalles.push({
                                  ['title']: `No existe ${legend4} con id ${idtable4}`,
                                  ['tipo']: 2
                              })
                          } else {
                            await DetalleReservaMesaModelo.findOne({ where: { [idtable4]: elem[idtable4] ,  [idtable]: body[idtable] }}).then( async (detallereservamesa) => {
                              if(!detallereservamesa || detallereservamesa == 0) {
                                await DetalleReservaMesaModelo.create(elem).then((resp) => {
                                  if(!resp || resp == 0) {
                                      locals.detalles.push({
                                          ['title']: `Detalle NO creado: ${elem[idtable4]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                          ['tipo']: 2
                                      })
                                  } else {
                                      locals.detalles.push({
                                          ['title']: `Detalle creado: ${elem[idtable4]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                          ['tipo']: 1
                                      })
                                  }
                                })
                              } else {
                                locals.detalles.push({
                                  ['title']: `No existe ${legend4} con id ${idtable4}`,
                                  ['tipo']: 2
                              })
                              }
                            })
                          }
                      })
                  } else {
                      locals.detalles.push({
                          ['title']: `Detalle posicion ${i} falta mandar idMesa`,
                          ['tipo']: 2
                      })
                  }
              }
              if ( Object.keys(body.detalle).length == i) {
                let correcto = true;
                for (let elem of locals.detalles) {
                    if (elem.tipo == 2){
                        correcto = false
                    }
                }
                if (correcto) {
                    locals['title'] = 'Registros actualizados correctamente';
                    locals['tipo'] = 1;
                } else {
                    locals['title'] = 'Algunos registros no fueron actualizados';
                    locals['tipo'] = 2;
                }
                res.json(locals);
            }
            i += 1;
          }
      }
  });
};

ReservaController.editarComensal = (req, res) => {
  let locals = { detalles: [] };
  let body = req.body;
  ReservaModelo.findOne({
    where: {
    [idtable]: body[idtable] },
    attributes: attributes.reserva,
    include: [
        {
          model: UsuarioModelo,
          attributes: attributes.usuario,
        },
        {
          model: ReservaEstadoModelo,
          where: { fechaYHoraBajaReservaEstado: null },
          attributes: attributes.reservaestado,
          include: [
              {
              model: EstadoReservaModelo,
              attributes: attributes.estadoreserva
              }
          ]
        },
        {
          model: DetalleReservaMesaModelo,
          attributes: attributes.precioreserva,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
        ]
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
          include: [
            {
              model: UsuarioModelo,
              attributes: attributes.usuario,
            },
          ]
        },
    ],
    }).then( async response => {
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
    res.json(locals);
  } else {
    let i = 1;
    for ( let elem of body.detalle ) {
        if ( elem[idtable6] ) {
            if ( elem['baja'] == true ) {
                await ComensalModelo.destroy({where: {[idtable6]: elem[idtable6]}}).then((resp) => {
                    if(!resp || resp == 0) {
                        locals.detalles.push({
                            ['title']: `Comensal NO eliminado con ${[idtable6]} = ${elem[[idtable6]]}`,
                            ['tipo']: 2
                        })
                    } else {
                        locals.detalles.push({
                            ['title']: `Comensal eliminado con ${[idtable6]} = ${elem[[idtable6]]}`,
                            ['tipo']: 1
                        })
                    }
                })
            } else {
              await ComensalModelo.update(elem, {where: {[idtable6]: elem[idtable6]}}).then((resp) => {
                  if(!resp || resp == 0) {
                      locals.detalles.push({
                          ['title']: `Comensal NO editado con ${[idtable6]} = ${elem[[idtable6]]}`,
                          ['tipo']: 2
                      })
                  } else {
                      locals.detalles.push({
                          ['title']: `Comensal editado con ${[idtable6]} = ${elem[[idtable6]]}`,
                          ['tipo']: 1
                      })
                  }
              })
          }
        } else {
          elem[idtable] = body[idtable];
          await ComensalModelo.findOne({ where: { [idtable]: elem[idtable] , aliasComensal: elem['aliasComensal'] }}).then( async (Comensal) => {
            if(!Comensal || Comensal == 0) {
              await ComensalModelo.create(elem).then((resp) => {
                if(!resp || resp == 0) {
                    locals.detalles.push({
                        ['title']: `Comensal NO creado: ${elem[idtable6]}`,
                        ['tipo']: 2
                    })
                } else {
                    locals.detalles.push({
                        ['title']: `Comensal creado: ${elem[idtable6]}`,
                        ['tipo']: 1
                    })
                }
              }).catch((error) => {
                locals = tratarError.tratarError(error, legend);
                res.json(locals);
              });
            } else {
              locals.detalles.push({
                ['title']: `Ya existe ${legend6} con id ${idtable6}`,
                ['tipo']: 2
              })
            }
          })
        }
        if ( Object.keys(body.detalle).length == i) {
          let correcto = true;
          for (let elem of locals.detalles) {
              if (elem.tipo == 2){
                  correcto = false
              }
          }
          if (correcto) {
              locals['title'] = 'Registros actualizados correctamente';
              locals['tipo'] = 1;
          } else {
              locals['title'] = 'Algunos registros no fueron actualizados';
              locals['tipo'] = 2;
          }
          res.json(locals);
      }
      i += 1;
      }
    }
  });
};

ReservaController.getToComensal = (req, res) => {
  let locals = { detalles: [] };
  let params = req.params;
  let body = req.body;
  ComensalModelo.findAll({
    where: { idUsuario: params.idUsuario, [Op.and]: [{ idReserva: {[Op.ne]: null } }, { idEstadia: {[Op.eq]: null } }] },
    attributes: attributes.comensalAll
  }).then( async project => {
    if (!project || project == 0) {
      locals['title'] = "No existe ningun registro con Usuario : " + params.idUsuario;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      for ( let item of project ) {
        let reserva = {};
        await ReservaModelo.findOne({
          where: { [idtable]: item[idtable] },
          attributes: attributes.reserva,
          include: [
            {
              model: ReservaEstadoModelo,
              where: { fechaYHoraBajaReservaEstado: null },
              attributes: attributes.reservaestado,
              include: [
                  {
                  model: EstadoReservaModelo,
                  where: { nombreEstadoReserva:  body.estado },
                  attributes: attributes.estadoreserva
                  }
              ]
            },
          ],
        }).then( async reservaTraida => {
          if (!reservaTraida || reservaTraida == 0) {
            reserva['title'] = `No existe registro con id: ${item[idtable]}.`;
            reserva['tipo'] = 2;
          } else {
            reserva['title'] = `${legend}`;
            reserva['data'] = reservaTraida;
            reserva['tipo'] = 1;
          }
          locals.detalles.push(reserva);
        });
      }
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
      res.json(locals);
    }
  });
};

module.exports = ReservaController;