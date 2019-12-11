"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
  PedidoModelo = require("./pedido-model"),
  PedidoController = () => { },
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  RubroModelo = require("../rubro/rubro-model"),
  UnidadMedidaModelo = require("../unidadmedida/unidadmedida-model"),
  PedidoEstadoModelo = require("../pedidoestado/pedidoestado-model"),
  EstadoPedidoModelo = require("../estadopedido/estadopedido-model"),
  PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
  PrecioMenuPromocionModelo = require("../preciomenupromocion/preciomenupromocion-model"),
  TipoMenuPromocionModelo = require("../tipomenupromocion/tipomenupromocion-model"),
  DetalleMenuPromocionProductoModelo = require("../detallemenupromocionproducto/detallemenupromocionproducto-model"),
  ProductoModelo = require("../producto/producto-model"),
  ProductoEstadoModelo = require("../productoestado/productoestado-model"),
  EstadoProductoModelo = require("../estadoproducto/estadoproducto-model"),
  ComensalModelo = require("../comensal/comensal-model"),
  DetallePedidoProductoModelo = require("../detallepedidoproducto/detallepedidoproducto-model"),
  MenuPromocionModelo = require("../menupromocion/menupromocion-model"),
  TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
 
  legend = "Pedido",
  legend2 = "PedidoEstado",
  legend3 = "EstadoPedido",
  legend4 = "Comensal",
  legend5 = "TipoMenuPromocion",
  legend6 = "UnidadMedida",
  legend7 = "PrecioMenuPromocion",
  legend8 = "DetallePedidoProducto",
  legend9 = "Producto",
  legend10 = "DetalleMenuPromocionProducto",
  legend11 = "MenuPromocion",

  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  idtable6 = `id${legend6}`,
  idtable7 = `id${legend7}`,
  idtable8 = `id${legend8}`,
  idtable9 = `id${legend9}`,
  idtable10 = `id${legend10}`,
  idtable11 = `id${legend11}`,


  nombretable = `cod${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

PedidoController.getToAllAttributes = (req, res, next) => {
    let locals = {};
    PedidoModelo.findAll({
        where: {
        [Op.or]: [
            {codPedido: {[Op.substring]: req.params.anyAttribute}},
            {idPedido: {[Op.substring]: req.params.anyAttribute}},
            Sequelize.literal("`pedidoestados->estadopedido`.`nombreEstadoPedido` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`comensal`.`aliasComensal` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`detallepedidoproductos->menupromocion`.`nombreMenuPromocion` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`detallepedidoproductos->producto`.`nombreProducto` LIKE '%" + req.params.anyAttribute + "%'"),
        ]
    },
    attributes: attributes.pedido,
    include: [
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
        },
        {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
                {
                    model: ProductoModelo,
                    attributes: attributes.producto,
                },
                {
                    model: MenuPromocionModelo,
                    attributes: attributes.menupromocion,
                }
            ]
        },
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
    ]
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
    include: [
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
        },
        {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
                {
                    model: ProductoModelo,
                    attributes: attributes.producto,
                },
                {
                    model: MenuPromocionModelo,
                    attributes: attributes.menupromocion,
                }
            ]
        },
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
    ]
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
    attributes: attributes.pedido,
    include: [
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
        },
        {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
                {
                    model: ProductoModelo,
                    attributes: attributes.producto,
                },
                {
                    model: MenuPromocionModelo,
                    attributes: attributes.menupromocion,
                }
            ]
        },
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
    ]
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
    attributes: attributes.pedido,
    include: [
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
        },
        {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
                {
                    model: ProductoModelo,
                    attributes: attributes.producto,
                    include: [
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
                },
                {
                    model: MenuPromocionModelo,
                    attributes: attributes.menupromocion,
                    include: [
                        {
                          model: PrecioMenuPromocionModelo,
                          where: { fechaYHoraHastaPrecioMenuPromocion: null },
                          attributes: attributes.preciomenupromocion,
                          include: [
                            {
                                model: TipoMonedaModelo,
                                attributes: attributes.tipomoneda
                            }
                          ]
                        }
                    ]
                }
            ]
        },
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
    ]
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
    let buscarID;
    if ( body['idReserva'] != null  ) {
        buscarID = 1;
    } else { buscarID = 3}
    EstadoPedidoModelo.findOne({ where: {[idtable3]: buscarID } }).then( responses => {
      if ( !responses || responses == 0 ) {
        locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        ComensalModelo.findOne({ where: {[idtable4]: body[idtable4]} }).then( comensal => {
          if ( !comensal || comensal == 0 ) {
            locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
            locals['tipo'] = 2;
            res.json(locals);
          } else {
            body['fechaYHoraInicioPedido'] = new Date();
            PedidoModelo.create(body).then(result => {
                locals['title'] = `${legend} creada.`;
                locals['data'] = result;
                locals['id'] = result[idtable];
                locals['tipo'] = 1;
                let pushPedidoEstado = {};
                pushPedidoEstado['descripcionPedidoEstado'] = body['descripcionPedidoEstado'] || "Reciente.";
                pushPedidoEstado[idtable] = result[idtable];
                pushPedidoEstado['fechaYHoraAltaPedidoEstado'] = fechaArgentina.getFechaArgentina();
                pushPedidoEstado[idtable3] = buscarID;
                PedidoEstadoModelo.create(pushPedidoEstado).then( response => {
                    locals['title'] = `${legend} creado. ${legend2} creado.`;
                    locals['data'] = response;
                    locals['tipo'] = 1;
                    res.json(locals)
                }).catch((error) => {
                locals = tratarError.tratarError(error, legend);
                res.json(locals);
                });
            }).catch((error) => {
                locals = tratarError.tratarError(error, legend);
                res.json(locals);
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
      attributes: attributes.pedido,
        include: [
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
            },
            {
                model: DetallePedidoProductoModelo,
                attributes: attributes.detallepedidoproducto,
                include: [
                    {
                        model: ProductoModelo,
                        attributes: attributes.producto,
                    },
                    {
                        model: MenuPromocionModelo,
                        attributes: attributes.menupromocion,
                    }
                ]
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
        ]
      }).then(response => {
        if (!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
        PedidoModelo.update(body, {where: { [idtable]: body[idtable]}}).then(result => {
          if (!result || result == 0) {
            locals['title'] = `No se Actualizo ${legend} con id ${body[idtable]}.`;
            locals['tipo'] = 2;
          } else {
            locals['title'] = `Se Actualizo ${legend} con id ${body[idtable]}.`;
            locals['tipo'] = 1;
          }
          res.json(locals);
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
    attributes: attributes.pedido,
    include: [
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
        },
        {
            model: DetallePedidoProductoModelo,
            attributes: attributes.detallepedidoproducto,
            include: [
                {
                    model: ProductoModelo,
                    attributes: attributes.producto,
                },
                {
                    model: MenuPromocionModelo,
                    attributes: attributes.menupromocion,
                }
            ]
        },
        {
            model: ComensalModelo,
            attributes: attributes.comensal,
        },
    ]
    }).then(response => {
    if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
    } else {
    if (!body[idtable3]) {
        locals['title'] = `No se envia ${legend3}.`;
        locals['tipo'] = 2;
        res.json(locals);
    } else {
        EstadoPedidoModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadopedido) =>{
        if(!estadopedido || estadopedido == 0) {
            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let pushPedidoEstado = {};
            pushPedidoEstado['fechaYHoraBajaPedidoEstado'] = fechaArgentina.getFechaArgentina();
            PedidoEstadoModelo.update(pushPedidoEstado , { where: { [idtable]: body[idtable], fechaYHoraBajaPedidoEstado: null }}).then((respons) => {
            if(!respons || respons == 0) {
                locals['title'] = `No existe ${legend2} habilitado.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                body['fechaYHoraAltaPedidoEstado'] = fechaArgentina.getFechaArgentina();
                PedidoEstadoModelo.create(body).then((resp) => {
                    if (!resp || resp == 0 ){
                        locals['title'] = `No se pudo crear ${legend2}.`;
                        locals['tipo'] = 2;
                    } else {
                        locals['title'] = `Se creo correctamente ${legend2}.`;
                        locals['tipo'] = 1;
                        if (body[idtable3] == 6 || body[idtable3] == 7) {
                            let pathActualizarPedido = {
                                fechaYHoraFinPedido: fechaArgentina.getFechaArgentina()
                            }
                            PedidoModelo.update(pathActualizarPedido, {[idtable]: body[idtable]}).then( resp => {
                                if(!resp || resp == 0) {
                                    locals['titleFecha'] = `No se actualizo la Fecha Fin de Pedido.`;
                                    locals['tipoFecha'] = 2;
                                    res.json(locals);
                                } else {
                                    locals['titleFecha'] = `Se actualizo la fecha Fin de Pedido}.`;
                                    locals['tipoFecha'] = 1;
                                }
                            })
                        }
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

PedidoController.editarDetallePedidoProducto = (req, res) => {
    var locals = { detalles: [] };
    let body = req.body;
    console.log("BODY ", body)
    PedidoModelo.findOne({
        where: {
        [idtable]: body[idtable] },
        attributes: attributes.pedido,
        include: [
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
            },
            {
                model: DetallePedidoProductoModelo,
                attributes: attributes.detallepedidoproducto,
                include: [
                    {
                        model: ProductoModelo,
                        attributes: attributes.producto,
                    },
                    {
                        model: MenuPromocionModelo,
                        attributes: attributes.menupromocion,
                    }
                ]
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
        ]
    }).then( async response => {
        if(!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${idtable}`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let i = 1;
            let fecha = fechaArgentina.getFechaArgentina();
            for ( let elem of body.detalle ) {
                if ( elem['idDetallePedidoProducto'] ) {
                    if ( elem['baja'] == true ) {
                        console.log("BORRAR   :---------------------------")
                        await DetallePedidoProductoModelo.destroy({where: {[idtable8]: elem[idtable8]}}).then((resp) => {
                            if(!resp || resp == 0) {
                                locals.detalles.push({
                                    ['title']: `Detalle NO eliminado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 2
                                })
                            } else {
                                locals.detalles.push({
                                    ['title']: `Detalle eliminado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                    ['tipo']: 1
                                })
                            }
                        })
                    } else {
                        if (elem[idtable9] || elem[idtable11]) {
                            locals.detalles.push({
                                ['title']: `Detalle posicion ${i} NO se debe mandar idMenuPromocion o idProducto`,
                                ['tipo']: 2
                            })
                            console.log("NO EDITADO PORQUE SE MANDA IDPRODUCTO O MENUPROMOCION   :---------------------------")
                        } {
                            console.log("EDITAR   :---------------------------")
                            await DetallePedidoProductoModelo.update(elem, {where: {[idtable8]: elem[idtable8]}}).then((resp) => {
                                if(!resp || resp == 0) {
                                    locals.detalles.push({
                                        ['title']: `Detalle NO editado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                        ['tipo']: 2
                                    })
                                } else {
                                    locals.detalles.push({
                                        ['title']: `Detalle editado con ${[idtable8]} = ${elem[[idtable8]]}`,
                                        ['tipo']: 1
                                    })
                                }
                            })
                        }
                    }
                } else {
                    elem[idtable] = body[idtable];
                    elem['fechaYHoraInicioPedidoProducto'] = elem['fechaYHoraInicioPedidoProducto'] | fecha;
                    if ( elem[idtable9] != null ) {
                        await ProductoModelo.findOne({ where: {[idtable9]: elem[idtable9]}}).then( async (producto) => {
                            if(!producto || producto == 0) {
                                locals.detalles.push({
                                    ['title']: `No existe ${legend9} con id ${idtable9}`,
                                    ['tipo']: 2
                                })
                            } else {
                                await DetallePedidoProductoModelo.create(elem).then((resp) => {
                                    console.log("CREAR  : +++++++++++++++++++++++++++++")
                                    if(!resp || resp == 0) {
                                        locals.detalles.push({
                                            ['title']: `Detalle NO creado: ${elem[idtable9]} con cantidad ${elem['cantidadPedidoProducto']}`,
                                            ['tipo']: 2
                                        })
                                    } else {
                                        locals.detalles.push({
                                            ['title']: `Detalle creado: ${elem[idtable9]} con cantidad ${elem['cantidadPedidoProducto']}`,
                                            ['tipo']: 1
                                        })
                                    }
                                })
                            }
                        })
                    } else if ( elem[idtable11] != null ) {
                        await MenuPromocionModelo.findOne({ where: {[idtable11]: elem[idtable11]}}).then( async (menupromocion) => {
                            if(!menupromocion || menupromocion == 0) {
                                locals.detalles.push({
                                    ['title']: `No existe ${legend11} con id ${idtable11}.`,
                                    ['tipo']: 2
                                })
                            } else {
                                await DetallePedidoProductoModelo.create(elem).then((resp) => {
                                    console.log("CREAR  : +++++++++++++++++++++++++++++")
                                    if(!resp || resp == 0) {
                                        locals.detalles.push({
                                            ['title']: `Detalle NO creado: ${elem[idtable11]} con cantidad ${elem['cantidadPedidoProducto']}`,
                                            ['tipo']: 2
                                        })
                                    } else {
                                        locals.detalles.push({
                                            ['title']: `Detalle creado: ${elem[idtable11]} con cantidad ${elem['cantidadPedidoProducto']}`,
                                            ['tipo']: 1
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        locals.detalles.push({
                            ['title']: `Detalle posicion ${i} falta mandar idMenuPromocion o idProducto`,
                            ['tipo']: 2
                        })
                        console.log("Falta idMenuPromocion o idProducto  : +++++++++++++++++++++++++++++")
                    }
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

module.exports = PedidoController;