"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  PagoModelo = require("./pago-model"),
  PagoController = () => { },
  attributes = require('../attributes'),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  PagoPedidoModelo = require("../pagopedido/pagopedido-model"),
  PedidoModelo = require("../pedido/pedido-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  ComensalModelo = require("../comensal/comensal-model"),
  MedioPagoModelo = require("../mediopago/mediopago-model"),

  legend = "Pago",
  legend2 = "PagoPedido",
  legend3 = "Pedido",
  legend4 = "MedioPago",
  legend5 = "Comensal",
  legend6 = "UnidadMedida",
  legend7 = "PrecioProducto",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  nombretable = `cod${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

PagoController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  console.log("aaa", req.params)
  PagoModelo.findAll({
    where: {
      [Op.or]: [
        {codPago: {[Op.substring]: req.params.anyAttribute}},
        {idPago: {[Op.substring]: req.params.anyAttribute}},
        Sequelize.literal("`mediopago`.`nombreMedioPago` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`comensal`.`aliasComensal` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`pagopedidos->pedido`.`codPedido` LIKE '%" + req.params.anyAttribute + "%'"),
      ]
    },
    attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
      },
    ],
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe registro con valor : ${req.params['anyAttribute']}.`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

PagoController.getToName = (req, res, next) => {
  let locals = {};
  PagoModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
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

PagoController.getAll = (req, res) => {
  let locals = {};
  PagoModelo.findAll({ 
    attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
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

PagoController.getOne = (req, res) => {
  let locals = {};
  PagoModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
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

PagoController.create = (req, res) => {
  let body = req.body;
  let locals = {};
  MedioPagoModelo.findOne({ where: {[idtable4]: body[idtable4] } }).then( responses => {
    if ( !responses || responses == 0 ) {
      locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      ComensalModelo.findOne({ where: {[idtable5]: body[idtable5]} }).then( tipomoneda => {
        if ( !tipomoneda || tipomoneda == 0 ) {
          locals['title'] = `No existe instancia de ${legend5} con ${idtable5}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
            PagoModelo.create(body).then(result => {
                locals['title'] = `${legend} creada.`;
                locals['data'] = result;
                locals['id'] = result[idtable];
                locals['tipo'] = 1;
                res.json(locals);
            }).catch((error) => {
            locals = tratarError.tratarError(error, legend);
            res.json(locals);
            });
        }
      })
    }
  })
};

PagoController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
  PagoModelo.findOne({
    where: { [idtable]: body[idtable] },
    attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
      },
    ],
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
      PagoModelo.update(body, {
          where: { [idtable]: body[idtable]}
      }).then(result => {
        if (!result || result == 0) {
          locals['title'] = `No se Actualizo ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
          locals['title'] = `Se Actualizo ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 1;
          res.json(locals);
        }
      }).catch((error) => {
        locals = tratarError.tratarError(error, legend);
        res.json(locals);
      });
    }
  });
};

PagoController.editarPagoPedido = (req, res) => {
  let locals = {};
  let body = req.body;
  PagoModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.pago,
        include: [
        {
        model: ComensalModelo,
        attributes: attributes.comensal,
        },
        {
            model: PagoPedidoModelo,
            attributes: attributes.pagopedido,
            include: [
                {
                model: PedidoModelo,
                attributes: attributes.pedido
                }
            ]
        },
        {
            model: MedioPagoModelo,
            attributes: attributes.mediopago,
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
        PedidoModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadoproducto) =>{
          if(!estadoproducto || estadoproducto == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushPagoPedido = {};
            pushPagoPedido['fechaYHoraBajaPagoPedido'] = new Date();
              PagoPedidoModelo.update(pushPagoPedido , {
                where: { [idtable]: body[idtable], fechaYHoraBajaPagoPedido: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaPagoPedido'] = new Date();
                PagoPedidoModelo.create(body).then((resp) => {
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

PagoController.editarPagoPedido2 = (req, res) => {
  let locals = {};
  let body = req.body;
  PagoModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.pago,
    include: [
      {
      model: ComensalModelo,
      attributes: attributes.comensal,
      },
      {
        model: PagoPedidoModelo,
        attributes: attributes.pagopedido,
        include: [
            {
            model: PedidoModelo,
            attributes: attributes.pedido
            }
        ]
      },
      {
        model: MedioPagoModelo,
        attributes: attributes.mediopago,
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
        TipoMonedaModelo.findOne({where: { [idtable4]: body[idtable4] }}).then((tipomoneda) =>{
          if(!tipomoneda || tipomoneda == 0) {
            locals['title'] = `No existe ${legend4} con id ${idtable4}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushPrecioProducto = {};
            pushPrecioProducto['fechaYHoraHastaPrecioProducto'] = new Date();
              PrecioProductoModelo.update(pushPrecioProducto , {
                where: { [idtable]: body[idtable], fechaYHoraHastaPrecioProducto: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraDesdePrecioProducto'] = new Date();
                PrecioProductoModelo.create(body).then((resp) => {
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

module.exports = PagoController;