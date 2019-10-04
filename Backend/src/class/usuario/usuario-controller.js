"use strict";

require('../../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModelo = require("./usuario-model"),
  UsuarioEstadoModelo = require("../usuarioestado/usuarioestado-model"),
  EstadoUsuarioModelo = require("../estadousuario/estadousuario-model"),
  DepartamentoModelo = require("../departamento/departamento-model"),
  RolModelo = require("../rol/rol-model"),
  RolUsuarioModelo = require("../rolusuario/rolusuario-model"),
  Sequelize = require('sequelize'),
  sequelize = require('../../database/connection'),
  Op = Sequelize.Op,
  UsuarioController = () => { },
  legend = "Usuario",
  legend2 = "UsuarioEstado",
  legend3 = "EstadoUsuario",
  idtable = "idUsuario",
  idtableestado = "idUsuarioEstado",
  idestadotable = "idEstadoUsuario",
  nombreEstado = "nombreEstadoUsuario",
  table = "usuario";

  UsuarioController.login = (req, res) => {
    let locals = {};
    let body = req.body;
      UsuarioModelo.findOne({
        where: { cuitUsuario: body.cuitUsuario},
        attributes: [
          'idUsuario',
          'nombreUsuario' ,
          'apellidoUsuario',
          'contrasenaUsuario'
        ],
        include: [
          { 
            model: UsuarioEstadoModelo,
            where: { fechaYHoraBajaUsuarioEstado: null },
            attributes: [
              'descripcionUsuarioEstado',
              'fechaYHoraAltaUsuarioEstado',
              'fechaYHoraBajaUsuarioEstado'
            ],
            include: [
              {
                model: EstadoUsuarioModelo,
                attribute: [
                  'nombreEstadoUsuario'
                ]
              }
            ]
          },
          { 
            model: RolUsuarioModelo,
            where: { fechaYHoraBajaRolUsuario: null },
            include: [
              {
                model: RolModelo,
                attribute: [
                  'nombreRol',
                  'idRol'
                ]
              }
            ]
          }, 
        ],
      }).then(response => {
        console.log('RESPUESTA >>>>>>> ,',response)
        // console.log('RESPUESTA >>>>>>> ,',response.dataValues.rolusuarios[0].dataValues.fechaYHoraBajaRolUsuario)
        // console.log('RESPUESTA >>>>>>> ,',response.dataValues.rolusuarios[0].dataValues.rol.dataValues.idRol)
        // console.log('RESPUESTA >>>>>>> ,',response.dataValues.rolusuarios[0].dataValues.rol.dataValues.nombreRol)
      if (response && response != 0){
        if (bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario)) {
          if( response.dataValues.usuarioestados[0].estadousuario.dataValues.nombreEstadoUsuario != 'Activo' ){
            locals.title = {
              descripcion: `Usuario Suspendido o dado de Baja`,
              tipo: 3
            };
            res.json(locals);
          } else {
            let token = jwt.sign({
              cuitUsuario: response.dataValues.cuitUsuario,
              nombreUsuario: response.dataValues.nombreUsuario,
              apellidoUsuario: response.dataValues.apellidoUsuario,
              RolUsuario: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.nombreRol
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN}) // 60 * 60 (hora) * 24 *30
            locals.title = {
              descripcion: `Usuario Logueado`,
              tipo: 1,
              token,
              idUsuario: response.dataValues.idUsuario,
              rol: {
                nombreRol: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.idRol,
                idRol: response.dataValues.rolusuarios[0].dataValues.rol.dataValues.nombreRol
              }
            };
            locals[legend2] = response;
            res.json(locals);
          }
        } else {
        locals.title = {
          descripcion: `Usuario o (Contraseña) invalidos`,
          tipo: 2
        };
        res.json(locals);
        }
      } else {
        locals.title = {
          descripcion: `(Usuario) o Contraseña invalidos`,
          tipo: 2
        };
        res.json(locals);
      }
      });
  }

  UsuarioController.logueo = (req, res) => {
    let locals = {};
    let body = req.body;
      UsuarioModelo.findAll({
        where: { cuitUsuario: body.cuitUsuario,
        contrasenaUsuario: body.contrasenaUsuario},
        attributes: [
          'descripcionUsuarioEstado',
          'fechaYHoraAltaUsuarioEstado',
          'fechaYHoraBajaUsuarioEstado'
        ],
        include: [
          {
            model: EstadoUsuarioModelo,
            attribute: [
              'nombreEstadoUsuario'
            ]
          }
        ]
  }).then(response => {
    if (response && response != 0) {
      if (response[0].usuarioestados[0].estadousuario.dataValues.nombreEstadoUsuario != 'Activo') {
        locals.title = {
          descripcion: `Usuario Suspendido o dado de Baja`,
          tipo: 3
        };
        res.json(locals);
      } else {
        locals.title = {
          descripcion: `Usuario Logueado`,
          tipo: 1
        };
        locals[legend2] = response;
        res.json(locals);
      }
    } else {
      locals.title = {
        descripcion: `Usuario o Contraseña invalidos`,
        tipo: 2
      };
      res.json(locals);
    }
  });
}

