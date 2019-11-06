"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  MenuPromocionModelo = require("./menupromocion-model"),
  MenuPromocionController = () => { },
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  MenuPromocionEstadoModelo = require("../menupromocionestado/menupromocionestado-model"),
  EstadoMenuPromocionModelo = require("../estadomenupromocion/estadomenupromocion-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  PrecioMenuPromocionModelo = require("../preciomenupromocion/preciomenupromocion-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  TipoMenuPromocionModelo = require("../tipomenupromocion/tipomenupromocion-model"),
  DetalleMenuPromocionProductoModelo = require("../detallemenupromocionproducto/detallemenupromocionproducto-model"),
  ProductoModelo = require("../producto/producto-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
 
  legend = "MenuPromocion",
  legend2 = "MenuPromocionEstado",
  legend3 = "EstadoMenuPromocion",
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
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

MenuPromocionController.getToAllAttributes = (req, res, next) => {
    let locals = {};
    MenuPromocionModelo.findAll({
        where: {
        [Op.or]: [
            {codMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            {idMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            {nombreMenuPromocion: {[Op.substring]: req.params.anyAttribute}},
            Sequelize.literal("`tipomenupromocion`.`nombreTipoMenuPromocion` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`menupromocionestados->estadomenupromocion`.`nombreEstadoMenuPromocion` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`preciomenupromocions->tipomoneda`.`nombreTipoMoneda` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`detallemenupromocionproductos->producto`.`nombreProducto` LIKE '%" + req.params.anyAttribute + "%'"),
        ]
    },
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
                        }
                    ]
                }
            ],
        },
    ],
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

MenuPromocionController.getToName = (req, res, next) => {
    let locals = {};
    MenuPromocionModelo.findAll({
        where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
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
                        }
                    ]
                }
            ],
        },
    ],
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

MenuPromocionController.getAll = (req, res) => {
  let locals = {};
  MenuPromocionModelo.findAll({ 
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
                        }
                    ]
                }
            ],
        },
    ],
  }).then(response => {
    if (!response || response == 0) {
        locals['title'] = `No existen registros de ${legend}`
        locals['tipo'] = 2;
    } else {
        locals['title'] = `${legend}/s encontrado/s`;
        locals['data'] = response;
        locals['tipo'] = 1;
    }
    res.json(locals)
  })
}

MenuPromocionController.getOne = (req, res) => {
  let locals = {};
  MenuPromocionModelo.findOne({
    where: { [idtable]: req.params[idtable] },
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
                        }
                    ]
                }
            ],
        },
    ],
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

