"use strict";

require('../../config');
const ProductoModelo = require("./producto-model"),
ProductoController = () => { },
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
  legend = "Producto",
  idtable = `id${legend}`,
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
      ]
    },
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
  }).then(project => {
      if (!project || project == 0) {
        locals['title'] = "No existe ningun registro con la palabra : " + req.params.anyAttribute;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        locals['title'] = `${legend}`;
        locals['tipo'] = 1;
        locals['data'] = project;
        res.json(locals);
      }
  });
};

ProductoController.getToName = (req, res, next) => {
  let locals = {};
  ProductoModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
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
  ProductoModelo.findOne({
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

module.exports = ProductoController;