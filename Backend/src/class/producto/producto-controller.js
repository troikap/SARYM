"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  ProductoModelo = require("./producto-model"),
  ProductoController = () => { },
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  MenuPromocionModelo = require("../menupromocion/menupromocion-model"),
  MenuPromocionEstadoModelo = require("../menupromocionestado/menupromocionestado-model"),
  EstadoMenuPromocionModelo = require("../estadomenupromocion/estadomenupromocion-model"),
  DetalleMenuPromocionProductoModelo = require("../detallemenupromocionproducto/detallemenupromocionproducto-model"),

  legend = "Producto",
  legend2 = "ProductoEstado",
  legend3 = "EstadoProducto",
  legend4 = "TipoMoneda",
  legend5 = "Rubro",
  legend6 = "UnidadMedida",
  legend7 = "PrecioProducto",
  legend8 = "MenuPromocion",
  legend9 = "MenuPromocionEstado",
  legend10 = "EstadoMenuPromocion",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
  idtable8 = `id${legend8}`,
  idtable9 = `id${legend9}`,

  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

ProductoController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  ProductoModelo.findAll({
    where: {
      [Op.or]: [
        {codProducto: {[Op.substring]: req.params.anyAttribute}},
        {idProducto: {[Op.substring]: req.params.anyAttribute}},
        {nombreProducto: {[Op.substring]: req.params.anyAttribute}},
        Sequelize.literal("`rubro`.`nombreRubro` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`unidadmedida`.`nombreUnidadMedida` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`productoestados->estadoproducto`.`nombreEstadoProducto` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`precioproductos->tipomoneda`.`nombreTipoMoneda` LIKE '%" + req.params.anyAttribute + "%'"),
      ]
    },
    attributes: attributes.producto,
    include: [
      {
      model: RubroModelo,
      attributes: attributes.rubro,
      },
      {
      model: UnidadMedidaModelo,
      attributes: attributes.unidadmedida,
      },
      {
        model: ProductoEstadoModelo,
        where: { fechaYHoraBajaProductoEstado: null },
        attributes: attributes.productoestado,
        include: [
            {
            model: EstadoProductoModelo,
            attributes: attributes.estadoproducto
            }
        ]
      },
      {
        model: PrecioProductoModelo,
        where: { fechaYHoraHastaPrecioProducto: null },
        attributes: attributes.precioproducto,
        include: [
          {
              model: TipoMonedaModelo,
              attributes: attributes.tipomoneda
          }
        ]
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

ProductoController.getToName = (req, res, next) => {
  let locals = {};
  ProductoModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.producto,
    include: [
      {
      model: RubroModelo,
      attributes: attributes.rubro,
      },
      {
      model: UnidadMedidaModelo,
      attributes: attributes.unidadmedida,
      },
      {
        model: ProductoEstadoModelo,
        where: { fechaYHoraBajaProductoEstado: null },
        attributes: attributes.productoestado,
        include: [
            {
            model: EstadoProductoModelo,
            attributes: attributes.estadoproducto
            }
        ]
      },
      {
        model: PrecioProductoModelo,
        where: { fechaYHoraHastaPrecioProducto: null },
        attributes: attributes.precioproducto,
        include: [
          {
              model: TipoMonedaModelo,
              attributes: attributes.tipomoneda
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

ProductoController.getAll = (req, res) => {
  let locals = {};
  ProductoModelo.findAll({ 
    attributes: attributes.producto,
    include: [
      {
      model: RubroModelo,
      attributes: attributes.rubro,
      },
      {
      model: UnidadMedidaModelo,
      attributes: attributes.unidadmedida,
      },
      {
        model: ProductoEstadoModelo,
        where: { fechaYHoraBajaProductoEstado: null },
        attributes: attributes.productoestado,
        include: [
            {
            model: EstadoProductoModelo,
            attributes: attributes.estadoproducto
            }
        ]
      },
      {
        model: PrecioProductoModelo,
        where: { fechaYHoraHastaPrecioProducto: null },
        attributes: attributes.precioproducto,
        include: [
          {
              model: TipoMonedaModelo,
              attributes: attributes.tipomoneda
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

ProductoController.getOne = (req, res) => {
  let locals = {};
  ProductoModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.producto,
    include: [
      {
      model: RubroModelo,
      attributes: attributes.rubro,
      },
      {
      model: UnidadMedidaModelo,
      attributes: attributes.unidadmedida,
      },
      {
        model: ProductoEstadoModelo,
        where: { fechaYHoraBajaProductoEstado: null },
        attributes: attributes.productoestado,
        include: [
            {
            model: EstadoProductoModelo,
            attributes: attributes.estadoproducto
            }
        ]
      },
      {
        model: PrecioProductoModelo,
        where: { fechaYHoraHastaPrecioProducto: null },
        attributes: attributes.precioproducto,
        include: [
          {
              model: TipoMonedaModelo,
              attributes: attributes.tipomoneda
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

ProductoController.create = (req, res) => {
  let body = req.body;
  let locals = {};
  EstadoProductoModelo.findOne({ where: {[idtable3]: 3 } }).then( responses => {
    if ( !responses || responses == 0 ) {
      locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      TipoMonedaModelo.findOne({ where: {[idtable4]: body[idtable4]} }).then( tipomoneda => {
        if ( !tipomoneda || tipomoneda == 0 ) {
          locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
          RubroModelo.findOne({ where: {[idtable5]: body[idtable5]} }).then( rubro => {
            if ( !rubro || rubro == 0 ) {
              locals['title'] = `No existe instancia de ${legend5} con ${idtable5}.`;
              locals['tipo'] = 2;
              res.json(locals);
            } else {
              UnidadMedidaModelo.findOne({ where: {[idtable6]: body[idtable6]} }).then( unidadmedida => {
                if ( !unidadmedida || unidadmedida == 0 ) {
                  locals['title'] = `No existe instancia de ${legend6} con ${idtable6}.`;
                  locals['tipo'] = 2;
                  res.json(locals);
                } else {
                  ProductoModelo.create(body).then(result => {
                    locals['title'] = `${legend} creada.`;
                    locals['data'] = result;
                    locals['id'] = result[idtable];
                    locals['tipo'] = 1;
                    let pushProductoEstado = {};
                    pushProductoEstado['descripcionProductoEstado'] = body['descripcionProductoEstado'] || "Reciente.";
                    pushProductoEstado[idtable] = result[idtable];
                    pushProductoEstado['fechaYHoraAltaProductoEstado'] = fechaArgentina.getFechaArgentina();
                    pushProductoEstado[idtable3] = 3;
                    ProductoEstadoModelo.create(pushProductoEstado).then( response => {
                      locals['title'] = `${legend} creado. ${legend2} creado.`;
                      locals['data'] = response;
                      locals['tipo'] = 1;
                      let pushPrecioProducto = {};
                      pushPrecioProducto['importePrecioProducto'] = body['importePrecioProducto'];
                      pushPrecioProducto[idtable] = result[idtable];
                      pushPrecioProducto['fechaYHoraDesdePrecioProducto'] = body['fechaYHoraDesdePrecioProducto'] || fechaArgentina.getFechaArgentina();
                      pushPrecioProducto['fechaYHoraHastaPrecioProducto'] = body['fechaYHoraHastaPrecioProducto'] || null;
                      pushPrecioProducto[idtable4] = body[idtable4];
                      PrecioProductoModelo.create(pushPrecioProducto).then( resp => {
                        locals['title'] = `${legend} creado. ${legend7} creado.`;
                        locals['data'] = resp;
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
                  }).catch((error) => {
                    locals = tratarError.tratarError(error, legend);
                    res.json(locals);
                  });
                }
              });
            }
          });
        }
      })
    }
  })
};

ProductoController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
  ProductoModelo.findOne({
    where: { [idtable]: body[idtable] },
      attributes: attributes.producto,
      include: [
        {
        model: RubroModelo,
        attributes: attributes.rubro,
        },
        {
        model: UnidadMedidaModelo,
        attributes: attributes.unidadmedida,
        },
        {
          model: ProductoEstadoModelo,
          attributes: attributes.productoestado,
          include: [
              {
              model: EstadoProductoModelo,
              attributes: attributes.estadoproducto
              }
          ]
        },
        {
          model: PrecioProductoModelo,
          attributes: attributes.precioproducto,
          include: [
            {
                model: TipoMonedaModelo,
                attributes: attributes.tipomoneda
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
      ProductoModelo.update(body, {
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

ProductoController.cambiarEstado = (req, res) => {
  let locals = {};
  let body = req.body;
  ProductoModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.producto,
      include: [
        {
        model: RubroModelo,
        attributes: attributes.rubro,
        },
        {
        model: UnidadMedidaModelo,
        attributes: attributes.unidadmedida,
        },
        {
          model: ProductoEstadoModelo,
          where: { fechaYHoraBajaProductoEstado: null },
          attributes: attributes.productoestado,
          include: [
              {
              model: EstadoProductoModelo,
              attributes: attributes.estadoproducto
              }
          ]
        },
        {
          model: PrecioProductoModelo,
          where: { fechaYHoraHastaPrecioProducto: null },
          attributes: attributes.precioproducto,
          include: [
            {
                model: TipoMonedaModelo,
                attributes: attributes.tipomoneda
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
        EstadoProductoModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadoproducto) =>{
          if(!estadoproducto || estadoproducto == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushProductoEstado = {};
            pushProductoEstado['fechaYHoraBajaProductoEstado'] = fechaArgentina.getFechaArgentina();
              ProductoEstadoModelo.update(pushProductoEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaProductoEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaProductoEstado'] = fechaArgentina.getFechaArgentina();
                ProductoEstadoModelo.create(body).then((resp) => {
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

ProductoController.cambiarPrecio = (req, res) => {
  let locals = {};
  let body = req.body;
  ProductoModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.producto,
      include: [
        {
        model: RubroModelo,
        attributes: attributes.rubro,
        },
        {
        model: UnidadMedidaModelo,
        attributes: attributes.unidadmedida,
        },
        {
          model: ProductoEstadoModelo,
          where: { fechaYHoraBajaProductoEstado: null },
          attributes: attributes.productoestado,
          include: [
              {
              model: EstadoProductoModelo,
              attributes: attributes.estadoproducto
              }
          ]
        },
        {
          model: PrecioProductoModelo,
          where: { fechaYHoraHastaPrecioProducto: null },
          attributes: attributes.precioproducto,
          include: [
            {
                model: TipoMonedaModelo,
                attributes: attributes.tipomoneda
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
            pushPrecioProducto['fechaYHoraHastaPrecioProducto'] = fechaArgentina.getFechaArgentina();
              PrecioProductoModelo.update(pushPrecioProducto , {
                where: { [idtable]: body[idtable], fechaYHoraHastaPrecioProducto: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraDesdePrecioProducto'] = fechaArgentina.getFechaArgentina();
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

ProductoController.habilitarDeshabilitarProducto = (req, res) => {
  let locals = {};
  let body = req.body;
  ProductoModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.producto,
      include: [
        {
        model: RubroModelo,
        attributes: attributes.rubro,
        },
        {
        model: UnidadMedidaModelo,
        attributes: attributes.unidadmedida,
        },
        {
          model: ProductoEstadoModelo,
          where: { fechaYHoraBajaProductoEstado: null },
          attributes: attributes.productoestado,
          include: [
              {
              model: EstadoProductoModelo,
              attributes: attributes.estadoproducto
              }
          ]
        },
        {
          model: PrecioProductoModelo,
          where: { fechaYHoraHastaPrecioProducto: null },
          attributes: attributes.precioproducto,
          include: [
            {
                model: TipoMonedaModelo,
                attributes: attributes.tipomoneda
            }
          ]
        },
      ],
    }).then(response => {
      let estadoActual = response.productoestados[0].estadoproducto.dataValues.idEstadoProducto;
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      if ( estadoActual == 1) {
        body[idtable3] = 2
      } else if (estadoActual == 2) {
        body[idtable3] = 1
      } else {
        locals['title'] = `No se encuentra en estado valido para esta operacion`;
        locals['tipo'] = 2;
        res.json(locals);
      }
        EstadoProductoModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadoproducto) =>{
          if(!estadoproducto || estadoproducto == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushProductoEstado = {};
            pushProductoEstado['fechaYHoraBajaProductoEstado'] = fechaArgentina.getFechaArgentina();
              ProductoEstadoModelo.update(pushProductoEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaProductoEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaProductoEstado'] = fechaArgentina.getFechaArgentina();
                ProductoEstadoModelo.create(body).then((resp) => {
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
  });
};

module.exports = ProductoController;