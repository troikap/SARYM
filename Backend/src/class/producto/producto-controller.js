"use strict";

require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Productomodel = require("./producto-model"),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  
  Sequelize = require('sequelize'),
  sequelize = require('../../database/connection'),
  Op = Sequelize.Op,
  ProductoController = () => { },
  legend = "Producto",
  legend2 = "AAAAAAAAAAAA",
  legend3 = "BBBBBBBBBBBB",
  idtable = "idProducto",
  idtableestado = "idAAAAAAAAAAAAA",
  idestadotable = "idBBBBBBBBBBBBB",
  nombreEstado = "nombreAAAAAAAAAAAAAAAAA",
  table = "producto";

ProductoController.getAll = (req, res) => {
  let locals = {};
  Productomodel.findAll({ 
    // BUSCA POR FORANEA 
    attributes: [
        "idProducto",
        "codProducto",
        "cantidadMedida",
        "nombreProducto",
        "descripcionProducto",
        "pathImagenProducto"
    ],
    include: [
      {
        model: RubroModelo,
        attributes: [
            "idRubro",
            "codRubro",
            "nombreRubro",
            "descripcionRubro"
        ],
      },
      {
        model: UnidadMedidaModelo,
        attributes: [
            "idUnidadMedida",
            "codUnidadMedida",
            "nombreUnidadMedida",
            "descripcionUnidadMedida",
            "caracterUnidadMedida",
        ],
      },
      {
      model: ProductoEstadoModelo,
        attributes: [
            "idProductoEstado",
            "descripcionProductoEstado",
            "fechaYHoraAltaProductoEstado",
            "fechaYHoraBajaProductoEstado",
        ],
        include: [
          {
            model: EstadoProductoModelo,
            attributes: [
                "idEstadoProducto",
                "codEstadoProducto",
                "nombreEstadoProducto",
            ]
          }
        ]
      },
      {
      model: PrecioProductoModelo,
      attributes: [
            "idPrecioProducto",
            "importePrecioProducto",
            "fechaYHoraDesdePrecioProducto",
            "fechaYHoraHastaPrecioProducto",
      ],
      include: [
        {
          model: TipoMonedaModelo,
          attributes: [
            "idTipoMoneda",
            "nombreTipoMoneda",
            "simboloTipoMoneda",
          ]
        }
      ]
    },
    ],
  }).then(response => {
    if (!response || response == 0) {
      // SI NO EXISTEN REGISTROS DE USUARIO
      locals.title = {
        descripcion: `No existen registros de ${legend}`
      };
      res.json(locals);
    } else {
      // SI EXISTE EL USUARIO REGRESARLOS CON SUS ASOCIACIONES
      locals.title = `${legend}/s encontrado/s`;
      locals[legend] = response;
      res.json(locals)
    }
  })
}

ProductoController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  Productomodel.findOne({
    where: { [idtable]: req.params[idtable] },
    // BUSCA POR FORANEA 
    attributes: [
        "idProducto",
        "codProducto",
        "cantidadMedida",
        "nombreProducto",
        "descripcionProducto",
        "pathImagenProducto"
    ],
    include: [
        {
        model: RubroModelo,
        attributes: [
            "idRubro",
            "codRubro",
            "nombreRubro",
            "descripcionRubro"
        ],
        },
        {
        model: UnidadMedidaModelo,
        attributes: [
            "idUnidadMedida",
            "codUnidadMedida",
            "nombreUnidadMedida",
            "descripcionUnidadMedida",
            "caracterUnidadMedida",
        ],
        },
        {
        model: ProductoEstadoModelo,
        attributes: [
            "idProductoEstado",
            "descripcionProductoEstado",
            "fechaYHoraAltaProductoEstado",
            "fechaYHoraBajaProductoEstado",
        ],
        include: [
            {
            model: EstadoProductoModelo,
            attributes: [
                "idEstadoProducto",
                "codEstadoProducto",
                "nombreEstadoProducto",
            ]
            }
        ]
        },
        {
        model: PrecioProductoModelo,
        attributes: [
            "idPrecioProducto",
            "importePrecioProducto",
            "fechaYHoraDesdePrecioProducto",
            "fechaYHoraHastaPrecioProducto",
        ],
        include: [
        {
            model: TipoMonedaModelo,
            attributes: [
            "idTipoMoneda",
            "nombreTipoMoneda",
            "simboloTipoMoneda",
            ]
        }
        ]
    },
    ],
  }).then(response => {
    if (!response || response == 0) {
      // SI NO EXISTE EL USUARIO
      locals.title = {
        descripcion: `No existe el registro : ${req.params[idtable]}`,
        tipo: 2
      };
      res.json(locals);
    } else {
      // SI EXISTE EL USUARIO AGREGAMOS A LA VARIABLE EL MISMO
      // locals.title = `${legend} encontrado`;
      locals[legend] = response.dataValues;
      locals['tipo'] = 1
      res.json(locals)
    }
  });
};

ProductoController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: `Recurso ${legend} No Encontrado`,
      error: error
    };
  error.status = 404;
  res.json(locals);
  next();
};

module.exports = ProductoController;