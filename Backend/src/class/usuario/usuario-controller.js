"use strict";

require('../../config');

const bcrypt = require('bcrypt'),
    UsuarioController = () => {},
    attributes = require('../attributes'),
    fechaArgentina = require("../../middlewares/fechaArgentina"),
    jwt = require('jsonwebtoken'),
    UsuarioModelo = require("./usuario-model"),
    UsuarioEstadoModelo = require("../usuarioestado/usuarioestado-model"),
    EstadoUsuarioModelo = require("../estadousuario/estadousuario-model"),
    DepartamentoModelo = require("../departamento/departamento-model"),
    RolModelo = require("../rol/rol-model"),
    RolUsuarioModelo = require("../rolusuario/rolusuario-model"),
    Sequelize = require('sequelize'),
    Op = Sequelize.Op,
    legend = "Usuario",
    legend2 = "UsuarioEstado",
    legend3 = "EstadoUsuario",
    legend4 = "RolUsuario",
    idtable = "idUsuario",
    cuittable = "cuitUsuario",
    idestadotable = "idEstadoUsuario",
    nombreEstado = "nombreEstadoUsuario",
    nombretable = "nombreUsuario";

UsuarioController.getToAllAttributes = (req, res, next) => {
    let locals = {};
    UsuarioModelo.findAll({
        where: {
            [Op.or]: [
                {nombreUsuario: {[Op.substring]: req.params.anyAttribute}},
                {apellidoUsuario: {[Op.substring]: req.params.anyAttribute}},
                {cuitUsuario: {[Op.substring]: req.params.anyAttribute}},
                {domicilioUsuario: {[Op.substring]: req.params.anyAttribute}},
                {emailUsuario: {[Op.substring]: req.params.anyAttribute}},
                {idUsuario: {[Op.substring]: req.params.anyAttribute}},
                {nroCelularUsuario: {[Op.substring]: req.params.anyAttribute}},
                Sequelize.literal("`departamento`.`nombreDepartamento` LIKE '%"+ req.params.anyAttribute + "%'"),
                Sequelize.literal("`rolusuarios->rol`.`nombreRol` LIKE '%" + req.params.anyAttribute + "%'"),
                Sequelize.literal("`usuarioestados->estadousuario`.`nombreEstadoUsuario` LIKE '%" + req.params.anyAttribute + "%'"),
            ],
        },
        attributes: attributes.usuario,
        include: [{
            model: UsuarioEstadoModelo,
            where: { fechaYHoraBajaUsuarioEstado: null },
            attributes: attributes.usuarioestado,
            include: [{
                model: EstadoUsuarioModelo,
                attributes: attributes.estadousuario,
            }]
            },
            {
            model: RolUsuarioModelo,
            where: { fechaYHoraBajaRolUsuario: null },
            attributes: attributes.rolusuario,
            include: [{
                model: RolModelo,
                attributes: attributes.rol,
            }]
            },
            {
                model: DepartamentoModelo,
                attributes: attributes.departamento,
            }
        ],
    }).then(project => {
        if (!project || project == 0) {
            locals['title'] = `No existe registro con valor : ${req.params.anyAttribute}`;
            locals['tipo'] = 2;
        } else {
            locals['title'] = `${legend}`;
            locals['data'] = project;
            locals['tipo'] = 1;
        }
        res.json(locals);
    });
};

UsuarioController.getToName = (req, res, next) => {
    let locals = {};
    UsuarioModelo.findAll({
        where: {
            [Op.or]: [
                {nombreUsuario: {[Op.substring]: req.params[nombretable]}},
                {apellidoUsuario: {[Op.substring]: req.params[nombretable]}},
            ]
        },
        attributes: attributes.usuario,
        include: [{
                model: UsuarioEstadoModelo,
                where: { fechaYHoraBajaUsuarioEstado: null },
                attributes: attributes.usuarioestado,
                include: [{
                    model: EstadoUsuarioModelo,
                    attributes: attributes.estadousuario
                }]
            },
            {
                model: RolUsuarioModelo,
                where: { fechaYHoraBajaRolUsuario: null },
                attributes: attributes.rolusuario,
                include: [{
                    model: RolModelo,
                    attributes: attributes.rol
                }]
            },
            {
                model: DepartamentoModelo,
                attributes: attributes.departamento
            }
        ],
    }).then(project => {
        if (!project || project == 0) {
            locals['title'] = `No existe registro con valor : ${req.params[nombretable]}`;
            locals['tipo'] = 2;
        } else {
            locals['title'] = `${legend}`;
            locals['data'] = project;
            locals['tipo'] = 1;
        }
        res.json(locals);
    });
};

