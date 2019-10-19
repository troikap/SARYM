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
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        if (body[codtable] == null) {
          body[codtable] = response.dataValues[codtable]
        }
        ProductoModelo.update(body, {
            where: {
                [idtable]: body[idtable]
            }
        }).then(result => {
          if (!result || result == 0) {
            locals['title'] = `No se Actualizo ${legend} con id ${body[idtable]}`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
          CajaEstadoModelo.update({ 
            descripcionCajaEstado: body['descripcionCajaEstado'] || response.dataValues.cajaestados[0].dataValues.descripcionCajaEstado,
            montoAperturaCajaEstado: body['montoAperturaCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoAperturaCajaEstado,
            montoCierreCajaEstado: body['montoCierreCajaEstado'] || response.dataValues.cajaestados[0].dataValues.montoCierreCajaEstado,
            [idtable4]: body[idtable4] || response.dataValues.cajaestados[0].dataValues[idtable4], // Usuario
           }, {where: {[idtable]: body[idtable], 
                      fechaYHoraBajaCajaEstado: null}
          }).then((resp) => {
          if (!resp || resp == 0) {
              locals['title'] = `No se actualizo ${legend2}.`;
              locals['tipo'] = 2;
          } else {
            locals['title'] = `Se actualizo ${legend2}.`;
            locals['tipo'] = 1;
          }
          res.json(locals);
        });
        }
      }).catch((error) => {
        let locals = tratarError.tratarError(error, legend);
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
      attributes: attributes.caja,
      include: [
        {
          model: CajaEstadoModelo,
          where: { fechaYHoraBajaCajaEstado: null },
          attributes: attributes.cajaestado,
          include: [
            {
              model: EstadoProductoModelo,
              attributes: attributes.estadocaja
            },
            {
              model: UsuarioModelo,
              attributes: attributes.usuario
            }
          ]
        }
      ]
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
        EstadoProductoModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadocaja) =>{
          if(!estadocaja || estadocaja == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            let pushCajaEstado = {};
            pushCajaEstado['fechaYHoraBajaCajaEstado'] = new Date();
              CajaEstadoModelo.update(pushCajaEstado , {
                where: { [idtable]: body[idtable], fechaYHoraBajaCajaEstado: null }
            }).then((respons) => {
              if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
              } else {
                body['fechaYHoraAltaCajaEstado'] = new Date();
                CajaEstadoModelo.create(body).then((resp) => {
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

module.exports = ProductoController;