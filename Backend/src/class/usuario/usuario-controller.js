"use strict";

const UsuarioModelo = require("./usuario-model"),
  UsuarioEstadoModelo = require("../usuarioestado/usuarioestado-model"),
  EstadoUsuarioModelo = require("../estadousuario/estadousuario-model"),
  Sequelize = require('sequelize'),
  sequelize = require('../../database/connection'),
  Op = Sequelize.Op,
  UsuarioController = () => {},
  legend = "Usuario",
  legend2 = "UsuarioEstado",
  legend3 = "EstadoUsuario",
  idtable = "idUsuario",
  idtableestado = "idUsuarioEstado",
  idestadotable = "idEstadoUsuario",
  nombreEstado = "nombreEstadoUsuario",
  table = "usuario";



UsuarioController.getAll = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioModelo.findAll({ 
    // BUSCA POR FORANEA 
    include: [
      { 
        model: UsuarioEstadoModelo, 
        include: [
          {
            model: EstadoUsuarioModelo,
            attributes: [
              'nombreEstadoUsuario'
            ]
          }
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
};

UsuarioController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioModelo.findOne({
    where: { [idtable]: req.params[idtable]  },
    // BUSCA POR FORANEA 
    include: [
      { 
        model: UsuarioEstadoModelo, 
        include: [
          {
            model: EstadoUsuarioModelo,
            attributes: [
              'nombreEstadoUsuario'
            ]
          }
        ]
      }  
    ],
  }).then(response => {
    if (!response || response == 0) {
      // SI NO EXISTE EL USUARIO
      locals.title = {
        descripcion: `No existe el registro : ${req.params[idtable]}`
      };
      res.json(locals);
    } else {
      // SI EXISTE EL USUARIO AGREGAMOS A LA VARIABLE EL MISMO
      locals.title = `${legend} encontrado`;
      locals[legend] = response.dataValues;
      res.json(locals)
    }
  });
};

// CREACION DE CONTEXTO USUARIO : VERIFICACION DE ESTADOS USUARIO + CREACION DE USUARIO + CREACION DE USUARIO ESTADO
UsuarioController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    // SI CREAMOS MANDANDO ID DE USUARIO
    // BUSCA SI EXISTE USUARIO
    UsuarioModelo.findOne({
      where: { [idtable]: req.body[idtable] }
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
            locals.title = { descripcion: `${legend3} encontrada` };
            locals[legend3] = response;
            // CREAMOS INSTANCIA USUARIO
            UsuarioModelo.create(req.body).then(result => {
              locals.title = { descripcion: `${legend} creado` };
              locals[legend] = result;
              let push = {
                [idestadotable]: response[idestadotable],
                [idtable]: result[idtable],
                fechaYHoraAltaUsuarioEstado: new Date() ///////////////////////////////  HARKODEO
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
          }
        });
      } else {
        var check = false;
        for (let attribute in req.body) {
          if (
            String(req.body[attribute]) !=
            String(response.dataValues[attribute])
          ) {
            check = true;
          }
        }
        if (check) {
          UsuarioModelo.update(req.body, {
            where: {
              [idtable]: req.body[idtable]
            }
          }).then(result => {
            let locals = {
              title: `Actualizando ${legend}: ${req.body[idtable]}`
            };
            res.json(locals);
          });
        } else {
          let locals = {
            title: `No existe ninguna modificación de ${legend}: ${req.body[idtable]}`
          };
          res.json(locals);
        }
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

        res.json(locals);
      } else {
        locals.title = { descripcion: `${legend3} encontrada` };
        locals[legend3] = response;
        // CREAMOS INSTANCIA USUARIO
        UsuarioModelo.create(req.body).then(result => {
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
      }
    });
  }
};

UsuarioController.delete = (req, res) => {
  let locals = {};
    // BUSCA EL USUARIO CON ID INGRESADO
    UsuarioEstadoModelo.update({
        fechaYHoraBajaUsuarioEstado: Date()
      },{
        where:  { idUsuario: req.params[idtable] , fechaYHoraBajaUsuarioEstado: null }
      })
      .then( ( resp ) => {
        if (!resp || resp == 0){
          locals.title = "Error al intentar encontrar Intermedia que este de Baja"
          res.json(locals)
        }else {
          locals.title = `${legend2} Actualizada`
          locals.update = "Actualizado el Registro";
          res.json(locals)
        } 
      })



    // UsuarioModelo.findOne({
    //   where: { [idtable]: req.params[idtable]  },
    //   // BUSCA POR FORANEA 
    //   include: [
    //     { 
    //       model: UsuarioEstadoModelo,
    //       where: { fechaYHoraBajaUsuarioEstado: null } 
    //     }  
    //   ],
    // }).then(response => {
    //   console.log(response)
    //   UsuarioEstadoModelo.update({
    //     fechaYHoraBajaUsuarioEstado: Date()
    //   },{
    //     where: {idUsuarioEstado: req.params[idtable]}
    //   })
    //   .then( ( resp ) => {
    //     if (!resp || resp == 0){
    //       locals.title = "Error al intentar encontrar Intermedia que este de Baja"
    //     }else {
    //       locals.title = `${legend2} Actualizada`
    //       locals.update = "Actualizado el Registro";
    //       res.json(locals)
    //     } 
    //   })
      
    // })
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

UsuarioController.error404 = (req, res, next) => {
  let error = new Error(),
    locals = {
      title: "Error 404",
      description: `Recurso ${leyenda} No Encontrado`,
      error: error
    };
  error.status = 404;
  res.json(locals);
  next();
};

UsuarioController.validateUser= (req, res , next) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  UsuarioModelo.findOne({
    where: { [idtable]: req.params[idtable]  },
    // BUSCA POR FORANEA 
    include: [
      { 
        model: UsuarioEstadoModelo,
        where: { fechaYHoraBajaUsuarioEstado: null } ,
        include: [
          {
            model: EstadoUsuarioModelo,
            where: { nombreEstadoUsuario: { [Op.notLike]: 'Eliminado'}}
          }
        ]
      }  
    ],
  }).then(response => {
    if (!response || response == 0){
      locals = {
        title: "No se encuentra Estado del usuario Diferente a Eliminado"
      };
      res.json(locals)
    }else {
      next();
    }
  })
}


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
