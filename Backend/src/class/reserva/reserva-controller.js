"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  ReservaModelo = require("./reserva-model"),
  ReservaController = () => { },
  attributes = require('../attributes'),
  UsuarioModelo = require("../usuario/usuario-model"),
  ReservaEstadoModelo = require("../reservaestado/reservaestado-model"),
  EstadoReservaModelo = require("../estadoreserva/estadoreserva-model"),
  DetalleReservaMesaModelo = require("../detallereservamesa/detallereservamesa-model"),
  MesaModelo = require("../mesa/mesa-model"),
  PedidoModelo = require("../pedido/pedido-model"),
  ComensalModelo = require("../comensal/comensal-model"),
  
  legend = "Reserva",
  legend2 = "ReservaEstado",
  legend3 = "EstadoReserva",
  legend4 = "Mesa",
  legend5 = "Usuario",
  legend6 = "Comensal",
  legend7 = "DetalleReservaMesa",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
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
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
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
            pushReservaEstado['fechaYHoraAltaReservaEstado'] = new Date();
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
            pushReservaEstado['fechaYHoraBajaReservaEstado'] = new Date();
              ReservaEstadoModelo.update(pushReservaEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaReservaEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaReservaEstado'] = new Date();
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
  var locals = { };
  let inform;
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
      if(!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${idtable}.`;
          locals['tipo'] = 2;
          res.json(locals);
      } else {
          let i = 0;
          inform = {};
          locals['detalle'] = [];
          for ( let elem of body.detalle ) {
              if ( elem['idDetalleReservaMesa'] ) {
                  if ( elem['baja'] == true ) {
                      console.log("BORRAR   :---------------------------")
                      DetalleReservaMesaModelo.destroy({where: {[idtable7]: elem[idtable7]}}).then((resp) => {
                          if(!resp || resp == 0) {
                              inform = {
                                  ['title']: `Detalle NO eliminado con ${[idtable7]} = ${elem[[idtable7]]}.`,
                                  ['tipo']: 2
                              }
                          } else {
                              inform = {
                                  ['title']: `Detalle eliminado con ${[idtable7]} = ${elem[[idtable7]]}.`,
                                  ['tipo']: 1
                              }
                          }
                          locals['detalle'][i] = inform;
                        console.log("BORRAR   :---------------------------", locals.detalle)
                      })
                  } 
              } else {
                  elem[idtable] = body[idtable];
                  if ( elem[idtable4] != null ) {
                      MesaModelo.findOne({ where: {[idtable4]: elem[idtable4]}}).then((mesa) => {
                          if(!mesa || mesa == 0) {
                              inform = {
                                  ['title']: `No existe ${legend4} con id ${idtable4}.`,
                                  ['tipo']: 2
                              }
                              locals['detalle'][i] = inform;
                              console.log("CREAR  : +++++++++++++++++++++++++++++", locals.detalle)
                          } else {
                            DetalleReservaMesaModelo.findOne({ where: { [idtable4]: elem[idtable4] ,  [idtable]: body[idtable] }}).then((detallereservamesa) => {
                              if(!detallereservamesa || detallereservamesa == 0) {
                                DetalleReservaMesaModelo.create(elem).then((resp) => {
                                  console.log("CREAR  : +++++++++++++++++++++++++++++", locals.detalle)
                                  if(!resp || resp == 0) {
                                      inform = {
                                          ['title']: `Detalle NO creado: ${elem[idtable4]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                          ['tipo']: 2
                                      }
                                  } else {
                                      inform = {
                                          ['title']: `Detalle creado: ${elem[idtable4]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                          ['tipo']: 1
                                      }
                                  }
                                  locals['detalle'][i] = inform;
                              console.log("CREAR   :---------------------------",locals.detalle)
                                })
                              } else {
                                inform = {
                                  ['title']: `No existe ${legend4} con id ${idtable4}.`,
                                  ['tipo']: 2
                              }
                              console.log("Ya Existe -----------------")
                              locals['detalle'][i] = inform;
                              console.log("CREAR   :---------------------------",locals.detalle)
                              }
                            })
                          }
                      })
                  } else {
                      inform = {
                          ['title']: `Detalle posicion ${i} falta mandar idMesa.`,
                          ['tipo']: 2
                      }
                    locals['detalle'][i] = inform;
                      console.log("Falta  idMesa  : +++++++++++++++++++++++++++++",locals.detalle)
                  }
              }
              if ( Object.keys(body.detalle).length == (i+1)) {
                  locals['title'] = 'Registros actualizados.';
                  res.json(locals);
              }
              i += 1;
          }
      }
  });
};

ReservaController.editarPedido = (req, res) => {
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
        if (!body[idtable4]) {
          locals['title'] = `No se envia ${legend4}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
          MesaModelo.findOne({where: { [idtable4]: body[idtable4] }}).then((tipomoneda) =>{
            if(!tipomoneda || tipomoneda == 0) {
              locals['title'] = `No existe ${legend4} con id ${idtable4}.`;
              locals['tipo'] = 2;
              res.json(locals);
            } else {
              let pushPrecioProducto = {};
              pushPrecioProducto['fechaYHoraHastaPrecioProducto'] = new Date();
                DetalleReservaMesaModelo.update(pushPrecioProducto , {
                  where: { [idtable]: body[idtable], fechaYHoraHastaPrecioProducto: null }
              }).then((respons) => {
                if(!respons || respons == 0) {
                  locals['title'] = `No existe ${legend2} habilitado.`;
                  locals['tipo'] = 2;
                  res.json(locals);
                } else {
                  body['fechaYHoraDesdePrecioProducto'] = new Date();
                  DetalleReservaMesaModelo.create(body).then((resp) => {
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

ReservaController.editarComensal = (req, res) => {
let locals = {};
let inform;
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
      locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
      locals['tipo'] = 2;
    res.json(locals);
  } else {
    let i = 0;
    inform = {};
    locals['detalle'] = [];
    for ( let elem of body.detalle ) {
        if ( elem[idtable6] ) {
            if ( elem['baja'] == true ) {
                ComensalModelo.destroy({where: {[idtable6]: elem[idtable6]}}).then((resp) => {
                    if(!resp || resp == 0) {
                        inform = {
                            ['title']: `Comensal NO eliminado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                            ['tipo']: 2
                        }
                    } else {
                        inform = {
                            ['title']: `Comensal eliminado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                            ['tipo']: 1
                        }
                    }
                    locals['detalle'][i] = inform;
                  console.log("BORRAR   :---------------------------", locals.detalle)
                })
            } else {
              ComensalModelo.update(elem, {where: {[idtable6]: elem[idtable6]}}).then((resp) => {
                  if(!resp || resp == 0) {
                      inform = {
                          ['title']: `Comensal NO editado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                          ['tipo']: 2
                      }
                  } else {
                      inform = {
                          ['title']: `Comensal editado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                          ['tipo']: 1
                      }
                  }
                  locals['detalle'][i] = inform;
                  console.log("EDITAR   :---------------------------",locals.detalle)
              })
          }
        } else {
          elem[idtable] = body[idtable];
          ComensalModelo.findOne({ where: { [idtable]: elem[idtable] , aliasComensal: elem['aliasComensal'] }}).then((Comensal) => {
            if(!Comensal || Comensal == 0) {
              ComensalModelo.create(elem).then((resp) => {
                if(!resp || resp == 0) {
                    inform = {
                        ['title']: `Comensal NO creado: ${elem[idtable6]}.`,
                        ['tipo']: 2
                    }
                } else {
                    inform = {
                        ['title']: `Comensal creado: ${elem[idtable6]}.`,
                        ['tipo']: 1
                    }
                }
                locals['detalle'][i] = inform;
              console.log("CREAR   :---------------------------",locals.detalle)
              }).catch((error) => {
                locals = tratarError.tratarError(error, legend);
                res.json(locals);
              });
            } else {
              inform = {
                ['title']: `Ya existe ${legend6} con id ${idtable6}.`,
                ['tipo']: 2
              }
              locals['detalle'][i] = inform;
              console.log("CREAR   :---------------------------",locals.detalle)
            }
          })
        }

        if ( Object.keys(body.detalle).length == (i+1)) {
    console.log("BORRAR   :---------------------------")

            locals['title'] = 'Registros actualizados.';
            res.json(locals);
        }
        i += 1;
      }
    }
  });
};

module.exports = ReservaController;

// "detallereservamesas": [],
// "pedidos": [],
// "comensals": [