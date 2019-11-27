"use strict";

require('../../config');
const tratarError = require("../../middlewares/handleError"),
    EstadiaModelo = require("./estadia-model"),
    EstadiaController = () => {},
    attributes = require('../attributes'),
    fechaArgentina = require("../../middlewares/fechaArgentina"),
    UsuarioModelo = require("../usuario/usuario-model"),
    EstadiaEstadoModelo = require("../estadiaestado/estadiaestado-model"),
    EstadoEstadiaModelo = require("../estadoestadia/estadoestadia-model"),
    DetalleEstadiaMesaModelo = require("../detalleestadiamesa/detalleestadiamesa-model"),
    MesaModelo = require("../mesa/mesa-model"),
    PedidoModelo = require("../pedido/pedido-model"),
    ComensalModelo = require("../comensal/comensal-model"),
    ClienteEstadiaModelo = require("../clienteestadia/clienteestadia-model"),
    MozoEstadiaModelo = require("../mozoestadia/mozoestadia-model"),
    ReservaModelo = require("../reserva/reserva-model"),
    PedidoEstadoModelo = require("../pedidoestado/pedidoestado-model"),
    EstadoPedidoModelo = require("../estadopedido/estadopedido-model"),
    DetallePedidoProductoModelo = require("../detallepedidoproducto/detallepedidoproducto-model"),
    ProductoModelo = require("../producto/producto-model"),
    MenuPromocionModelo = require("../menupromocion/menupromocion-model"),
    PrecioProductoModelo = require("../precioproducto/precioproducto-model"),
    TipoMonedaModelo = require("../tipomoneda/tipomoneda-model"),
    PrecioMenuPromocionModelo = require("../preciomenupromocion/preciomenupromocion-model"),
    TipoMenuPromocionModelo = require("../tipomenupromocion/tipomenupromocion-model"),

    legend = "Estadia",
    legend2 = "EstadiaEstado",
    legend3 = "EstadoEstadia",
    legend4 = "Mesa",
    legend5 = "Usuario",
    legend6 = "Comensal",
    legend7 = "DetalleEstadiaMesa",
    legend8 = "Pedido",
    legend9 = "MozoEstadia",
    legend10 = "ClienteEstadia",

    idtable = `id${legend}`,
    idtable2 = `id${legend2}`,
    idtable3 = `id${legend3}`,
    idtable4 = `id${legend4}`,
    idtable5 = `id${legend5}`,
    idtable6 = `id${legend6}`,
    idtable7 = `id${legend7}`,
    idtable8 = `id${legend8}`,
    idtable9 = `id${legend9}`,
    idtable10 = `id${legend9}`,

    nombretable = `id${legend}`,
    Sequelize = require('sequelize'),
    Op = Sequelize.Op;

