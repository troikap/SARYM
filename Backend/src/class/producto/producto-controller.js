"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  ProductoModelo = require("./producto-model"),
  ProductoController = () => { },
  attributes = require('../attributes'),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  legend = "Producto",
  legend2 = "ProductoEstado",
  legend3 = "EstadoProducto",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
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
        Sequelize.literal("`unidadmedida`.`nombreUnidadMedida` LIKE '%" + req.params.anyAttribute + "%'"),
        Sequelize.literal("`productoestados->estadoproducto`.`nombreEstadoProducto` LIKE '%" + req.params.anyAttribute + "%'"),
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

module.exports = ProductoController;