MenuPromocionController.create = (req, res) => {
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
                    pushMenuPromocionEstado['fechaYHoraAltaMenuPromocionEstado'] = fechaArgentina.getFechaArgentina();
                    pushMenuPromocionEstado[idtable3] = 1;
                    MenuPromocionEstadoModelo.create(pushMenuPromocionEstado).then( response => {
                    locals['title'] = `${legend} creado. ${legend2} creado.`;
                    locals['data'] = response;
                    locals['tipo'] = 1;
                    let pushPrecioMenuPromocion = {};
                    pushPrecioMenuPromocion['importePrecioMenuPromocion'] = body['importePrecioMenuPromocion'];
                    pushPrecioMenuPromocion[idtable] = result[idtable];
                    pushPrecioMenuPromocion['fechaYHoraDesdePrecioMenuPromocion'] = body['fechaYHoraDesdePrecioMenuPromocion'] || fechaArgentina.getFechaArgentina();
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

MenuPromocionController.actualizarDatos = (req, res) => {
    let locals = {};
    let body = req.body;
    MenuPromocionModelo.findOne({
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
  
MenuPromocionController.cambiarEstado = (req, res) => {
let locals = {};
let body = req.body;
    MenuPromocionModelo.findOne({
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
            pushMenuPromocionEstado['fechaYHoraBajaMenuPromocionEstado'] = fechaArgentina.getFechaArgentina();
            MenuPromocionEstadoModelo.update(pushMenuPromocionEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaMenuPromocionEstado: null }
            }).then((respons) => {
            if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                body['fechaYHoraAltaMenuPromocionEstado'] = fechaArgentina.getFechaArgentina();
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

MenuPromocionController.cambiarPrecio = (req, res) => {
let locals = {};
let body = req.body;
MenuPromocionModelo.findOne({
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
            pushPrecioMenuPromocion['fechaYHoraHastaPrecioMenuPromocion'] = fechaArgentina.getFechaArgentina();
            PrecioMenuPromocionModelo.update(pushPrecioMenuPromocion , {
                where: { [idtable]: body[idtable], fechaYHoraHastaPrecioMenuPromocion: null }
            }).then((respons) => {
            if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                body['fechaYHoraDesdePrecioMenuPromocion'] = fechaArgentina.getFechaArgentina();
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

MenuPromocionController.editarProductos = (req, res) => {
    var locals = { detalles: [] };
    let body = req.body;
    MenuPromocionModelo.findOne({
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
    }).then( async response => {
        if(!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${idtable}`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let i = 1;
            for ( let elem of body.detalle ) {
                if ( elem['idDetalleMenuPromocionProducto'] ) {
                    if ( elem['baja'] == true ) {
                        console.log("BORRAR   :---------------------------")
                        await DetalleMenuPromocionProductoModelo.destroy({where: {[idtable8]: elem[idtable8]}})
                        .then((resp) => {
                            if(!resp || resp == 0) {
                                locals.detalles.push({
                                    ['title']: `Producto NO eliminado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 2
                                })
                            } else {
                                locals.detalles.push({
                                    ['title']: `Producto eliminado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 1
                                })
                            }
                        })
                    } else {
                        console.log("EDITAR   :---------------------------")
                        await DetalleMenuPromocionProductoModelo.update(elem, {where: {[idtable8]: elem[idtable8]}})
                        .then((resp) => {
                            if(!resp || resp == 0) {
                                locals.detalles.push({
                                    ['title']: `Producto NO editado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 2
                                })
                            } else {
                                locals.detalles.push({
                                    ['title']: `Producto editado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 1
                                })
                            }
                        })
                    }
                } else {
                    await ProductoModelo.findOne({ where: {[idtable9]: elem[idtable9]}})
                    .then( async (producto) => {
                        if(!producto || producto == 0) {
                            locals.detalles.push({
                                ['title']: `No existe ${legend9} con id ${idtable9}`,
                                ['tipo']: 2
                            })
                        } else {
                            elem['idMenuPromocion'] = body['idMenuPromocion'];
                            await DetalleMenuPromocionProductoModelo.create(elem)
                            .then((resp) => {
                                console.log("CREAR  : +++++++++++++++++++++++++++++")
                                if(!resp || resp == 0) {
                                    locals.detalles.push({
                                        ['title']: `Producto NO creado: ${elem[idtable9]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                        ['tipo']: 2
                                    })
                                } else {
                                    locals.detalles.push({
                                        ['title']: `Producto creado: ${elem[idtable9]} con cantidad ${elem['cantidadProductoMenuPromocion']}`,
                                        ['tipo']: 1
                                    })
                                }
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

MenuPromocionController.habilitarDeshabilitarMenuPromocion = (req, res) => {
    let locals = { detalles: [], detalleResultado: [] };
    let cantidad = 0;
    MenuPromocionModelo.findAll({ 
        attributes: attributes.menupromocion,
        include: [
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
                model: DetalleMenuPromocionProductoModelo,
                attributes: attributes.detallemenupromocionproducto,
                where: { idDetalleMenuPromocionProducto: { 
                    [Op.ne]: null  
                }},
                include: [
                    {
                        model: ProductoModelo,
                        attributes: attributes.producto,
                        include: [
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
                        ]
                    }
                ],
            },
        ],
      }).then( async  response => {
        if (!response || response == 0) {
            locals['title'] = `No existen registros de ${legend}`
            locals['tipo'] = 2;
        } else {
            await EstadoMenuPromocionModelo.findOne({where: { [idtable3]: {[Op.in]: [1, 2]} }}).then( async estadomenupromocion =>{
                if(!estadomenupromocion || estadomenupromocion == 0) {
                    locals['title'] = `No existen Estado correspondientes de ${legend}`
                    locals['tipo'] = 2;
                } else {
                    for (let menupromocion of response) {
                        let detallesProductos = { estado: []};
                        let enFalta = false;
                        let idMenuPromocion = menupromocion.dataValues.idMenuPromocion;
                        let idEstadoMenuPromocion = menupromocion.dataValues.menupromocionestados[0].dataValues.estadomenupromocion.dataValues.idEstadoMenuPromocion;
                        let nombreEstadoMenuPromocion = menupromocion.dataValues.menupromocionestados[0].dataValues.estadomenupromocion.dataValues.nombreEstadoMenuPromocion;
                        for (let detalleProducto of menupromocion.dataValues.detallemenupromocionproductos) {
                            if (detalleProducto.dataValues.producto.dataValues.productoestados[0].dataValues.estadoproducto.dataValues.idEstadoProducto == 2) {
                                enFalta = true;
                            }
                            detallesProductos.estado.push({
                                'idProducto': detalleProducto.dataValues.producto.dataValues.productoestados[0].dataValues.estadoproducto.dataValues.idEstadoProducto, 
                                'estadoProducto': detalleProducto.dataValues.producto.dataValues.productoestados[0].dataValues.estadoproducto.dataValues.nombreEstadoProducto
                            })
                        }
                        locals.detalles.push({
                            'idMenuPromocion': idMenuPromocion,
                            'idEstadoMenuPromocion': idEstadoMenuPromocion, 
                            'estadoMenuPromocion': nombreEstadoMenuPromocion,
                            'enFalta': enFalta,
                            detallesProductos
                        })
                        let nuevo = {};
                        let nuevoEstado = null;
                        if ( enFalta && idEstadoMenuPromocion == 1 ) {
                            console.log("PASANDO MENU A ENFALTA")
                            nuevoEstado = 2;
                        } else if ( !enFalta && idEstadoMenuPromocion == 2) {
                            console.log("PASANDO MENU A ACTIVO")
                            nuevoEstado = 1;
                        } 
                        if ( enFalta && idEstadoMenuPromocion == 1 || !enFalta && idEstadoMenuPromocion == 2 ){
                            let pushMenuPromocionEstado = {};
                            pushMenuPromocionEstado['fechaYHoraBajaMenuPromocionEstado'] = fechaArgentina.getFechaArgentina();
                            await MenuPromocionEstadoModelo.update(pushMenuPromocionEstado , {
                                where: { [idtable]: idMenuPromocion, fechaYHoraBajaMenuPromocionEstado: null }
                            }).then( async respons => {
                                if(!respons || respons == 0) {
                                    locals.detalleResultado.push({
                                        'title': `No se pudo encontrar instancia de Menu Promocion Estado con ${legend}: ${idMenuPromocion}`,
                                        'tipo': 2,
                                    })
                                } else {
                                    nuevo['fechaYHoraAltaMenuPromocionEstado'] = fechaArgentina.getFechaArgentina();
                                    nuevo['idEstadoMenuPromocion'] = nuevoEstado;
                                    nuevo['idMenuPromocion'] = idMenuPromocion;
                                    await MenuPromocionEstadoModelo.create(nuevo).then((resp) => {
                                    if (!resp || resp == 0 ){
                                        locals.detalleResultado.push({
                                            'title': `No se pudo crear instancia de Menu Promocion Estado con ${legend}: ${idMenuPromocion}`,
                                            'tipo': 2,
                                        })
                                    } else {
                                        cantidad += 1;
                                        locals.detalleResultado.push({
                                            'title': `Correcto. Se actualizo Estado. ${legend}: ${idMenuPromocion}`,
                                            'tipo': 1,
                                        })
                                    }
                                })
                                }
                            })
                        } else {
                            locals.detalleResultado.push({
                                'title': `No posee modificaciones Menu Promocion con ${legend}: ${idMenuPromocion}`,
                                'tipo': 2,
                            })
                        }
                    }
                }
            })
            locals['title'] = `Proceso Terminado`;
            locals['registrosModificados'] = cantidad;
            locals['tipo'] = 1;
        }
        res.json(locals)
        }).catch((error) => {
            console.log("ENTRO ACA")
            locals = tratarError.tratarError(error, legend);
            res.json(locals);
        });
};

module.exports = MenuPromocionController;