EstadiaController.getToAllAttributes = (req, res, next) => {
    let locals = {};
    EstadiaModelo.findAll({
        where: {
            [Op.or]: [{
                    idEstadia: {
                        [Op.eq]: req.params.anyAttribute
                    }
                },
                {
                    idReserva: {
                        [Op.eq]: req.params.anyAttribute
                    }
                },
                Sequelize.literal("`estadiaestados->estadoestadium`.`nombreEstadoEstadia` LIKE '%" + req.params.anyAttribute + "%'"),
            ]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
                include: [{
                        model: PedidoEstadoModelo,
                        attributes: attributes.pedidoestado,
                        where: { fechaYHoraBajaPedidoEstado: null },
                        include: [{
                            model: EstadoPedidoModelo,
                            attributes: attributes.estadopedido
                        }]
                    },
                    {
                        model: DetallePedidoProductoModelo,
                        attributes: attributes.detallepedidoproducto,
                        include: [{
                                model: ProductoModelo,
                                attributes: attributes.producto,
                                include: [{
                                    model: PrecioProductoModelo,
                                    where: { fechaYHoraHastaPrecioProducto: null },
                                    attributes: attributes.precioproducto,
                                    include: [{
                                        model: TipoMonedaModelo,
                                        attributes: attributes.tipomoneda
                                    }]
                                }, ]
                            },
                            {
                                model: MenuPromocionModelo,
                                attributes: attributes.menupromocion,
                                include: [{
                                    model: PrecioMenuPromocionModelo,
                                    where: { fechaYHoraHastaPrecioMenuPromocion: null },
                                    attributes: attributes.preciomenupromocion,
                                    include: [{
                                            model: TipoMonedaModelo,
                                            attributes: attributes.tipomoneda
                                        }]
                                    },
                                    {
                                        model: TipoMenuPromocionModelo,
                                        attributes: attributes.tipomenupromocion
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
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(project => {
        if (!project || project == 0) {
            locals['title'] = `No existe registro con valor : ${req.params["anyAttribute"]}.`;
            locals['tipo'] = 2;
        } else {
            locals['title'] = `${legend}`;
            locals['data'] = project;
            locals['tipo'] = 1;
        }
        res.json(locals);
    });
};

EstadiaController.getToName = (req, res, next) => {
    let locals = {};
    console.log(req.params)
    EstadiaModelo.findAll({
        where: {
            [nombretable]: {
                [Op.substring]: req.params[nombretable]
            }
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
                include: [{
                        model: PedidoEstadoModelo,
                        attributes: attributes.pedidoestado,
                        where: { fechaYHoraBajaPedidoEstado: null },
                        include: [{
                            model: EstadoPedidoModelo,
                            attributes: attributes.estadopedido
                        }]
                    },
                    {
                        model: DetallePedidoProductoModelo,
                        attributes: attributes.detallepedidoproducto,
                        include: [{
                                model: ProductoModelo,
                                attributes: attributes.producto,
                                include: [{
                                    model: PrecioProductoModelo,
                                    where: { fechaYHoraHastaPrecioProducto: null },
                                    attributes: attributes.precioproducto,
                                    include: [{
                                        model: TipoMonedaModelo,
                                        attributes: attributes.tipomoneda
                                    }]
                                }, ]
                            },
                            {
                                model: MenuPromocionModelo,
                                attributes: attributes.menupromocion,
                                include: [{
                                    model: PrecioMenuPromocionModelo,
                                    where: { fechaYHoraHastaPrecioMenuPromocion: null },
                                    attributes: attributes.preciomenupromocion,
                                    include: [{
                                            model: TipoMonedaModelo,
                                            attributes: attributes.tipomoneda
                                        }]
                                    },
                                    {
                                        model: TipoMenuPromocionModelo,
                                        attributes: attributes.tipomenupromocion
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
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
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

EstadiaController.getAll = (req, res) => {
    let locals = {};
    EstadiaModelo.findAll({
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
                include: [{
                        model: PedidoEstadoModelo,
                        attributes: attributes.pedidoestado,
                        where: { fechaYHoraBajaPedidoEstado: null },
                        include: [{
                            model: EstadoPedidoModelo,
                            attributes: attributes.estadopedido
                        }]
                    },
                    {
                        model: DetallePedidoProductoModelo,
                        attributes: attributes.detallepedidoproducto,
                        include: [{
                                model: ProductoModelo,
                                attributes: attributes.producto,
                                include: [{
                                    model: PrecioProductoModelo,
                                    where: { fechaYHoraHastaPrecioProducto: null },
                                    attributes: attributes.precioproducto,
                                    include: [{
                                        model: TipoMonedaModelo,
                                        attributes: attributes.tipomoneda
                                    }]
                                }, ]
                            },
                            {
                                model: MenuPromocionModelo,
                                attributes: attributes.menupromocion,
                                include: [{
                                    model: PrecioMenuPromocionModelo,
                                    where: { fechaYHoraHastaPrecioMenuPromocion: null },
                                    attributes: attributes.preciomenupromocion,
                                    include: [{
                                            model: TipoMonedaModelo,
                                            attributes: attributes.tipomoneda
                                        }]
                                    },
                                    {
                                        model: TipoMenuPromocionModelo,
                                        attributes: attributes.tipomenupromocion
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
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
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

EstadiaController.getOne = (req, res) => {
    let locals = {};
    EstadiaModelo.findOne({
        where: {
            [idtable]: req.params[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
                include: [{
                        model: PedidoEstadoModelo,
                        attributes: attributes.pedidoestado,
                        where: { fechaYHoraBajaPedidoEstado: null },
                        include: [{
                            model: EstadoPedidoModelo,
                            attributes: attributes.estadopedido
                        }]
                    },
                    {
                        model: DetallePedidoProductoModelo,
                        attributes: attributes.detallepedidoproducto,
                        include: [{
                                model: ProductoModelo,
                                attributes: attributes.producto,
                                include: [{
                                    model: PrecioProductoModelo,
                                    where: { fechaYHoraHastaPrecioProducto: null },
                                    attributes: attributes.precioproducto,
                                    include: [{
                                        model: TipoMonedaModelo,
                                        attributes: attributes.tipomoneda
                                    }]
                                }, ]
                            },
                            {
                                model: MenuPromocionModelo,
                                attributes: attributes.menupromocion,
                                include: [{
                                    model: PrecioMenuPromocionModelo,
                                    where: { fechaYHoraHastaPrecioMenuPromocion: null },
                                    attributes: attributes.preciomenupromocion,
                                    include: [{
                                            model: TipoMonedaModelo,
                                            attributes: attributes.tipomoneda
                                        }]
                                    },
                                    {
                                        model: TipoMenuPromocionModelo,
                                        attributes: attributes.tipomenupromocion
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
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
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

EstadiaController.create = (req, res) => {
    let body = req.body;
    let locals = {};
    EstadoEstadiaModelo.findOne({
        where: {
            [idtable3]: 1
        }
    }).then( async responses => {
        if (!responses || responses == 0) {
            locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            UsuarioModelo.findOne({
                where: {
                    [idtable5]: body[idtable5]
                }
            }).then( async responses => {
                if (!responses || responses == 0) {
                    locals['title'] = `No existe instancia de ${legend5} con ${idtable5}: ${body[idtable5]}.`;
                    locals['tipo'] = 2;
                    res.json(locals);
                } else {
                    let idEstadia;
                    body['fechaYHoraInicioEstadia'] = fechaArgentina.getFechaArgentina();
                    await EstadiaModelo.create(body).then( async result => {
                        if (!result || result == 0) {
                            locals['title'] = `No se pudo crear ${legend} con id ${body[idtable]}.`;
                            locals['tipo'] = 2;
                        } else {
                            idEstadia = result[idtable];
                            locals['title'] = `${legend} creada.`;
                            locals['data'] = result;
                            locals['id'] = result[idtable];
                            locals['tipo'] = 1;
                            let pushEstadiaEstado = {};
                            pushEstadiaEstado['descripcionEstadiaEstado'] = body['descripcionEstadiaEstado'] || "Reciente.";
                            pushEstadiaEstado[idtable] = result[idtable];
                            pushEstadiaEstado['fechaYHoraAltaEstadiaEstado'] = fechaArgentina.getFechaArgentina();
                            pushEstadiaEstado[idtable3] = 1;
                            await EstadiaEstadoModelo.create(pushEstadiaEstado).then( async response => {
                                locals
                                locals['title'] = `${legend} creado. ${legend2} creado.`;
                                locals['data'] = response;
                                locals['tipo'] = 1;
                                let pushMozoEstadia = {};
                                pushMozoEstadia['descripcionMozoEstadia'] = body['descripcionMozoEstadia'] || "Mozo Asignado.";
                                pushMozoEstadia[idtable] = idEstadia;
                                pushMozoEstadia['fechaYHoraInicioMozoEstadia'] = fechaArgentina.getFechaArgentina();
                                pushMozoEstadia[idtable5] = body[idtable5];
                                MozoEstadiaModelo.create(pushMozoEstadia).then(mozoestadia => {
                                    if (!mozoestadia || mozoestadia == 0) {
                                        locals['title2'] = `No se pudo crear ${legend9}.`;
                                        locals['tipo2'] = 2;
                                        res.json(locals);
                                    } else {
                                        locals['title2'] = `Se creo correctamente Mozo Estadia.`;
                                        locals['tipo2'] = 1;
                                        locals['data2'] = mozoestadia;
                                        res.json(locals);
                                    }
                                }).catch((error ) => {
                                    locals = tratarError.tratarError(error, legend);
                                    res.json(locals);
                                })
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
    })
};

EstadiaController.actualizarDatos = (req, res) => {
    let locals = {};
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            EstadiaModelo.update(body, {
                where: {
                    [idtable]: body[idtable]
                }
            }).then(result => {
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

EstadiaController.cambiarEstado = (req, res) => {
    let locals = {};
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
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
                if (response.dataValues.estadiaestados[0].dataValues.estadoestadium[idtable3] != body[idtable3]) {
                    EstadoEstadiaModelo.findOne({
                        where: {
                            [idtable3]: body[idtable3]
                        }
                    }).then((estadoestadia) => {
                        if (!estadoestadia || estadoestadia == 0) {
                            locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
                            locals['tipo'] = 2;
                            res.json(locals);
                        } else {
                            let pushEstadiaEstado = {};
                            pushEstadiaEstado['fechaYHoraBajaEstadiaEstado'] = fechaArgentina.getFechaArgentina();
                            EstadiaEstadoModelo.update(pushEstadiaEstado, {
                                where: {
                                    [idtable]: body[idtable],
                                    fechaYHoraBajaEstadiaEstado: null
                                }
                            }).then((respons) => {
                                if (!respons || respons == 0) {
                                    locals['title'] = `No existe ${legend2} habilitado.`;
                                    locals['tipo'] = 2;
                                    res.json(locals);
                                } else {
                                    body['fechaYHoraAltaEstadiaEstado'] = fechaArgentina.getFechaArgentina();
                                    EstadiaEstadoModelo.create(body).then((resp) => {
                                        if (!resp || resp == 0) {
                                            locals['title'] = `No se pudo crear ${legend2}.`;
                                            locals['tipo'] = 2;
                                        } else {
                                            locals['title'] = `Se realizo correctamente el cambio de Estado.`;
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
                } else {
                    locals['title'] = `${legend} ya se encuentra en ese Estado.`;
                    locals['tipo'] = 2;
                    res.json(locals);
                }
            }
        }
    });
};

EstadiaController.editarMesa = (req, res) => {
    var locals = { detalles: [] };
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(async response => {
        if (!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${idtable}`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let i = 1;
            for (let elem of body.detalle) {
                if (elem['idDetalleEstadiaMesa']) {
                    if (elem['baja'] == true) {
                        console.log("BORRAR   :---------------------------")
                        await DetalleEstadiaMesaModelo.destroy({
                            where: {
                                [idtable7]: elem[idtable7]
                            }
                        }).then((resp) => {
                            if (!resp || resp == 0) {
                                locals.detalles.push({
                                    ['title']: `Detalle NO eliminado con ${[idtable7]} = ${elem[[idtable7]]}`,
                                    ['tipo']: 2
                                })
                            } else {
                                locals.detalles.push({
                                    ['title']: `Detalle eliminado con ${[idtable7]} = ${elem[[idtable7]]}`,
                                    ['tipo']: 1
                                })
                            }
                        })
                    }
                } else {
                    elem[idtable] = body[idtable];
                    if (elem[idtable4] != null) {
                        await MesaModelo.findOne({
                            where: {
                                [idtable4]: elem[idtable4]
                            }
                        }).then(async(mesa) => {
                            if (!mesa || mesa == 0) {
                                locals.detalles.push({
                                    ['title']: `No existe ${legend4} con id ${idtable4}`,
                                    ['tipo']: 2
                                })
                            } else {
                                await DetalleEstadiaMesaModelo.findOne({
                                    where: {
                                        [idtable4]: elem[idtable4],
                                        [idtable]: body[idtable]
                                    }
                                }).then(async(detalleestadiamesa) => {
                                    if (!detalleestadiamesa || detalleestadiamesa == 0) {
                                        await DetalleEstadiaMesaModelo.create(elem).then((resp) => {
                                            if (!resp || resp == 0) {
                                                locals.detalles.push({
                                                    ['title']: `Detalle NO creado: ${elem[idtable4]}`,
                                                    ['tipo']: 2
                                                })
                                            } else {
                                                locals.detalles.push({
                                                    ['title']: `Detalle creado: ${elem[idtable4]}`,
                                                    ['tipo']: 1
                                                })
                                            }
                                        })
                                    } else {
                                        locals.detalles.push({
                                            ['title']: `No existe ${legend4} con id ${idtable4}`,
                                            ['tipo']: 2
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        locals.detalles.push({
                            ['title']: `Detalle posicion ${i} falta mandar idMesa`,
                            ['tipo']: 2
                        })
                    }
                }
                if (Object.keys(body.detalle).length == i) {
                    let correcto = true;
                    for (let elem of locals.detalles) {
                        if (elem.tipo == 2) {
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

EstadiaController.editarComensal = (req, res) => {
    let locals = { detalles: [], pedidos: [] };
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(async response => {
        if (!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            if ( body.eliminar ) {
                let idComen = body.detalle[0].idComensal;
                await PedidoModelo.findAll(  {where: { idComensal: idComen },
                    attributes: attributes.pedido,
                    include: [{
                            model: PedidoEstadoModelo,
                            attributes: attributes.pedidoestado,
                            where: { fechaYHoraBajaPedidoEstado: null }
                        }]}).then( async pedidos => {
                  let eliminarPedidos = true;
                  for (let ped of pedidos) {
                    locals.pedidos.push({
                        ['title']: `Pedido N° ${ped.dataValues.idPedido} en estado N° ${ped.dataValues.pedidoestados[0].dataValues.idEstadoPedido}`
                    })
                    let nroEstadoPedido = ped.dataValues.pedidoestados[0].dataValues.idEstadoPedido;
                    if ( nroEstadoPedido >= 5 ) {
                        eliminarPedidos = false;
                    }
                  }
                  if (eliminarPedidos) {
                        for (let ped of pedidos) {
                          let pedido = ped.dataValues;
                          let pushPedidoEstado = { fechaYHoraBajaPedidoEstado: fechaArgentina.getFechaArgentina()};
                          await PedidoEstadoModelo.update(pushPedidoEstado , { where: { idPedido: pedido.idPedido, fechaYHoraBajaPedidoEstado: null }}).then( async (respons) => {
                            if(!respons || respons == 0) {
                              locals.detalles.push({
                              ['title'] : `No existe Pedido Estado habilitado para el pedido N° ${pedido.idPedido}.`,
                              ['tipo'] : 2
                              })
                            } else {
                              let pathNuevoPedido = { 
                                fechaYHoraAltaPedidoEstado: fechaArgentina.getFechaArgentina(),
                                idPedido: pedido.idPedido,
                                idEstadoPedido: 2
                              }
                                await PedidoEstadoModelo.create(pathNuevoPedido).then( async (resp) => {
                                    if (!resp || resp == 0 ){
                                      locals.detalles.push({
                                       ['title']: `No se pudo anular Pedido.`,
                                       ['tipo']: 2
                                      })
                                    } else {
                                      locals.detalles.push({
                                       ['title'] : `Se anulo correctamente el Pedido.`,
                                       ['tipo'] : 1
                                      })
                                    }
                                }).catch((error) => {
                                  locals.detalles.push(tratarError.tratarError(error, legend));
                                });
                            }
                            }).catch((error) => {
                              locals.detalles.push(tratarError.tratarError(error, legend));
                            });
                        }
                        await ComensalModelo.update( {idEstadia: null} ,{ where: { idComensal: idComen }}).then( async resp => {
                          if(!resp || resp == 0) {
                            locals.detalles.push({
                                ['title']: `Comensal NO eliminado`,
                                ['tipo']: 2
                            })
                          } else {
                              locals.detalles.push({
                                  ['title']: `Comensal eliminado`,
                                  ['tipo']: 1
                              })
                          }
                            let correcto = true;
                            if ( locals.detalles != null ) {
                              for (let elem of locals.detalles) {
                                  if (elem.tipo == 2){
                                      correcto = false
                                  }
                              }
                            } else {
                              correcto = false
                            }
                            if (correcto) {
                                locals['title'] =  'Comensal Eliminado correctamente con sus asociaciones de Pedidos.';
                                locals['tipo'] =  1;
                            } else {
                                locals['title'] =  'No se pudo eliminar todos los registros del Comensal.';
                                locals['tipo'] =  2;
                            }
                            res.json(locals);
                        })
                  } else {
                    console.log("ACA")
                    locals['title'] = 'No se pudo eliminar el Comensal por tener pedidos asociados en estados reservados.';
                    locals['tipo'] = 2;
                    res.json(locals)
                  }
                })
              } else {
                let i = 1;
                for (let elem of body.detalle) {
                    if (elem[idtable6]) {
                        if (elem['baja'] == true) {
                            await ComensalModelo.destroy({where: { [idtable6]: elem[idtable6]} }).then((resp) => {
                                if (!resp || resp == 0) {
                                    locals.detalles.push({
                                        ['title']: `Comensal NO eliminado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                                        ['tipo']: 2
                                    })
                                } else {
                                    locals.detalles.push({
                                        ['title']: `Comensal eliminado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                                        ['tipo']: 1
                                    })
                                }
                            }).catch((error) => {
                                locals.detalles.push( tratarError.tratarError(error, legend))
                              });
                        } else {
                            await ComensalModelo.update(elem, {where: {[idtable6]: elem[idtable6]}}).then((resp) => {
                                if (!resp || resp == 0) {
                                    locals.detalles.push({
                                        ['title']: `Comensal NO editado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                                        ['tipo']: 2
                                    })
                                } else {
                                    locals.detalles.push({
                                        ['title']: `Comensal editado con ${[idtable6]} = ${elem[[idtable6]]}.`,
                                        ['tipo']: 1
                                    })
                                }
                            })
                        }
                    } else {
                        elem[idtable] = body[idtable];
                        await ComensalModelo.findOne({
                            where: {
                                [idtable]: elem[idtable],
                                aliasComensal: elem['aliasComensal']
                            }
                        }).then(async(Comensal) => {
                            if (!Comensal || Comensal == 0) {
                                await ComensalModelo.create(elem).then((resp) => {
                                    if (!resp || resp == 0) {
                                        locals.detalles.push({
                                            ['title']: `Comensal NO creado: ${elem[idtable6]}.`,
                                            ['tipo']: 2
                                        })
                                    } else {
                                        locals.detalles.push({
                                            ['title']: `Comensal creado: ${elem[idtable6]}.`,
                                            ['data']: resp,
                                            ['tipo']: 1
                                        })
                                    }
                                }).catch((error) => {
                                    locals.detalles.push( tratarError.tratarError(error, legend));
                                });
                            } else {
                                locals.detalles.push({
                                    ['title']: `Ya existe ${legend6} con id ${idtable6}.`,
                                    ['tipo']: 2
                                })
                            }
                        })
                    }
                    if (Object.keys(body.detalle).length == i) {
                        let correcto = true;
                        if ( locals.detalles != null ) {
                            for (let elem of locals.detalles) {
                                if (elem.tipo == 2) {
                                    correcto = false
                                }
                            }
                        } else {
                            correcto = false;
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
        }
    });
};

EstadiaController.editarClienteEstadia = (req, res) => {
    let locals = { detalles: [] };
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(async response => {
        if (!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${idtable}.`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            let i = 1;
            for (let elem of body.detalle) {
                if (elem['idClienteEstadia']) {
                    if (elem['baja'] == true) {
                        console.log("BORRAR   :---------------------------")
                        await ClienteEstadiaModelo.destroy({
                            where: {
                                [idtable10]: elem[idtable10]
                            }
                        }).then((resp) => {
                            if (!resp || resp == 0) {
                                locals.detalles.push({
                                    ['title']: `Detalle NO eliminado con ${[idtable10]} = ${elem[[idtable10]]}.`,
                                    ['tipo']: 2
                                })
                            } else {
                                locals.detalles.push({
                                    ['title']: `Detalle eliminado con ${[idtable10]} = ${elem[[idtable10]]}.`,
                                    ['tipo']: 1
                                })
                            }
                        })
                    }
                } else {
                    elem[idtable] = body[idtable];
                    if (elem[idtable5] != null) {
                        await UsuarioModelo.findOne({
                            where: {
                                [idtable5]: elem[idtable5]
                            }
                        }).then(async(usuario) => {
                            if (!usuario || usuario == 0) {
                                locals.detalles.push({
                                    ['title']: `No existe ${legend5} con id ${idtable5}: ${elem[idtable5]}.`,
                                    ['tipo']: 2
                                })
                            } else {
                                await ClienteEstadiaModelo.findOne({
                                    where: {
                                        [idtable5]: elem[idtable5],
                                        [idtable]: elem[idtable]
                                    }
                                }).then(async(clienteestadia) => {
                                    if (!clienteestadia || clienteestadia == 0) {
                                        await ClienteEstadiaModelo.create(elem).then((resp) => {
                                            if (!resp || resp == 0) {
                                                locals.detalles.push({
                                                    ['title']: `Detalle NO creado: ${elem[idtable5]}.`,
                                                    ['tipo']: 2
                                                })
                                            } else {
                                                locals.detalles.push({
                                                    ['title']: `Detalle creado: ${elem[idtable5]}.`,
                                                    ['tipo']: 1
                                                })
                                            }
                                        })
                                    } else {
                                        locals.detalles.push({
                                            ['title']: `No existe ${legend10} con id ${idtable5}: ${elem[idtable5]}.`,
                                            ['tipo']: 2
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        locals.detalles.push({
                            ['title']: `Detalle posicion ${i} falta mandar idMesa.`,
                            ['tipo']: 2
                        })
                    }
                }
                if (Object.keys(body.detalle).length == i) {
                    let correcto = true;
                    for (let elem of locals.detalles) {
                        if (elem.tipo == 2) {
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

EstadiaController.getToMesa = (req, res) => {
    let locals = {};
    let params = req.params;
    EstadiaModelo.findAll({
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    where: { nombreEstadoEstadia: 'Generada' },
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                where: {
                    idMesa: {
                        [Op.eq]: params.idMesa
                    }
                },
                attributes: attributes.detalleestadiamesa,
            },
        ],
    }).then(async projects => {
        if (!projects || projects == 0) {
            locals['title'] = `No existen registros de ${legend}.`;
            locals['tipo'] = 2;
        } else {
            await EstadiaModelo.findOne({
                where: {
                    [idtable]: projects[0].dataValues.idEstadia
                },
                attributes: attributes.estadia,
                include: [{
                        model: EstadiaEstadoModelo,
                        where: { fechaYHoraBajaEstadiaEstado: null },
                        attributes: attributes.estadiaestado,
                        include: [{
                            model: EstadoEstadiaModelo,
                            attributes: attributes.estadoestadia
                        }]
                    },
                    {
                        model: DetalleEstadiaMesaModelo,
                        attributes: attributes.detalleestadiamesa,
                        include: [{
                            model: MesaModelo,
                            attributes: attributes.mesa
                        }]
                    },
                    {
                        model: ReservaModelo,
                        attributes: attributes.reserva,
                    },
                    {
                        model: PedidoModelo,
                        attributes: attributes.pedido,
                    },
                    {
                        model: ComensalModelo,
                        attributes: attributes.comensal,
                    },
                    {
                        model: ClienteEstadiaModelo,
                        attributes: attributes.clienteestadia,
                        include: [{
                            model: UsuarioModelo,
                            attributes: attributes.usuario
                        }]
                    },
                    {
                        model: MozoEstadiaModelo,
                        attributes: attributes.mozoestadia,
                        include: [{
                            model: UsuarioModelo,
                            attributes: attributes.usuario
                        }]
                    },
                ],
            }).then(async estadia => {
                if (!estadia || estadia == 0) {
                    locals['title'] = `No existen registros de ${legend}.`;
                    locals['tipo'] = 2;
                } else {
                    locals['title'] = `${legend}`;
                    locals['data'] = estadia;
                    locals['tipo'] = 1;
                }
            })
        }
        res.json(locals);
    });
}

EstadiaController.getToUsuario = (req, res) => {
    let locals = {};
    let params = req.params;
    EstadiaModelo.findAll({
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null, idEstadoEstadia: 1 },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                where: { idUsuario: params.idUsuario }
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(async projects => {
        if (!projects || projects == 0) {
            locals['title'] = `No existen registros de ${legend}.`;
            locals['tipo'] = 2;
        } else {
            await EstadiaModelo.findOne({
                where: {
                    [idtable]: projects[0].dataValues.idEstadia
                },
                attributes: attributes.estadia,
                include: [{
                        model: EstadiaEstadoModelo,
                        where: { fechaYHoraBajaEstadiaEstado: null },
                        attributes: attributes.estadiaestado,
                        include: [{
                            model: EstadoEstadiaModelo,
                            attributes: attributes.estadoestadia
                        }]
                    },
                    {
                        model: DetalleEstadiaMesaModelo,
                        attributes: attributes.detalleestadiamesa,
                        include: [{
                            model: MesaModelo,
                            attributes: attributes.mesa
                        }]
                    },
                    {
                        model: ReservaModelo,
                        attributes: attributes.reserva,
                    },
                    {
                        model: PedidoModelo,
                        attributes: attributes.pedido,
                    },
                    {
                        model: ComensalModelo,
                        attributes: attributes.comensal,
                    },
                    {
                        model: ClienteEstadiaModelo,
                        attributes: attributes.clienteestadia,
                        include: [{
                            model: UsuarioModelo,
                            attributes: attributes.usuario
                        }]
                    },
                    {
                        model: MozoEstadiaModelo,
                        attributes: attributes.mozoestadia,
                        include: [{
                            model: UsuarioModelo,
                            attributes: attributes.usuario
                        }]
                    },
                ],
            }).then(async estadia => {
                if (!estadia || estadia == 0) {
                    locals['title'] = `No existen registros de ${legend}.`;
                    locals['tipo'] = 2;
                } else {
                    locals['title'] = `${legend}`;
                    locals['data'] = estadia;
                    locals['tipo'] = 1;
                }
            })
        }
        res.json(locals);
    });
}

EstadiaController.cambiarMozoEstadia = (req, res) => {
    let locals = {};
    let body = req.body;
    EstadiaModelo.findOne({
        where: {
            [idtable]: body[idtable]
        },
        attributes: attributes.estadia,
        include: [{
                model: EstadiaEstadoModelo,
                where: { fechaYHoraBajaEstadiaEstado: null },
                attributes: attributes.estadiaestado,
                include: [{
                    model: EstadoEstadiaModelo,
                    attributes: attributes.estadoestadia
                }]
            },
            {
                model: DetalleEstadiaMesaModelo,
                attributes: attributes.detalleestadiamesa,
                include: [{
                    model: MesaModelo,
                    attributes: attributes.mesa
                }]
            },
            {
                model: ReservaModelo,
                attributes: attributes.reserva,
            },
            {
                model: PedidoModelo,
                attributes: attributes.pedido,
            },
            {
                model: ComensalModelo,
                attributes: attributes.comensal,
            },
            {
                model: ClienteEstadiaModelo,
                attributes: attributes.clienteestadia,
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
            {
                model: MozoEstadiaModelo,
                attributes: attributes.mozoestadia,
                where: { fechaYHoraFinMozoEstadia: null },
                include: [{
                    model: UsuarioModelo,
                    attributes: attributes.usuario
                }]
            },
        ],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
            locals['tipo'] = 2;
            res.json(locals);
        } else {
            if (!body[idtable5]) {
                locals['title'] = `No se envia ${legend5}.`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                UsuarioModelo.findOne({
                    where: { [idtable5]: body[idtable5]}
                }).then ( usuario => {
                    if (!usuario || usuario == 0) {
                        locals['title'] = `No existe ${legend5} con ${idtable5}: ${body[idtable5]}.`;
                        locals['tipo'] = 2;
                        res.json(locals);
                    } else {
                        if (response.dataValues.mozoestadia[0].dataValues[idtable5] != body[idtable5]) {
                            let pushEstadiaEstado = {};
                            pushEstadiaEstado['fechaYHoraFinMozoEstadia'] = fechaArgentina.getFechaArgentina();
                            MozoEstadiaModelo.update(pushEstadiaEstado, {
                                where: {
                                    [idtable]: body[idtable],
                                    fechaYHoraFinMozoEstadia: null
                                }
                            }).then((respons) => {
                                if (!respons || respons == 0) {
                                    locals['title'] = `No existe ${legend9} habilitado.`;
                                    locals['tipo'] = 2;
                                    res.json(locals);
                                } else {
                                    body['fechaYHoraInicioMozoEstadia'] = fechaArgentina.getFechaArgentina();
                                    MozoEstadiaModelo.create(body).then((resp) => {
                                        if (!resp || resp == 0) {
                                            locals['title'] = `No se pudo crear ${legend9}.`;
                                            locals['tipo'] = 2;
                                        } else {
                                            locals['title'] = `Se realizo correctamente el cambio de ${legend9}.`;
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
                        } else {
                            locals['title'] = `${legend} ya se encuentra con ese ${legend9}.`;
                            locals['tipo'] = 2;
                            res.json(locals);
                        }
                    }
                })
            }
        }
    });
};

module.exports = EstadiaController;