"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  MenuPromocionModelo = require("./menupromocion-model"),
  MenuPromocionController = () => { },
  attributes = require('../attributes'),
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
  legend2 = "ProductoEstado",
  legend3 = "EstadoProducto",
  legend4 = "TipoMoneda",
  legend5 = "Rubro",
  legend6 = "UnidadMedida",
  legend7 = "PrecioProducto",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
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
            where: { fechaYHoraHastaMenuPromocionEstado: null },
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
                where: { fechaYHoraHastaMenuPromocionEstado: null },
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
            where: { fechaYHoraHastaMenuPromocionEstado: null },
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
            where: { fechaYHoraHastaMenuPromocionEstado: null },
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
        locals['title'] = `No existe el registro : ${req.params[idtable]}`,
        locals['tipo'] = 2;
    } else {
        locals['title'] = `${legend}/s encontrado/s`;
        locals['data'] = response.dataValues;
        locals['tipo'] = 1;response;
    }
    res.json(locals)
  });
};

module.exports = MenuPromocionController;