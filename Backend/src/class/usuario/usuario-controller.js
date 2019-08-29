"use strict";

const Model = require("./usuario-model"),
  ModelEstado = require("../usuarioestado/usuarioestado-model"),
  EstadoModel = require("../estadousuario/estadousuario-model"),
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
  Model.findAll({ raw: true }).then(response => {
    if (!response || response == 0) {
      let locals = {
        title: `No existen registros de ${legend}`
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${legend}`,
        data: response
      };
      res.json(locals);
    }
  });
};

UsuarioController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  Model.findOne({
    where: { [idtable]: req.params[idtable]  },
    include: [
      { 
        model: ModelEstado, 
        include: [
          {
            model: EstadoModel,
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
      console.log("other : ",response)
      res.json(response)
    }





  });
};

// CREACION DE CONTEXTO USUARIO : VERIFICACION DE ESTADOS USUARIO + CREACION DE USUARIO + CREACION DE USUARIO ESTADO
UsuarioController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    // SI CREAMOS MANDANDO ID DE USUARIO
    // BUSCA SI EXISTE USUARIO
    Model.findOne({
      where: { [idtable]: req.body[idtable] }
    }).then(response => {
      if (!response || response == 0) {
        // BUSCA SI EXISTE ESTADO DE USUARIO
        EstadoModel.findOne({
          where: { [nombreEstado]: "Activo" }
        }).then(response => {
          if (!response || response == 0) {
            locals.title = `No existe : ${legend3}`;

            res.json(locals);
          } else {
            locals.title = { descripcion: `${legend3} encontrada` };
            locals[legend3] = response;
            // CREAMOS INSTANCIA USUARIO
            Model.create(req.body).then(result => {
              locals.title = { descripcion: `${legend} creado` };
              locals[legend] = result;
              let push = {
                [idestadotable]: response[idestadotable],
                [idtable]: result[idtable],
                fechaYHoraAltaUsuarioEstado: new Date() ///////////////////////////////  HARKODEO
              };
              // CREANDO INSTANCIA USUARIO ESTADO
              ModelEstado.create(push).then(result => {
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
          Model.update(req.body, {
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
    EstadoModel.findOne({
      where: { nombreEstadoUsuario: "Activo" }
    }).then(response => {
      if (!response || response == 0) {
        locals.title = ` No existe : ${legend3}  AAAAA`;

        res.json(locals);
      } else {
        locals.title = { descripcion: `${legend3} encontrada` };
        locals[legend3] = response;
        // CREAMOS INSTANCIA USUARIO
        Model.create(req.body).then(result => {
          locals.title = { descripcion: `${legend} creado` };
          locals[legend] = result;
          let push = {
            [idestadotable]: response[idestadotable],
            [idtable]: result[idtable],
            fechaYHoraAltaUsuarioEstado: new Date()
          };
          // CREANDO INSTANCIA USUARIO ESTADO
          ModelEstado.create(push).then(result => {
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
  let [idtabla] = req.params[idtabla];
  UsuarioModel.getOne([idtabla], (err, rows) => {
    if (err) {
      let locals = {
        title: `Error al buscar el registro con el id: ${[idtabla]}`,
        description: "Error de Sintaxis SQL",
        error: err
      };
      res.json(locals);
    } else {
      let locals = {
        title: `${leyenda}: ${[idtabla]}`,
        data: rows
      };
      res.json(locals);
    }
  });
};

UsuarioController.destroy = (req, res) => {
  Model.destroy({
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