UsuarioController.validateExistUser = (req, res) => {
    let locals = {};
    let body = req.body;
    UsuarioModelo.findOne({
        where: { cuitUsuario: body.cuitUsuario }
    })
    .then((response) => {
        if (!response) {
            locals['title'] = `${legend} no encontrado.`;
            locals['tipo'] = 1;
        } else {
            locals['title'] = `${legend} encontrado.`;
            locals['tipo'] = 2;
            locals['data'] = response;
            locals['descripcion'] = 'Cuit existente, ingrese otro.'
            locals['descripcion2'] = 'Usuario encontrado.'
        }
        res.json(locals)
    })
}

UsuarioController.login = (req, res) => {
    let locals = {};
    let body = req.body;
    UsuarioModelo.findOne({
        where: { cuitUsuario: body.cuitUsuario },
        attributes: attributes.usuario2,
        include: [{
                model: UsuarioEstadoModelo,
                where: { fechaYHoraBajaUsuarioEstado: null },
                attributes: attributes.usuarioestado,
                include: [{
                    model: EstadoUsuarioModelo,
                    attribute: [
                        'nombreEstadoUsuario'
                    ]
                }]
            },
            {
                model: RolUsuarioModelo,
                where: { fechaYHoraBajaRolUsuario: null },
                include: [{
                    model: RolModelo,
                    attribute: attributes.rol
                }]
            },
        ],
    }).then(response => {      
        if (response && response != 0) {
            if (bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario)) {
                if (response.dataValues.usuarioestados[0].estadousuario.dataValues.nombreEstadoUsuario != 'Activo') {
                    locals['title'] = `${legend} Suspendido o dado de Baja`;
                    locals['tipo'] = 3;
                } else {
                    let token = jwt.sign({
                            cuitUsuario: response.dataValues.cuitUsuario,
                            nombreUsuario: response.dataValues.nombreUsuario,
                            apellidoUsuario: response.dataValues.apellidoUsuario,
                            RolUsuario: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.nombreRol
                        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }) // 60 * 60 (hora) * 24 *30
                    locals['title'] = `${legend} Logueado`;
                    locals['tipo'] = 1;
                    locals['token'] = token;
                    locals['usuario'] = response.dataValues.idUsuario;
                    locals['rol'] = {nombreRol: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.idRol,
                                    idRol: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.nombreRol};
                    locals[legend2] = response;
                }
            } else {
                locals['title'] = `${legend} o (Contraseña) invalidos`;
                locals['tipo'] = 2;
            }
        } else {
            locals['title'] = `(${legend}) o Contraseña invalidos`;
            locals['tipo'] = 2;
        }
        res.json(locals);
    });
}

UsuarioController.getAll = (req, res) => {
    let locals = {};
    UsuarioModelo.findAll({
        attributes: attributes.usuario,
        include: [{
                model: UsuarioEstadoModelo,
                where: { fechaYHoraBajaUsuarioEstado: null },
                attributes: attributes.usuarioestado,
                include: [{
                    model: EstadoUsuarioModelo,
                    attributes: [
                        'nombreEstadoUsuario'
                    ]
                }]
            },
            {
                model: RolUsuarioModelo,
                where: { fechaYHoraBajaRolUsuario: null },
                attributes: attributes.rolusuario,
                include: [{
                    model: RolModelo,
                    attributes: [
                        'nombreRol'
                    ]
                }]
            },
            {
                model: DepartamentoModelo,
                attributes: [
                    'nombreDepartamento'
                ]
            }
        ],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existen registros de ${legend}`;
            locals['tipo'] = 2;
        } else {
            locals['title'] = `${legend}/s encontrado/s`;
            locals['data'] = response;
            locals['tipo'] = 1;
            locals[legend] = response;
        }
        res.json(locals);
    })
}

UsuarioController.getOne = (req, res) => {
    let locals = {};
    console.log("REQ ", req.params)
    UsuarioModelo.findOne({
        where: {[idtable]: req.params[idtable]},
        attributes: attributes.usuario,
        include: [{
                model: UsuarioEstadoModelo,
                where: { fechaYHoraBajaUsuarioEstado: null },
                attributes: attributes.usuarioestado,
                include: [{
                    model: EstadoUsuarioModelo,
                    attributes: attributes.estadousuario
                }]
            },
            {
                model: RolUsuarioModelo,
                where: { fechaYHoraBajaRolUsuario: null },
                attributes: attributes.rolusuario,
                include: [{
                    model: RolModelo,
                    attributes: attributes.rol
                }]
            },
            {
                model: DepartamentoModelo,
                attributes: attributes.departamento
            }
        ],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe el registro : ${req.params[idtable]}`;
            locals['tipo'] = 2;
        } else {
            locals[legend] = response.dataValues;
            locals['tipo'] = 1
        }
        res.json(locals);
    });
};