UsuarioController.getAll = (req, res) => {
  let locals = {};
  UsuarioModelo.findAll({ 
    // BUSCA POR FORANEA 
    attributes: [
      'idUsuario',
      'cuitUsuario',
      'nombreUsuario',
      'apellidoUsuario',
      'contrasenaUsuario',
      'dniUsuario',
      'domicilioUsuario',
      'emailUsuario',
      'idDepartamento',
      'nroCelularUsuario',
      'nroTelefonoUsuario',
    ],
    include: [
      {
        model: UsuarioEstadoModelo,
        attributes: [
          'descripcionUsuarioEstado',
          'fechaYHoraAltaUsuarioEstado',
          'fechaYHoraBajaUsuarioEstado'
        ],
        include: [
          {
            model: EstadoUsuarioModelo,
            attributes: [
              'nombreEstadoUsuario'
            ]
          }
        ]
      },
      {
        model: RolUsuarioModelo,
        attributes: [
          'fechaYHoraAltaRolUsuario',
          'fechaYHoraBajaRolUsuario'
        ],
        include: [
          {
            model: RolModelo,
            attributes: [
              'nombreRol'
            ]
          }
        ]
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

UsuarioController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: [
      'idUsuario',
      'cuitUsuario',
      'nombreUsuario',
      'apellidoUsuario',
      'contrasenaUsuario',
      'dniUsuario',
      'domicilioUsuario',
      'emailUsuario',
      'idDepartamento',
      'nroCelularUsuario',
      'nroTelefonoUsuario',
    ],
    // BUSCA POR FORANEA 
    include: [
      {
        model: UsuarioEstadoModelo,
        attributes: [
          'descripcionUsuarioEstado',
          'fechaYHoraAltaUsuarioEstado',
          'fechaYHoraBajaUsuarioEstado'
        ],
        include: [
          {
            model: EstadoUsuarioModelo,
            attributes: [
              'nombreEstadoUsuario'
            ]
          }
        ]
      },
      {
        model: RolUsuarioModelo,
        attributes: [
          'fechaYHoraAltaRolUsuario',
          'fechaYHoraBajaRolUsuario'
        ],
        include: [
          {
            model: RolModelo,
            attributes: [
              'nombreRol'
            ]
          }
        ]
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

// CREACION DE CONTEXTO USUARIO : VERIFICACION DE ESTADOS USUARIO + CREACION DE USUARIO + CREACION DE USUARIO ESTADO
UsuarioController.create = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    // SI CREAMOS MANDANDO ID DE USUARIO
    // BUSCA SI EXISTE USUARIO
    UsuarioModelo.findOne({
      where: { [idtable]: body[idtable] }
    }).then(response => {
      if (!response || response == 0) {
        // BUSCA SI EXISTE ESTADO DE USUARIO
        EstadoUsuarioModelo.findOne({
          where: { [nombreEstado]: "Activo" }
        }).then(response => {
          if (!response || response == 0) {
            locals.title = `No existe : ${legend3}`;
            res.json(locals);
          } else {
            UsuarioModelo.findOne({
              where: { "cuitUsuario": body.cuitUsuario }
            }).then( resp => {
              if (!resp || resp == 0) {
                locals.title = { descripcion: `${legend3} encontrada` };
                locals[legend3] = response;
                body.contrasenaUsuario = bcrypt.hashSync(body.contrasenaUsuario, 10);
                // CREAMOS INSTANCIA USUARIO
                UsuarioModelo.create(body).then(result => {
                  locals.title = { descripcion: `${legend} creado` };
                  locals[legend] = result;
                  let push = {
                    [idestadotable]: response[idestadotable],
                    [idtable]: result[idtable],
                    fechaYHoraAltaUsuarioEstado: new Date() 
                  };
                  // CREANDO INSTANCIA USUARIO ESTADO
                  UsuarioEstadoModelo.create(push).then(result => {
                    locals.title = {
                      descripcion: `${legend} creado , ${legend2} creado`
                    };
                    locals[legend2] = result;
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
    EstadoUsuarioModelo.findOne({
      where: { nombreEstadoUsuario: "Activo" }
    }).then(response => {
      if (!response || response == 0) {
        locals.title = ` No existe : ${legend3}  AAAAA`;
        locals['tipo'] = 2
        res.json(locals);
      } else {
        UsuarioModelo.findOne({
          where: { "cuitUsuario": body.cuitUsuario }
        }).then( resp => {
          if (!resp || resp == 0) {
            locals.title = { descripcion: `${legend3} encontrada` };
            locals[legend3] = response;
            locals['tipo'] = 2
            body.contrasenaUsuario = bcrypt.hashSync(body.contrasenaUsuario, 10);
            // CREAMOS INSTANCIA USUARIO
            UsuarioModelo.create(body).then(result => {
              locals.title = `${legend} creado Correctamente`;
              locals[legend] = result;
              locals['tipo'] = 1
              let push = {
                [idestadotable]: response[idestadotable],
                [idtable]: result[idtable],
                fechaYHoraAltaUsuarioEstado: new Date() 
              };
              // CREANDO INSTANCIA USUARIO ESTADO
              UsuarioEstadoModelo.create(push).then(result => {
                let descripcion2 = `${legend} creado , ${legend2} creado`
                locals['descripcion2'] = descripcion2
                locals[legend2] = result;
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
      where: { [idtable]: body[idtable] }
    }).then(response => {
      if (!response || response == 0) {
        // BUSCA SI EXISTE ESTADO DE USUARIO
        locals.title = `No existe ${legend} con id ${body[idtable]}`;
        res.json(locals);
      } else {
        var check = false;
        var pass = false;
        if ( !body.contrasenaUsuario ) {
          body['contrasenaUsuario'] = response.dataValues.contrasenaUsuario
        } else { 
          if (bcrypt.compareSync(body.contrasenaUsuario, response.dataValues.contrasenaUsuario) ) {
            body.contrasenaUsuario = response.dataValues.contrasenaUsuario
          };
        }
        for (let attribute in body) {
          if (
            String(body[attribute]) !=
            String(response.dataValues[attribute])
          ) {
            check = true;
            if(attribute == "contrasenaUsuario") {
              pass = true;
            }
          }
        }
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
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioEstadoModelo.update({
    fechaYHoraBajaUsuarioEstado: Date()
  }, {
      where: { idUsuario: req.params[idtable], fechaYHoraBajaUsuarioEstado: null }
    })
    .then((resp) => {
      if (!resp || resp == 0) {
        locals.title = "Error al intentar encontrar Intermedia que este de Baja"
        res.json(locals)
      } else {
        locals.title = `${legend2} Actualizada`
        locals.update = "Actualizado el Registro";
        next()
      }
    })
}

// ESTE QUEDA SUSPENDIDO .... NO LO USO MAS ... LO CAMBIO POR EL changeState
UsuarioController.stateDelete = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  EstadoUsuarioModelo.findOne({
    where: { nombreEstadoUsuario: "Eliminado" }
  }).then(response => {
    let push = {
      [idestadotable]: response.dataValues[idestadotable],
      [idtable]: req.params[idtable],
      fechaYHoraAltaUsuarioEstado: new Date(),
      descripcionUsuarioEstado: "por jodido"
    };
    UsuarioEstadoModelo.create(push).then(result => {
      locals.title = {
        descripcion: `${legend} creado , ${legend2} creado`
      };
      locals[legend2] = result;
      res.json(locals);
    });
  })
}

// Metodo generico para crear intermedia entre Estado Usuario y Usuario... Esta recibe el nombre del estado y la descripcion del cambio.
UsuarioController.changeState = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  EstadoUsuarioModelo.findOne({
    where: { nombreEstadoUsuario: req.body.estado }
  }).then(response => {
    let push = {
      [idestadotable]: response.dataValues[idestadotable],
      [idtable]: req.params[idtable],
      fechaYHoraAltaUsuarioEstado: new Date(),
      descripcionUsuarioEstado: req.body.descripcion
    };
    UsuarioEstadoModelo.create(push).then(result => {
      locals.title = {
        descripcion: `Cambio de estado de ${legend}, pasado a ${req.body.estado}.`
      };
      locals[legend2] = result;
      res.json(locals);
    });
  })
}

UsuarioController.destroy = (req, res) => {
  UsuarioModelo.destroy({
    where: {
      [idtable]: req.params[idtable]
    }
  }).then(response => {
    if (!response || response == 0) {
      let locals = {
        title: `No existe el registro de ${legend}: ` + req.params[idtable]
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend} Eliminado Fisicamente`
      };
      res.json(locals);
    }
  });
};

// Valida si al quererse cambiar de estado, no exista ya en el mismo estado.
UsuarioController.validateUser= (req, res , next) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    // BUSCA POR FORANEA 
    include: [
      {
        model: UsuarioEstadoModelo,
        where: { fechaYHoraBajaUsuarioEstado: null },
        include: [
          {
            model: EstadoUsuarioModelo,
            where: { nombreEstadoUsuario: { [Op.notLike]: req.body.estado } }
          }
        ]
      }
    ],
  }).then(response => {
    if (!response || response == 0) {
      console.log(req.body.estado)
      console.log("WFT!!!!!!!!!!!!!!!!!!!")
      locals = {
        title: `No se encuentra Estado del usuario Diferente a ${req.body.estado}`
      };
      res.json(locals)
    } else {

      next();
    }
  })
}

UsuarioController.error404 = (req, res, next) => {
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

module.exports = UsuarioController;

// cuitUsuario: req.body.cuitUsuario,
// nombreUsuario: req.body.nombreUsuario,
// apellidoUsuario: req.body.apellidoUsuario,
// contrasenaUsuario: req.body.contrasenaUsuario,
// dniUsuario: req.body.dniUsuario,
// domicilioUsuario: req.body.domicilioUsuario,
// emailUsuario: req.body.emailUsuario,
// idDepartamento: req.body.idDepartamento,
// nroCelularUsuario: req.body.nroCelularUsuario,
// nroTelefonoUsuario: req.body.nroTelefonoUsuario
