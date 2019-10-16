"use strict";

require('../../config');
const MenuPromocionModelo = require("./menupromocion-model"),
  MenuPromocionController = () => { },
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
  idtable = `id${legend}`,
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
        ]
    },
    attributes: [
        "idMenuPromocion",
        "codMenuPromocion",
        "nombreMenuPromocion",
        "descripcionMenuPromocion",
        "pathImagenMenuPromocion",
    ],
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: [
                "idTipoMenuPromocion",
                "nombreTipoMenuPromocion",
            ],
        },
        {
            model: MenuPromocionEstadoModelo,
            attributes: [
                "idMenuPromocionEstado",
                "descripcionMenuPromocionEstado",
                "fechaYHoraAltaMenuPromocionEstado",
                "fechaYHoraBajaMenuPromocionEstado",
            ],
            include: [
                {
                model: EstadoMenuPromocionModelo,
                attributes: [
                    "idEstadoMenuPromocion",
                    "codEstadoMenuPromocion",
                    "nombreEstadoMenuPromocion",
                ]
                }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            attributes: [
                "idPrecioMenuPromocion",
                "importePrecioMenuPromocion",
                "fechaYHoraDesdePrecioMenuPromocion",
                "fechaYHoraHastaPrecioMenuPromocion",
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
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: [
                "idDetalleMenuPromocionProducto",
                "cantidadProductoMenuPromocion",
            ],
            include: [
                {
                    model: ProductoModelo,
                    attributes: [
                        "idProducto",
                        "codProducto",
                        "nombreProducto",
                        "descripcionProducto",
                        "pathImagenProducto",
                        "cantidadMedida"
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
            res.json(locals);
        } else {
            locals['title'] = `${legend}`;
            locals['tipo'] = 1;
            locals['data'] = project;
            res.json(locals);
        }
    });
};

MenuPromocionController.getToName = (req, res, next) => {
    let locals = {};
    MenuPromocionModelo.findAll({
      where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
      attributes: [
        "idMenuPromocion",
        "codMenuPromocion",
        "nombreMenuPromocion",
        "descripcionMenuPromocion",
        "pathImagenMenuPromocion",
    ],
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: [
                "idTipoMenuPromocion",
                "nombreTipoMenuPromocion",
            ],
        },
        {
            model: MenuPromocionEstadoModelo,
            attributes: [
                "idMenuPromocionEstado",
                "descripcionMenuPromocionEstado",
                "fechaYHoraAltaMenuPromocionEstado",
                "fechaYHoraBajaMenuPromocionEstado",
            ],
            include: [
                {
                model: EstadoMenuPromocionModelo,
                attributes: [
                    "idEstadoMenuPromocion",
                    "codEstadoMenuPromocion",
                    "nombreEstadoMenuPromocion",
                ]
                }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            attributes: [
                "idPrecioMenuPromocion",
                "importePrecioMenuPromocion",
                "fechaYHoraDesdePrecioMenuPromocion",
                "fechaYHoraHastaPrecioMenuPromocion",
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
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: [
                "idDetalleMenuPromocionProducto",
                "cantidadProductoMenuPromocion",
            ],
            include: [
                {
                    model: ProductoModelo,
                    attributes: [
                        "idProducto",
                        "codProducto",
                        "nombreProducto",
                        "descripcionProducto",
                        "pathImagenProducto",
                        "cantidadMedida"
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
                        }
                    ]
                }
            ],
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

MenuPromocionController.getAll = (req, res) => {
  let locals = {};
  MenuPromocionModelo.findAll({ 
    // BUSCA POR FORANEA 
    attributes: [
        "idMenuPromocion",
        "codMenuPromocion",
        "nombreMenuPromocion",
        "descripcionMenuPromocion",
        "pathImagenMenuPromocion",
    ],
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: [
                "idTipoMenuPromocion",
                "nombreTipoMenuPromocion",
            ],
        },
        {
          model: MenuPromocionEstadoModelo,
            attributes: [
                "idMenuPromocionEstado",
                "descripcionMenuPromocionEstado",
                "fechaYHoraAltaMenuPromocionEstado",
                "fechaYHoraBajaMenuPromocionEstado",
            ],
            include: [
              {
                model: EstadoMenuPromocionModelo,
                attributes: [
                    "idEstadoMenuPromocion",
                    "codEstadoMenuPromocion",
                    "nombreEstadoMenuPromocion",
                ]
              }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            attributes: [
                "idPrecioMenuPromocion",
                "importePrecioMenuPromocion",
                "fechaYHoraDesdePrecioMenuPromocion",
                "fechaYHoraHastaPrecioMenuPromocion",
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
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: [
                "idDetalleMenuPromocionProducto",
                "cantidadProductoMenuPromocion",
            ],
            include: [
                {
                    model: ProductoModelo,
                    attributes: [
                        "idProducto",
                        "codProducto",
                        "nombreProducto",
                        "descripcionProducto",
                        "pathImagenProducto",
                        "cantidadMedida"
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
                        }
                    ]
                }
            ],
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

MenuPromocionController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  MenuPromocionModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    // BUSCA POR FORANEA 
    attributes: [
        "idMenuPromocion",
        "codMenuPromocion",
        "nombreMenuPromocion",
        "descripcionMenuPromocion",
        "pathImagenMenuPromocion",
    ],
    include: [
        {
            model: TipoMenuPromocionModelo,
            attributes: [
                "idTipoMenuPromocion",
                "nombreTipoMenuPromocion",
            ],
        },
        {
          model: MenuPromocionEstadoModelo,
            attributes: [
                "idMenuPromocionEstado",
                "descripcionMenuPromocionEstado",
                "fechaYHoraAltaMenuPromocionEstado",
                "fechaYHoraBajaMenuPromocionEstado",
            ],
            include: [
              {
                model: EstadoMenuPromocionModelo,
                attributes: [
                    "idEstadoMenuPromocion",
                    "codEstadoMenuPromocion",
                    "nombreEstadoMenuPromocion",
                ]
              }
            ]
        },
        {
            model: PrecioMenuPromocionModelo,
            attributes: [
                "idPrecioMenuPromocion",
                "importePrecioMenuPromocion",
                "fechaYHoraDesdePrecioMenuPromocion",
                "fechaYHoraHastaPrecioMenuPromocion",
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
            ],
        },
        {
            model: DetalleMenuPromocionProductoModelo,
            attributes: [
                "idDetalleMenuPromocionProducto",
                "cantidadProductoMenuPromocion",
            ],
            include: [
                {
                    model: ProductoModelo,
                    attributes: [
                        "idProducto",
                        "codProducto",
                        "nombreProducto",
                        "descripcionProducto",
                        "pathImagenProducto",
                        "cantidadMedida"
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
                        }
                    ]
                }
            ],
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

MenuPromocionController.error404 = (req, res, next) => {
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

module.exports = MenuPromocionController;