UsuarioController.getOneCuit = (req, res) => {
    let locals = {};
    UsuarioModelo.findOne({
        where: {[cuittable]: req.params[cuittable]},
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe el registro : ${req.params[cuittable]}`;
            locals['tipo'] = 2;
        } else {
            locals[legend] = response.dataValues;
            locals['tipo'] = 1;
        }
        res.json(locals)
    });
};

UsuarioController.create = (req, res) => {
    let locals = {};
    let body = req.body;
    if (body[idtable]) {
        UsuarioModelo.findOne({ where: {
                    [idtable]: body[idtable] } })
            .then(response => {
                if (!response || response == 0) {
                    EstadoUsuarioModelo.findOne({ where: {
                                [nombreEstado]: "Activo" } })
                        .then(response2 => {
                            if (!response2 || response2 == 0) {
                                locals.title = `No existe : ${legend3}`;
                                res.json(locals);
                            } else {
                                UsuarioModelo.findOne({ where: { "cuitUsuario": body.cuitUsuario } })
                                    .then(resp => {
                                        if (!resp || resp == 0) {
                                            locals.title = { descripcion: `${legend3} encontrada` };
                                            locals[legend3] = response2;
                                            body.contrasenaUsuario = bcrypt.hashSync(body.contrasenaUsuario, 10);
                                            // CREAMOS INSTANCIA USUARIO
                                            UsuarioModelo.create(body)
                                                .then(result => {
                                                    locals.title = { descripcion: `${legend} creado` };
                                                    locals[legend] = result;
                                                    let pushEstado;
                                                    pushEstado = {
                                                        [idestadotable]: response2[idestadotable],
                                                        [idtable]: result[idtable],
                                                        fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina()
                                                    };
                                                    // CREANDO INSTANCIA USUARIO ESTADO
                                                    UsuarioEstadoModelo.create(pushEstado)
                                                        .then(result => {
                                                            locals.title = {
                                                                descripcion: `${legend} creado , ${legend2} creado`
                                                            };
                                                            locals[legend2] = result;
                                                        });
                                                    let pushRol;
                                                    if (body['idRol']) {
                                                        pushRol = {
                                                            idRol: body.idRol,
                                                            [idtable]: result[idtable],
                                                            fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                                        };
                                                    } else {
                                                        pushRol = {
                                                            idRol: 5,
                                                            [idtable]: result[idtable],
                                                            fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                                        };
                                                    }
                                                    RolUsuarioModelo.create(pushRol)
                                                        .then(result => {
                                                            locals.title = {
                                                                descripcion: `${legend} creado.`
                                                            };
                                                            locals[legend4] = result;
                                                            res.json(locals);
                                                        });
                                                });
                                        } else {
                                            locals.title = `Ya Existe un Registro ${legend} con cuit ${body.cuitUsuario}`;
                                            res.json(locals);
                                        }
                                    })
                            }
                        });
                } else {
                    let locals = {
                        title: `El Registro ${legend} con id ${body[idtable]} ya existe`
                    };
                    res.json(locals);
                }
            });
    } else {
        // SI CREAMOS SIN MANDAR ID DE USUARIO GENERANDOSE AUTOMATICAMENTE EL ID
        // BUSCA SI EXISTE ESTADO DE USUARIO
        EstadoUsuarioModelo.findOne({ where: { nombreEstadoUsuario: "Activo" } })
        .then(response => {
            if (!response || response == 0) {
                locals.title = ` No existe : ${legend3} `;
                locals['tipo'] = 2
                res.json(locals);
            } else {
                UsuarioModelo.findOne({ where: { "cuitUsuario": body.cuitUsuario } })
                .then(resp => {
                    if (!resp || resp == 0) {
                        locals.title = { descripcion: `${legend3} encontrada` };
                        locals[legend3] = response;
                        locals['tipo'] = 2
                        body.contrasenaUsuario = bcrypt.hashSync(body.contrasenaUsuario, 10);
                        // CREAMOS INSTANCIA USUARIO
                        UsuarioModelo.create(body)
                        .then(result => {
                            locals.title = `${legend} creado Correctamente`;
                            locals[legend] = result;
                            locals['tipo'] = 1
                                // -------
                            let pushEstado;
                            if (body.idEstadoUsuario) {
                                pushEstado = {
                                    [idestadotable]: body.idEstadoUsuario,
                                    [idtable]: result[idtable],
                                    fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina()
                                };
                            } else {
                                pushEstado = {
                                    [idestadotable]: response[idestadotable],
                                    [idtable]: result[idtable],
                                    fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina()
                                };
                            }
                            // CREANDO INSTANCIA USUARIO ESTADO
                            UsuarioEstadoModelo.create(pushEstado)
                            .then(result => {
                                let descripcion2 = `${legend} creado , ${legend2} creado`
                                locals['descripcion2'] = descripcion2
                                locals[legend2] = result;
                            });
                            // ------
                            let pushRol;
                            if (body.idRol) {
                                pushRol = {
                                    idRol: body.idRol,
                                    [idtable]: result[idtable],
                                    fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                };
                            } else {
                                pushRol = {
                                    idRol: 5,
                                    [idtable]: result[idtable],
                                    fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                };
                            }
                            RolUsuarioModelo.create(pushRol)
                            .then(result => {
                                locals.title = {
                                    descripcion: `${legend} creado.`
                                };
                                locals[legend4] = result;
                                res.json(locals);
                            });
                        });
                    } else {
                        locals.title = `Ya Existe un Registro ${legend} con cuit ${body.cuitUsuario}`;
                        locals['tipo'] = 2
                        res.json(locals);
                    }
                })
            }
        });
    }
};

UsuarioController.update = (req, res) => {
    let locals = {};
    let body = req.body;
    if (body[idtable]) {
        // SI CREAMOS MANDANDO ID DE USUARIO
        // BUSCA SI EXISTE USUARIO
        UsuarioModelo.findOne({
            where: {
                [idtable]: body[idtable] },
            attributes: attributes.usuario2,
            include: [{
                    model: UsuarioEstadoModelo,
                    where: { fechaYHoraBajaUsuarioEstado: null },
                    attributes: attributes.usuarioestado,
                    include: [{
                        model: EstadoUsuarioModelo,
                        attributes: attributes.estadousuario
                    }]
                },
                {
                    model: RolUsuarioModelo,
                    where: { fechaYHoraBajaRolUsuario: null },
                    attributes: attributes.rolusuario,
                    include: [{
                        model: RolModelo,
                        attributes: attributes.rol
                    }]
                },
                {
                    model: DepartamentoModelo,
                    attributes: attributes.departamento
                }
            ],
        }).then(response => {
            if (!response || response == 0) {
                // BUSCA SI EXISTE ESTADO DE USUARIO
                locals.title = `No existe ${legend} con id ${body[idtable]}`;
                res.json(locals);
            } else {
                var actualizarRol = false;
                var actualizarEstado = false;
                var check = false;
                var pass = false;
                if (
                    body.cuitUsuario != response.dataValues.cuitUsuario ||
                    body.nombreUsuario != response.dataValues.nombreUsuario ||
                    body.apellidoUsuario != response.dataValues.apellidoUsuario ||
                    body.dniUsuario != response.dataValues.dniUsuario ||
                    body.domicilioUsuario != response.dataValues.domicilioUsuario ||
                    body.emailUsuario != response.dataValues.emailUsuario ||
                    body.idDepartamento != response.dataValues.idDepartamento ||
                    body.nroCelularUsuario != response.dataValues.nroCelularUsuario ||
                    body.nroTelefonoUsuario != response.dataValues.nroTelefonoUsuario
                ) {
                    check = true
                }
                if (body.idEstadoUsuario && (body.idEstadoUsuario != response.dataValues.usuarioestados[0].dataValues.estadousuario.dataValues.idEstadoUsuario)) {
                    check = true;
                    actualizarEstado = true;
                }
                if (body.idRol && (body.idRol != response.dataValues.rolusuarios[0].dataValues.rol.dataValues.idRol)) {
                    actualizarRol = true;
                    check = true;
                }
                if (!body.contrasenaUsuario) {
                    body['contrasenaUsuario'] = response.dataValues.contrasenaUsuario
                } else {
                    if (bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario)) {
                        body.contrasenaUsuario = response.dataValues.contrasenaUsuario
                    } else {
                        pass = true;
                        check = true;
                    }
                }
                // GUARDANDO
                if (check) {
                    if (pass) {
                        console.log("cambiando Contraseña")
                        body.contrasenaUsuario = bcrypt.hashSync(body.contrasenaUsuario, 10);
                    }
                    UsuarioModelo.update(body, {
                        where: {
                            [idtable]: body[idtable]
                        }
                    }).then(result => {
                        //----------------------------------------
                        if (actualizarEstado) {
                            console.log("ACTUALIZANDO ESTADP")
                            UsuarioEstadoModelo.update({ fechaYHoraBajaUsuarioEstado: Date() }, {
                                    where: {
                                        [idtable]: body[idtable], fechaYHoraBajaUsuarioEstado: null }
                                })
                                .then((resp) => {
                                    if (!resp || resp == 0) {
                                        locals.title = "Error al Eliminar EstadoUsuario"
                                        res.json(locals)
                                    } else {
                                        console.log("ELIMINADO ESTADO ANTIGUO")
                                        locals.estado = "Actualizado Estado";
                                        let pushEstado;
                                        if (body.idEstadoUsuario) {
                                            pushEstado = {
                                                [idestadotable]: body.idEstadoUsuario,
                                                [idtable]: body[idtable],
                                                fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina()
                                            };
                                        } else {
                                            pushEstado = {
                                                [idestadotable]: response[idestadotable],
                                                [idtable]: body[idtable],
                                                fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina()
                                            };
                                        }
                                            // CREANDO INSTANCIA USUARIO ESTADO
                                        UsuarioEstadoModelo.create(pushEstado)
                                            .then(result => {
                                                if (result) {
                                                    locals.title = {
                                                        descripcion: `${legend} creado , ${legend2} creado`
                                                    };
                                                    locals[legend2] = result;
                                                } else {
                                                    locals[legend2] = "nada";
                                                }
                                            });
                                    }
                                })
                        }
                        //----------------------------------------
                        if (actualizarRol) {
                            console.log("ACTUALIZANDO ROL")
                            RolUsuarioModelo.update({ fechaYHoraBajaRolUsuario: Date() }, {
                                    where: {
                                        [idtable]: body[idtable], fechaYHoraBajaRolUsuario: null }
                                })
                                .then((resp) => {
                                    if (!resp || resp == 0) {
                                        locals.title = "Error al Eliminar RolUsuario"
                                        res.json(locals)
                                    } else {
                                        locals.estado = "Actualizado Rol";
                                        let pushRol;
                                        if (body.idRol) {
                                            pushRol = {
                                                idRol: body.idRol,
                                                [idtable]: body[idtable],
                                                fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                            };
                                        } else {
                                            pushRol = {
                                                idRol: response.idRol,
                                                [idtable]: body[idtable],
                                                fechaYHoraAltaRolUsuario: fechaArgentina.getFechaArgentina()
                                            };
                                        }
                                        RolUsuarioModelo.create(pushRol)
                                            .then(result => {
                                                locals.title = {
                                                    descripcion: `${legend} creado.`
                                                };
                                                locals[legend4] = result;
                                            });
                                    }
                                })
                        }
                        let locals = {
                            title: `Registro ${legend} Actualizado`,
                            tipo: 1
                        };
                        res.json(locals);
                    });
                } else {
                    let locals = {
                        title: `No ha Modificado ningún Registro de ${legend}`,
                        tipo: 2
                    };
                    res.json(locals);
                }
            }
        });
    } else {
        locals.title = `No envio id de ${legend}`;
        res.json(locals);
    }
};

UsuarioController.delete = (req, res, next) => {
    console.log("ENTRANDO EN DELETE")
    let locals = {};
    UsuarioEstadoModelo.update({fechaYHoraBajaUsuarioEstado: Date()}, {
        where: { idUsuario: req.params[idtable], fechaYHoraBajaUsuarioEstado: null }
    }).then((resp) => {
        if (!resp || resp == 0) {
            locals['title'] = `Error al intentar encontrar Intermedia que este de Baja`;
            locals['tipo'] = 2;
            res.json(locals)
        } else {
            locals['title'] = `${legend2} Actualizada`;
            locals['tipo'] = 1;
            next()
        }
    })
}

UsuarioController.changeState = (req, res) => {
    let locals = {};
    EstadoUsuarioModelo.findOne({where: { nombreEstadoUsuario: 'Eliminado' }}).then(response => {
        let push = {
            [idestadotable]: response.dataValues[idestadotable],
            [idtable]: req.params[idtable],
            fechaYHoraAltaUsuarioEstado: fechaArgentina.getFechaArgentina(),
            descripcionUsuarioEstado: req.body['descripcionUsuarioEstado'] || 'Eliminado'
        };
        UsuarioEstadoModelo.create(push).then(result => {
            locals['title'] = `Cambio de estado de ${legend}, pasado a Eliminado.`;
            locals['tipo'] = 1;
            locals[legend2] = result;
            res.json(locals);
        });
    })
}

UsuarioController.destroy = (req, res) => {
    UsuarioModelo.destroy({
        where: {[idtable]: req.params[idtable]}}).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe el registro de ${legend}: ${req.params[idtable]}`;
            locals['tipo'] = 1;
        } else {
            locals['title'] = `${legend} Eliminado Fisicamente`;
            locals['tipo'] = 1;
        }
        res.json(locals);
    });
};

