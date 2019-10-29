"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  EstadiaModelo = require("./estadia-model"),
  EstadiaController = () => { },
  attributes = require('../attributes'),
  UsuarioModelo = require("../usuario/usuario-model"),
  EstadiaEstadoModelo = require("../estadiaestado/estadiaestado-model"),
  EstadoEstadiaModelo = require("../estadoestadia/estadoestadia-model"),
  DetalleEstadiaMesaModelo = require("../detalleestadiamesa/detalleestadiamesa-model"),
  MesaModelo = require("../mesa/mesa-model"),
  PedidoModelo = require("../pedido/pedido-model"),
  ComensalModelo = require("../comensal/comensal-model"),
  ClienteEstadiaModelo = require("../clienteestadia/clienteestadia-model"),
  MozoEstadiaModelo = require("../mozoestadia/mozoestadia-model"),
  ReservaModelo = require("../reserva/reserva-model"),
  
  legend = "Estadia",
  legend2 = "EstadiaEstado",
  legend3 = "EstadoEstadia",
  legend4 = "Mesa",
  legend5 = "Usuario",
  legend6 = "Comensal",
  legend7 = "DetalleEstadiaMesa",
  legend8 = "Pedido",
  legend9 = "MozoEstadia",
  legend10 = "ClienteEstadia",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
  idtable8 = `id${legend8}`,
  idtable9 = `id${legend9}`,
  idtable10 = `id${legend9}`,

  nombretable = `id${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

EstadiaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  EstadiaModelo.findAll({
    where: {
      [Op.or]: [
        {idEstadia: {[Op.eq]: req.params.anyAttribute}},
        {idReserva: {[Op.eq]: req.params.anyAttribute}},
        Sequelize.literal("`estadiaestados->estadoestadium`.`nombreEstadoEstadia` LIKE '%" + req.params.anyAttribute + "%'"),
      ]
    },
    attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
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

EstadiaController.getToName = (req, res, next) => {
  let locals = {};
  console.log(req.params)
  EstadiaModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
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

EstadiaController.getAll = (req, res) => {
  let locals = {};
  EstadiaModelo.findAll({ 
    attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
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

EstadiaController.getOne = (req, res) => {
  let locals = {};
  EstadiaModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
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

EstadiaController.create = (req, res) => {
  let body = req.body;
  let locals = {};
  EstadoEstadiaModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
    if ( !responses || responses == 0 ) {
      locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      MozoEstadiaModelo.findOne({ where: {[idtable9]: body[idtable9]} }).then( mozoestadia => {
        if ( !mozoestadia || mozoestadia == 0 ) {
          locals['title'] = `No existe instancia de ${legend9} con ${idtable9}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
            if (body['fechaYHoraInicioEstadia'] == null) {
              body['fechaYHoraInicioEstadia'] = new Date();
            } 
            EstadiaModelo.create(body).then(result => {
            locals['title'] = `${legend} creada.`;
            locals['data'] = result;
            locals['id'] = result[idtable];
            locals['tipo'] = 1;
            let pushEstadiaEstado = {};
            pushEstadiaEstado['descripcionEstadiaEstado'] = body['descripcionEstadiaEstado'] || "Reciente.";
            pushEstadiaEstado[idtable] = result[idtable];
            pushEstadiaEstado['fechaYHoraAltaEstadiaEstado'] = new Date();
            pushEstadiaEstado[idtable3] = 1;
                EstadiaEstadoModelo.create(pushEstadiaEstado).then( response => {
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

EstadiaController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
  EstadiaModelo.findOne({
    where: { [idtable]: body[idtable] },
    attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
    ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
      EstadiaModelo.update(body, {where: { [idtable]: body[idtable]}}).then(result => {
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

EstadiaController.cambiarEstado = (req, res) => {
  let locals = {};
  let body = req.body;
  EstadiaModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.estadia,
    include: [
      {
        model: EstadiaEstadoModelo,
        where: { fechaYHoraBajaEstadiaEstado: null },
        attributes: attributes.estadiaestado,
        include: [
            {
            model: EstadoEstadiaModelo,
            attributes: attributes.estadoestadia
            }
        ]
      },
      {
        model: DetalleEstadiaMesaModelo,
        attributes: attributes.detalleestadiamesa,
        include: [
          {
              model: MesaModelo,
              attributes: attributes.mesa
          }
        ]
      },
      {
        model: ReservaModelo,
        attributes: attributes.reserva,
      },
      {
        model: PedidoModelo,
        attributes: attributes.pedido,
      },
      {
        model: ComensalModelo,
        attributes: attributes.comensal,
      },
      {
        model: ClienteEstadiaModelo,
        attributes: attributes.clienteestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
      },
      {
        model: MozoEstadiaModelo,
        attributes: attributes.mozoestadia,
        include: [
          {
              model: UsuarioModelo,
              attributes: attributes.usuario
          }
        ]
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
        if (response.dataValues.estadiaestados[0].dataValues.estadoestadium[idtable3] != body[idtable3]) {
        EstadoEstadiaModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadoestadia) =>{
          if(!estadoestadia || estadoestadia == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushEstadiaEstado = {};
            pushEstadiaEstado['fechaYHoraBajaEstadiaEstado'] = new Date();
              EstadiaEstadoModelo.update(pushEstadiaEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaEstadiaEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaEstadiaEstado'] = new Date();
                EstadiaEstadoModelo.create(body).then((resp) => {
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

EstadiaController.editarMesa = (req, res) => {
  var locals = { };
  let inform;
  let body = req.body;
  EstadiaModelo.findOne({
      where: {
      [idtable]: body[idtable] },
      attributes: attributes.estadia,
      include: [
        {
          model: EstadiaEstadoModelo,
          where: { fechaYHoraBajaEstadiaEstado: null },
          attributes: attributes.estadiaestado,
          include: [
              {
              model: EstadoEstadiaModelo,
              attributes: attributes.estadoestadia
              }
          ]
        },
        {
          model: DetalleEstadiaMesaModelo,
          attributes: attributes.detalleestadiamesa,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
          ]
        },
        {
          model: ReservaModelo,
          attributes: attributes.reserva,
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
        },
        {
          model: ClienteEstadiaModelo,
          attributes: attributes.clienteestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
        },
        {
          model: MozoEstadiaModelo,
          attributes: attributes.mozoestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
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
              if ( elem['idDetalleEstadiaMesa'] ) {
                  if ( elem['baja'] == true ) {
                      console.log("BORRAR   :---------------------------")
                      DetalleEstadiaMesaModelo.destroy({where: {[idtable7]: elem[idtable7]}}).then((resp) => {
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
                            DetalleEstadiaMesaModelo.findOne({ where: { [idtable4]: elem[idtable4] ,  [idtable]: body[idtable] }}).then((detalleestadiamesa) => {
                              if(!detalleestadiamesa || detalleestadiamesa == 0) {
                                DetalleEstadiaMesaModelo.create(elem).then((resp) => {
                                  console.log("CREAR  : +++++++++++++++++++++++++++++", locals.detalle)
                                  if(!resp || resp == 0) {
                                      inform = {
                                          ['title']: `Detalle NO creado: ${elem[idtable4]}.`,
                                          ['tipo']: 2
                                      }
                                  } else {
                                      inform = {
                                          ['title']: `Detalle creado: ${elem[idtable4]}.`,
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

EstadiaController.editarComensal = (req, res) => {
let locals = {};
let inform;
let body = req.body;
  EstadiaModelo.findOne({
    where: {
    [idtable]: body[idtable] },
    attributes: attributes.estadia,
      include: [
        {
          model: EstadiaEstadoModelo,
          where: { fechaYHoraBajaEstadiaEstado: null },
          attributes: attributes.estadiaestado,
          include: [
              {
              model: EstadoEstadiaModelo,
              attributes: attributes.estadoestadia
              }
          ]
        },
        {
          model: DetalleEstadiaMesaModelo,
          attributes: attributes.detalleestadiamesa,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
          ]
        },
        {
          model: ReservaModelo,
          attributes: attributes.reserva,
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
        },
        {
          model: ClienteEstadiaModelo,
          attributes: attributes.clienteestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
        },
        {
          model: MozoEstadiaModelo,
          attributes: attributes.mozoestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
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

EstadiaController.editarClienteEstadia = (req, res) => {
  var locals = { };
  let inform;
  let body = req.body;
  EstadiaModelo.findOne({
      where: {
      [idtable]: body[idtable] },
      attributes: attributes.estadia,
      include: [
        {
          model: EstadiaEstadoModelo,
          where: { fechaYHoraBajaEstadiaEstado: null },
          attributes: attributes.estadiaestado,
          include: [
              {
              model: EstadoEstadiaModelo,
              attributes: attributes.estadoestadia
              }
          ]
        },
        {
          model: DetalleEstadiaMesaModelo,
          attributes: attributes.detalleestadiamesa,
          include: [
            {
                model: MesaModelo,
                attributes: attributes.mesa
            }
          ]
        },
        {
          model: ReservaModelo,
          attributes: attributes.reserva,
        },
        {
          model: PedidoModelo,
          attributes: attributes.pedido,
        },
        {
          model: ComensalModelo,
          attributes: attributes.comensal,
        },
        {
          model: ClienteEstadiaModelo,
          attributes: attributes.clienteestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
        },
        {
          model: MozoEstadiaModelo,
          attributes: attributes.mozoestadia,
          include: [
            {
                model: UsuarioModelo,
                attributes: attributes.usuario
            }
          ]
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
              if ( elem['idClienteEstadia'] ) {
                  if ( elem['baja'] == true ) {
                      console.log("BORRAR   :---------------------------")
                      ClienteEstadiaModelo.destroy({where: {[idtable10]: elem[idtable10]}}).then((resp) => {
                          if(!resp || resp == 0) {
                              inform = {
                                  ['title']: `Detalle NO eliminado con ${[idtable10]} = ${elem[[idtable10]]}.`,
                                  ['tipo']: 2
                              }
                          } else {
                              inform = {
                                  ['title']: `Detalle eliminado con ${[idtable10]} = ${elem[[idtable10]]}.`,
                                  ['tipo']: 1
                              }
                          }
                           locals['detalle'][i] = inform;
                        console.log("BORRAR   :---------------------------", locals.detalle)
                      })
                  } 
              } else {
                  elem[idtable] = body[idtable];
                  if ( elem[idtable5] != null ) {
                      UsuarioModelo.findOne({ where: {[idtable5]: elem[idtable5]}}).then((mesa) => {
                          if(!mesa || mesa == 0) {
                              inform = {
                                  ['title']: `No existe ${legend5} con id ${idtable5}.`,
                                  ['tipo']: 2
                              }
                              locals['detalle'][i] = inform;
                              console.log("CREAR  : +++++++++++++++++++++++++++++", locals.detalle)
                          } else {
                            ClienteEstadiaModelo.findOne({ where: { [idtable5]: elem[idtable5] ,  [idtable]: body[idtable] }}).then((clienteestadia) => {
                              if(!clienteestadia || clienteestadia == 0) {
                                ClienteEstadiaModelo.create(elem).then((resp) => {
                                  console.log("CREAR  : +++++++++++++++++++++++++++++", locals.detalle)
                                  if(!resp || resp == 0) {
                                      inform = {
                                          ['title']: `Detalle NO creado: ${elem[idtable5]}.`,
                                          ['tipo']: 2
                                      }
                                  } else {
                                      inform = {
                                          ['title']: `Detalle creado: ${elem[idtable5]}.`,
                                          ['tipo']: 1
                                      }
                                  }
                                  locals['detalle'][i] = inform;
                              console.log("CREAR   :---------------------------",locals.detalle)
                                })
                              } else {
                                inform = {
                                  ['title']: `No existe ${legend5} con id ${idtable5}.`,
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

module.exports = EstadiaController;
