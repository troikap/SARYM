"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  PedidoModelo = require("./pedido-model"),
  PedidoController = () => { },
  attributes = require('../attributes'),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  PedidoEstadoModelo = require("../pedidoestado/pedidoestado-model"),
  EstadoPedidoModelo = require("../estadopedido/estadopedido-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  PrecioMenuPromocionModelo = require("../preciomenupromocion/preciomenupromocion-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  TipoMenuPromocionModelo = require("../tipomenupromocion/tipomenupromocion-model"),
  DetalleMenuPromocionProductoModelo = require("../detallemenupromocionproducto/detallemenupromocionproducto-model"),
  ProductoModelo = require("../producto/producto-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  ComensalModelo = require("../comensal/comensal-model"),
 
  legend = "Pedido",
  legend2 = "PedidoEstado",
  legend3 = "EstadoPedido",
  legend4 = "TipoMoneda",
  legend5 = "TipoMenuPromocion",
  legend6 = "UnidadMedida",
  legend7 = "PrecioMenuPromocion",
  legend8 = "DetalleMenuPromocionProducto",
  legend9 = "Producto",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
  idtable8 = `id${legend8}`,
  idtable9 = `id${legend9}`,
  nombretable = `cod${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

PedidoController.getToAllAttributes = (req, res, next) => {
    let locals = {};
    PedidoModelo.findAll({
        where: {
        [Op.or]: [
            // {codMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            // {idMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            // {nombreMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            // Sequelize.literal("`tipomenupromocion`.`nombreTipoMenuPromocion` LIKE '%" + req.params.anyAttribute + "%'"),
            // Sequelize.literal("`menupromocionestados->estadomenupromocion`.`nombreEstadoMenuPromocion` LIKE '%" + req.params.anyAttribute + "%'"),
            // Sequelize.literal("`preciomenupromocions->tipomoneda`.`nombreTipoMoneda` LIKE '%" + req.params.anyAttribute + "%'"),
            // Sequelize.literal("`detallemenupromocionproductos->producto`.`nombreProducto` LIKE '%" + req.params.anyAttribute + "%'"),
        ]
    },
    attributes: attributes.pedido,
    include: [
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
        {
            model: PedidoEstadoModelo,
            attributes: attributes.pedidoestado,
            where: { fechaYHoraBajaPedidoEstado: null },
            include: [
                {
                    model: EstadoPedidoModelo,
                    attributes: attributes.estadopedido
                }
            ]
        }
    ]
    // attributes: attributes.menupromocion,
    // include: [
    //     {
    //         model: TipoMenuPromocionModelo,
    //         attributes: attributes.tipomenupromocion,
    //     },
    //     {
    //         model: MenuPromocionEstadoModelo,
    //         where: { fechaYHoraBajaMenuPromocionEstado: null },
    //         attributes: attributes.menupromocionestado,
    //         include: [
    //             {
    //             model: EstadoMenuPromocionModelo,
    //             attributes: attributes.estadomenupromocion
    //             }
    //         ]
    //     },
    //     {
    //         model: PrecioMenuPromocionModelo,
    //         where: { fechaYHoraHastaPrecioMenuPromocion: null },
    //         attributes: attributes.preciomenupromocion,
    //         include: [
    //             {
    //                 model: TipoMonedaModelo,
    //                 attributes: attributes.tipomoneda
    //             }
    //         ],
    //     },
    //     {
    //         model: DetalleMenuPromocionProductoModelo,
    //         attributes: attributes.detallemenupromocionproducto,
    //         include: [
    //             {
    //                 model: ProductoModelo,
    //                 attributes: attributes.producto,
    //                 include: [
    //                     {
    //                         model: RubroModelo,
    //                         attributes: attributes.rubro,
    //                     },
    //                     {
    //                         model: UnidadMedidaModelo,
    //                         attributes: attributes.unidadmedida,
    //                     },
    //                     {
    //                         model: ProductoEstadoModelo,
    //                         attributes: attributes.productoestado,
    //                         include: [
    //                             {
    //                                 model: EstadoProductoModelo,
    //                                 attributes: attributes.estadoproducto
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: PrecioProductoModelo,
    //                         attributes: attributes.precioproducto,
    //                         include: [
    //                             {
    //                                 model: TipoMonedaModelo,
    //                                 attributes: attributes.tipomoneda
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //     },
    // ],
    }).then(project => {
        if (!project || project == 0) {
            locals['title'] = "No existe ningun registro con la palabra : " + req.params.anyAttribute;
            locals['tipo'] = 2;
        } else {
            locals['title'] = `${legend}`;
            locals['tipo'] = 1;
            locals['data'] = project;
        }
        res.json(locals);
    });
};

PedidoController.getToName = (req, res, next) => {
    let locals = {};
    PedidoModelo.findAll({
        where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
        attributes: attributes.pedido,

        // attributes: attributes.menupromocion,
        // include: [
        //     {
        //         model: TipoMenuPromocionModelo,
        //         attributes: attributes.tipomenupromocion,
        //     },
        //     {
        //         model: MenuPromocionEstadoModelo,
        //         where: { fechaYHoraBajaMenuPromocionEstado: null },
        //         attributes: attributes.menupromocionestado,
        //         include: [
        //             {
        //             model: EstadoMenuPromocionModelo,
        //             attributes: attributes.estadomenupromocion
        //             }
        //         ]
        //     },
        //     {
        //         model: PrecioMenuPromocionModelo,
        //         where: { fechaYHoraHastaPrecioMenuPromocion: null },
        //         attributes: attributes.preciomenupromocion,
        //         include: [
        //             {
        //                 model: TipoMonedaModelo,
        //                 attributes: attributes.tipomoneda
        //             }
        //         ],
        //     },
        //     {
        //         model: DetalleMenuPromocionProductoModelo,
        //         attributes: attributes.detallemenupromocionproducto,
        //         include: [
        //             {
        //                 model: ProductoModelo,
        //                 attributes: attributes.producto,
        //                 include: [
        //                     {
        //                         model: RubroModelo,
        //                         attributes: attributes.rubro,
        //                     },
        //                     {
        //                         model: UnidadMedidaModelo,
        //                         attributes: attributes.unidadmedida,
        //                     },
        //                     {
        //                         model: ProductoEstadoModelo,
        //                         attributes: attributes.productoestado,
        //                         include: [
        //                             {
        //                                 model: EstadoProductoModelo,
        //                                 attributes: attributes.estadoproducto
        //                             }
        //                         ]
        //                     },
        //                     {
        //                         model: PrecioProductoModelo,
        //                         attributes: attributes.precioproducto,
        //                         include: [
        //                             {
        //                                 model: TipoMonedaModelo,
        //                                 attributes: attributes.tipomoneda
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ],
        //     },
        // ],
    }).then(project => {
      if (!project || project == 0) {
        locals['title'] = "No existe ningun registro valor : " + req.params[nombretable];
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
    });
  };

PedidoController.getAll = (req, res) => {
  let locals = {};
  PedidoModelo.findAll({ 
      attributes: attributes.pedido
    // attributes: attributes.menupromocion,
    // include: [
    //     {
    //         model: TipoMenuPromocionModelo,
    //         attributes: attributes.tipomenupromocion,
    //     },
    //     {
    //         model: MenuPromocionEstadoModelo,
    //         where: { fechaYHoraBajaMenuPromocionEstado: null },
    //         attributes: attributes.menupromocionestado,
    //         include: [
    //             {
    //             model: EstadoMenuPromocionModelo,
    //             attributes: attributes.estadomenupromocion
    //             }
    //         ]
    //     },
    //     {
    //         model: PrecioMenuPromocionModelo,
    //         where: { fechaYHoraHastaPrecioMenuPromocion: null },
    //         attributes: attributes.preciomenupromocion,
    //         include: [
    //             {
    //                 model: TipoMonedaModelo,
    //                 attributes: attributes.tipomoneda
    //             }
    //         ],
    //     },
    //     {
    //         model: DetalleMenuPromocionProductoModelo,
    //         attributes: attributes.detallemenupromocionproducto,
    //         include: [
    //             {
    //                 model: ProductoModelo,
    //                 attributes: attributes.producto,
    //                 include: [
    //                     {
    //                         model: RubroModelo,
    //                         attributes: attributes.rubro,
    //                     },
    //                     {
    //                         model: UnidadMedidaModelo,
    //                         attributes: attributes.unidadmedida,
    //                     },
    //                     {
    //                         model: ProductoEstadoModelo,
    //                         attributes: attributes.productoestado,
    //                         include: [
    //                             {
    //                                 model: EstadoProductoModelo,
    //                                 attributes: attributes.estadoproducto
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: PrecioProductoModelo,
    //                         attributes: attributes.precioproducto,
    //                         include: [
    //                             {
    //                                 model: TipoMonedaModelo,
    //                                 attributes: attributes.tipomoneda
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //     },
    // ],
  }).then(response => {
    if (!response || response == 0) {
        locals['title'] = `No existen registros de ${legend}`
        locals['tipo'] = 2;
    } else {
        locals['title'] = `${legend}/s encontrado/s`;
        locals['data'] = response;
        locals['tipo'] = 1;response;
    }
    res.json(locals)
  })
}

PedidoController.getOne = (req, res) => {
  let locals = {};
  PedidoModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.pedido
    // attributes: attributes.menupromocion,
    // include: [
    //     {
    //         model: TipoMenuPromocionModelo,
    //         attributes: attributes.tipomenupromocion,
    //     },
    //     {
    //         model: MenuPromocionEstadoModelo,
    //         where: { fechaYHoraBajaMenuPromocionEstado: null },
    //         attributes: attributes.menupromocionestado,
    //         include: [
    //             {
    //             model: EstadoMenuPromocionModelo,
    //             attributes: attributes.estadomenupromocion
    //             }
    //         ]
    //     },
    //     {
    //         model: PrecioMenuPromocionModelo,
    //         where: { fechaYHoraHastaPrecioMenuPromocion: null },
    //         attributes: attributes.preciomenupromocion,
    //         include: [
    //             {
    //                 model: TipoMonedaModelo,
    //                 attributes: attributes.tipomoneda
    //             }
    //         ],
    //     },
    //     {
    //         model: DetalleMenuPromocionProductoModelo,
    //         attributes: attributes.detallemenupromocionproducto,
    //         include: [
    //             {
    //                 model: ProductoModelo,
    //                 attributes: attributes.producto,
    //                 include: [
    //                     {
    //                         model: RubroModelo,
    //                         attributes: attributes.rubro,
    //                     },
    //                     {
    //                         model: UnidadMedidaModelo,
    //                         attributes: attributes.unidadmedida,
    //                     },
    //                     {
    //                         model: ProductoEstadoModelo,
    //                         attributes: attributes.productoestado,
    //                         include: [
    //                             {
    //                                 model: EstadoProductoModelo,
    //                                 attributes: attributes.estadoproducto
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         model: PrecioProductoModelo,
    //                         attributes: attributes.precioproducto,
    //                         include: [
    //                             {
    //                                 model: TipoMonedaModelo,
    //                                 attributes: attributes.tipomoneda
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             }
    //         ],
    //     },
    // ],
  }).then(response => {
    if (!response || response == 0) {
        locals['title'] = `No existe el registro : ${req.params[idtable]}`,
        locals['tipo'] = 2;
    } else {
        locals['title'] = `${legend}/s encontrado/s`;
        locals['data'] = response.dataValues;
        locals['tipo'] = 1;
    }
    res.json(locals)
  });
};

PedidoController.create = (req, res) => {
    let body = req.body;
    let locals = {};
    EstadoMenuPromocionModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
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
            TipoMenuPromocionModelo.findOne({ where: {[idtable5]: body[idtable5]} }).then( tipomenupromocion => {
              if ( !tipomenupromocion || tipomenupromocion == 0 ) {
                locals['title'] = `No existe instancia de ${legend5} con ${idtable5}.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                MenuPromocionModelo.create(body).then(result => {
                    locals['title'] = `${legend} creada.`;
                    locals['data'] = result;
                    locals['id'] = result[idtable];
                    locals['tipo'] = 1;
                    let pushMenuPromocionEstado = {};
                    pushMenuPromocionEstado['descripcionMenuPromocionEstado'] = body['descripcionMenuPromocionEstado'] || "Reciente.";
                    pushMenuPromocionEstado[idtable] = result[idtable];
                    pushMenuPromocionEstado['fechaYHoraAltaMenuPromocionEstado'] = new Date();
                    pushMenuPromocionEstado[idtable3] = 1;
                    MenuPromocionEstadoModelo.create(pushMenuPromocionEstado).then( response => {
                    locals['title'] = `${legend} creado. ${legend2} creado.`;
                    locals['data'] = response;
                    locals['tipo'] = 1;
                    let pushPrecioMenuPromocion = {};
                    pushPrecioMenuPromocion['importePrecioMenuPromocion'] = body['importePrecioMenuPromocion'];
                    pushPrecioMenuPromocion[idtable] = result[idtable];
                    pushPrecioMenuPromocion['fechaYHoraDesdePrecioMenuPromocion'] = body['fechaYHoraDesdePrecioMenuPromocion'] || new Date();
                    pushPrecioMenuPromocion['fechaYHoraHastaPrecioMenuPromocion'] = body['fechaYHoraHastaPrecioMenuPromocion'] || null;
                    pushPrecioMenuPromocion[idtable4] = body[idtable4];
                    PrecioMenuPromocionModelo.create(pushPrecioMenuPromocion).then( resp => {
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
        })
      }
    })
};

PedidoController.actualizarDatos = (req, res) => {
    let locals = {};
    let body = req.body;
    PedidoModelo.findOne({
      where: { [idtable]: body[idtable] },
      attributes: attributes.menupromocion,
      include: [
          {
              model: TipoMenuPromocionModelo,
              attributes: attributes.tipomenupromocion,
          },
          {
              model: MenuPromocionEstadoModelo,
              where: { fechaYHoraBajaMenuPromocionEstado: null },
              attributes: attributes.menupromocionestado,
              include: [
                  {
                  model: EstadoMenuPromocionModelo,
                  attributes: attributes.estadomenupromocion
                  }
              ]
          },
          {
              model: PrecioMenuPromocionModelo,
              where: { fechaYHoraHastaPrecioMenuPromocion: null },
              attributes: attributes.preciomenupromocion,
              include: [
                  {
                      model: TipoMonedaModelo,
                      attributes: attributes.tipomoneda
                  }
              ],
          },
          {
              model: DetalleMenuPromocionProductoModelo,
              attributes: attributes.detallemenupromocionproducto,
              include: [
                  {
                      model: ProductoModelo,
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
                          }
                      ]
                  }
              ],
          },
      ],
      }).then(response => {
        if (!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
        MenuPromocionModelo.update(body, {
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
  
PedidoController.cambiarEstado = (req, res) => {
let locals = {};
let body = req.body;
    PedidoModelo.findOne({
    where: {
    [idtable]: body[idtable] },
    attributes: attributes.menupromocion,
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: attributes.tipomenupromocion,
        },
        {
            model: MenuPromocionEstadoModelo,
            where: { fechaYHoraBajaMenuPromocionEstado: null },
            attributes: attributes.menupromocionestado,
            include: [
                {
                model: EstadoMenuPromocionModelo,
                attributes: attributes.estadomenupromocion
                }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            where: { fechaYHoraHastaPrecioMenuPromocion: null },
            attributes: attributes.preciomenupromocion,
            include: [
                {
                    model: TipoMonedaModelo,
                    attributes: attributes.tipomoneda
                }
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: attributes.detallemenupromocionproducto,
            include: [
                {
                    model: ProductoModelo,
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
                        }
                    ]
                }
            ],
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
        EstadoMenuPromocionModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadomenupromocion) =>{
        if(!estadomenupromocion || estadomenupromocion == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let pushMenuPromocionEstado = {};
            pushMenuPromocionEstado['fechaYHoraBajaMenuPromocionEstado'] = new Date();
            MenuPromocionEstadoModelo.update(pushMenuPromocionEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaMenuPromocionEstado: null }
            }).then((respons) => {
            if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                body['fechaYHoraAltaMenuPromocionEstado'] = new Date();
                MenuPromocionEstadoModelo.create(body).then((resp) => {
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

PedidoController.cambiarPrecio = (req, res) => {
let locals = {};
let body = req.body;
    PedidoModelo.findOne({
    where: {
    [idtable]: body[idtable] },
    attributes: attributes.menupromocion,
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: attributes.tipomenupromocion,
        },
        {
            model: MenuPromocionEstadoModelo,
            where: { fechaYHoraBajaMenuPromocionEstado: null },
            attributes: attributes.menupromocionestado,
            include: [
                {
                model: EstadoMenuPromocionModelo,
                attributes: attributes.estadomenupromocion
                }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            where: { fechaYHoraHastaPrecioMenuPromocion: null },
            attributes: attributes.preciomenupromocion,
            include: [
                {
                    model: TipoMonedaModelo,
                    attributes: attributes.tipomoneda
                }
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: attributes.detallemenupromocionproducto,
            include: [
                {
                    model: ProductoModelo,
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
                        }
                    ]
                }
            ],
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
            let pushPrecioMenuPromocion = {};
            pushPrecioMenuPromocion['fechaYHoraHastaPrecioMenuPromocion'] = new Date();
            PrecioMenuPromocionModelo.update(pushPrecioMenuPromocion , {
                where: { [idtable]: body[idtable], fechaYHoraHastaPrecioMenuPromocion: null }
            }).then((respons) => {
            if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                body['fechaYHoraDesdePrecioMenuPromocion'] = new Date();
                PrecioMenuPromocionModelo.create(body).then((resp) => {
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

PedidoController.editarProductos = (req, res) => {
    var locals = { };
    let body = req.body;
    PedidoModelo.findOne({
        where: {
        [idtable]: body[idtable] },
        attributes: attributes.menupromocion,
        include: [
            {
                model: TipoMenuPromocionModelo,
                attributes: attributes.tipomenupromocion,
            },
            {
                model: MenuPromocionEstadoModelo,
                where: { fechaYHoraBajaMenuPromocionEstado: null },
                attributes: attributes.menupromocionestado,
                include: [
                    {
                    model: EstadoMenuPromocionModelo,
                    attributes: attributes.estadomenupromocion
                    }
                ]
            },
            {
                model: PrecioMenuPromocionModelo,
                where: { fechaYHoraHastaPrecioMenuPromocion: null },
                attributes: attributes.preciomenupromocion,
                include: [
                    {
                        model: TipoMonedaModelo,
                        attributes: attributes.tipomoneda
                    }
                ],
            },
            {
                model: DetalleMenuPromocionProductoModelo,
                attributes: attributes.detallemenupromocionproducto,
                include: [
                    {
                        model: ProductoModelo,
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
                            }
                        ]
                    }
                ],
            },
        ],
    }).then(response => {
        if(!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${idtable}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let i = 1;
            for ( let elem of body.producto ) {
                // console.log("PRODUCTO  idDetalleMenuPromocionProducto :",elem['idDetalleMenuPromocionProducto'])
                // console.log("PRODUCTO bajaProducto :",elem['bajaProducto'])
                // console.log("PRODUCTO  cantidadProductoMenuPromocion:",elem['cantidadProductoMenuPromocion'])
                if ( elem['idDetalleMenuPromocionProducto'] ) {
                    if ( elem['bajaProducto'] == true ) {
                        console.log("BORRAR   :---------------------------")
                        DetalleMenuPromocionProductoModelo.destroy({where: {[idtable8]: elem[idtable8]}}).then((resp) => {
                            let push = {};
                            if(!resp || resp == 0) {
                                push = {
                                    ['title']: `Producto NO eliminado con ${[idtable8]} = ${elem[[idtable8]]}.`,
                                    ['tipo']: 2
                                }
                            } else {
                                push = {
                                    ['title']: `Producto eliminado con ${[idtable8]} = ${elem[[idtable8]]}.`,
                                    ['tipo']: 1
                                }
                            }
                            // locals['producto'].push(push);
                        })
                    } else {
                        console.log("EDITAR   :---------------------------")
                        DetalleMenuPromocionProductoModelo.update(elem, {where: {[idtable8]: elem[idtable8]}}).then((resp) => {
                            let push = {};
                            if(!resp || resp == 0) {
                                push = {
                                    ['title']: `Producto NO editado con ${[idtable8]} = ${elem[[idtable8]]}.`,
                                    ['tipo']: 2
                                }
                            } else {
                                push = {
                                    ['title']: `Producto editado con ${[idtable8]} = ${elem[[idtable8]]}.`,
                                    ['tipo']: 1
                                }
                            }
                            // locals['producto'].push(push);
                        })
                    }
                } else {
                    ProductoModelo.findOne({ where: {[idtable9]: elem[idtable9]}}).then((producto) => {
                        let push = {};
                        if(!producto || producto == 0) {
                            let push = {
                                ['title']: `No existe ${legend9} con id ${idtable9}.`,
                                ['tipo']: 2
                            }
                        } else {
                            elem['idMenuPromocion'] = body['idMenuPromocion'];
                            DetalleMenuPromocionProductoModelo.create(elem).then((resp) => {
                                let push = {};
                                console.log("CREAR  : +++++++++++++++++++++++++++++")
                                if(!resp || resp == 0) {
                                    let push = {
                                        ['title']: `Producto NO creado: ${elem[idtable9]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                        ['tipo']: 2
                                    }
                                } else {
                                    let push = {
                                        ['title']: `Producto creado: ${elem[idtable9]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                        ['tipo']: 1
                                    }
                                }
                            })
                        }
                        // locals['producto'].push(push);
                    })
                }
                console.log("LOCALS " , i)
                if ( Object.keys(body.producto).length == i) {
                    locals['title'] = 'Registros actualizados.';
                    res.json(locals);
                }
                i += 1;
            }
        }
    });
};

module.exports = PedidoController;