UsuarioController.validateUser = (req, res, next) => {
    let locals = {};
    // BUSCA EL USUARIO CON ID INGRESADO
    UsuarioModelo.findOne({
        where: {[idtable]: req.params[idtable] },
        include: [{
            model: UsuarioEstadoModelo,
            where: { fechaYHoraBajaUsuarioEstado: null },
            include: [{
                model: EstadoUsuarioModelo,
                where: { nombreEstadoUsuario: {
                        [Op.notLike]: req.body.estado } }
            }]
        }],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No se encuentra Estado del usuario Diferente a ${req.body.estado}`;
            locals['tipo'] = 2;
            res.json(locals)
        } else {
            next();
        }
    })
}

UsuarioController.recuperarDatosToken = (req, res) => {
    let locals = {};
    let body = req.body;
    let idUsuario = req.idUsuario;
    UsuarioModelo.findOne({
        where: { idUsuario: idUsuario },
        attributes: attributes.usuario,
        include: [{
                model: UsuarioEstadoModelo,
                where: { fechaYHoraBajaUsuarioEstado: null },
                attributes: attributes.usuarioestado,
                include: [{
                    model: EstadoUsuarioModelo,
                    attributes: attributes.estadousuario
                }]
            },
            {
                model: RolUsuarioModelo,
                where: { fechaYHoraBajaRolUsuario: null },
                attributes: attributes.rolusuario,
                include: [{
                    model: RolModelo,
                    attributes: attributes.rol
                }]
            },
            {
                model: DepartamentoModelo,
                attributes: attributes.departamento
            }
        ],
    }).then(response => {
        if (!response || response == 0) {
            locals['title'] = `No existe el registro : ${idUsuario}`;
            locals['tipo'] = 2;
        } else {
            locals['data'] = response.dataValues;
            locals['tipo'] = 1
        }
        res.json(locals);
    });
}

UsuarioController.activarUsuario = (req, res) => {
    let locals = {};
    let body = req.body;
    if (body[idtable]) {
        UsuarioModelo.findOne({
            where: {
                [idtable]: body[idtable] },
            attributes: attributes.usuario2,
            include: [{
                    model: UsuarioEstadoModelo,
                    where: { fechaYHoraBajaUsuarioEstado: null },
                },
                {
                    model: RolUsuarioModelo,
                    where: { fechaYHoraBajaRolUsuario: null }
                },
            ],
        }).then(response => {
            if (!response || response == 0) {
                locals.title = `No existe ${legend} con id ${body[idtable]}`;
                locals['tipo'] = 2;
                res.json(locals);
            } else {
                UsuarioModelo.update({activadoUsuario: true}, {
                    where: {
                        [idtable]: body[idtable]
                    }
                }).then(result => {
                    if (!result || result == 0){
                        locals.title = `No se pudo actualizar ${legend} con id ${body[idtable]}`;
                        locals['tipo'] = 2;
                        res.json(locals);
                    } else {
                        locals.title = `Se pudo Activar ${legend} con id ${body[idtable]}`;
                        locals['tipo'] = 1;
                        res.json(locals);
                    }
                })
            }
        });
    } else {
        locals.title = `No envio id de ${legend}`;
        locals['tipo'] = 2;
        res.json(locals);
    }
};


module.exports = UsuarioController;