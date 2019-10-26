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
//   legend6 = "UnidadMedida",
  legend7 = "DetalleReservaMesa",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
//   idtable6 = `id${legend6}`,
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
      locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
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

module.exports = ReservaController;

// "detallereservamesas": [],
// "pedidos": [],
// "comensals": [