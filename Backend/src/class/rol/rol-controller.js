"use strict";

let tratarError = require("../../middlewares/handleError");
const RolModelo = require("../rol/rol-model"),
  RolController = () => {},
  FuncionRolModelo = require("../funcionrol/funcionrol-model"),
  FuncionModelo = require("../funcion/funcion-model"),
  attributes = require('../attributes'),
  fechaArgentina = require("../../middlewares/fechaArgentina"),
  legend = "Rol",
  legend2 = "FuncionRol",
  legend3 = "Funcion",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  nombretable = `nombre${legend}`,
  Sequelize = require('sequelize'),
  Op = Sequelize.Op;

RolController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  RolModelo.findAll({
    where: {
      [Op.or]: [
        {idRol: {[Op.substring]: req.params.anyAttribute}},
        {nombreRol: {[Op.substring]: req.params.anyAttribute}},
      ]
    },
    attributes: attributes.rol,
    include: [{
      model: FuncionRolModelo,
      attributes: attributes.funcionrol,
      where: {  fechaYHoraBajaFuncionRol: null },
      required: false,
      include: [{
        model: FuncionModelo,
        attributes: attributes.funcion,
      }]
    }]
  }).then(project => {
      if (!project || project == 0) {
        locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
  });
};

RolController.getToName = (req, res, next) => {
  let locals = {};
  RolModelo.findAll({
    where: { [nombretable]: { [Op.substring]: req.params[nombretable] }},
    attributes: attributes.rol,
    include: [{
      model: FuncionRolModelo,
      attributes: attributes.funcionrol,
      where: {  fechaYHoraBajaFuncionRol: null },
      required: false,
      include: [{
        model: FuncionModelo,
        attributes: attributes.funcion,
      }]
    }]
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `Registro no encontrado con valor: ${req.params[nombretable]}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

RolController.getAll = (req, res, next) => {
  let locals = {};
  RolModelo.findAll({ 
    attributes: attributes.rol,
    include: [{
      model: FuncionRolModelo,
      attributes: attributes.funcionrol,
      where: {  fechaYHoraBajaFuncionRol: null },
      required: false,
      include: [{
        model: FuncionModelo,
        attributes: attributes.funcion,
      }]
    }]
  }).then(projects => {
    if (!projects || projects == 0) {
      locals['title'] = `No existen registros de ${legend}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = projects;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

RolController.getOne = (req, res, next) => {
  let locals = {};
  RolModelo.findOne({
    where: {[idtable]: req.params[idtable]},
    attributes: attributes.rol,
    include: [{
      model: FuncionRolModelo,
      attributes: attributes.funcionrol,
      where: {  fechaYHoraBajaFuncionRol: null },
      required: false,
      include: [{
        model: FuncionModelo,
        attributes: attributes.funcion,
      }]
    }]
  }).then(project => {
    if (!project || project == 0) {
      locals['title'] = `No existe el registro : ${req.params[idtable]}` ;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend}`;
      locals['data'] = project.dataValues;
      locals['tipo'] = 1;
    }
    res.json(locals);
  });
};

RolController.create = (req, res) => {
  let locals = {};
  if (req.body[idtable]) {
    RolModelo.findOne({
      where: {[idtable]: req.body[idtable]},
      attributes: attributes.rol,
      include: [{
        model: FuncionRolModelo,
        attributes: attributes.funcionrol,
        where: {  fechaYHoraBajaFuncionRol: null },
        required: false,
        include: [{
          model: FuncionModelo,
          attributes: attributes.funcion,
        }]
      }]
    }).then(project => {
      if (!project || project == 0) {
        RolModelo.create(req.body).then(result => {
          locals['title'] = `${legend} creado.`;
          locals['data'] = result;
          locals['id'] = result[idtable];
          locals['tipo'] = 1;
          res.json(locals);
        }).catch((error) => {
          let locals = tratarError.tratarError(error, legend);
          res.json(locals);
        });
      } else {
        locals['title'] = `${[idtable]} ya existe.`;
        locals['tipo'] = 2;
        res.json(locals);
      }
    });
  } else {
    RolModelo.create(req.body).then(result => {
      locals['title'] = `${legend} creado.`;
      locals['data'] = result;
      locals['id'] = result[idtable];
      locals['tipo'] = 1;
      res.json(locals);
    }).catch((error) => {
      let locals = tratarError.tratarError(error, legend);
      res.json(locals);
    });
  }
};

RolController.update = (req, res) => {
  let locals = {};
  let body = req.body;
  if (body[idtable]) {
    RolModelo.findOne({
      where: {[idtable]: body[idtable]},
      attributes: attributes.rol,
      include: [{
        model: FuncionRolModelo,
        attributes: attributes.funcionrol,
        where: {  fechaYHoraBajaFuncionRol: null },
        required: false,
        include: [{
          model: FuncionModelo,
          attributes: attributes.funcion,
        }]
      }]
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}.`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        let actualizar = false;
        if ( 
          body.nombreRol != response.dataValues.nombreRol
          ) {actualizar = true}
        if (actualizar) {
          RolModelo.update(
            body, 
            {where: {[idtable]: body[idtable]}}).then(result => {
              if (result) {
                locals['title'] = `Registro ${legend} Actualizado`;
                locals['tipo'] = 1;
              } else {
                locals['title'] = `Registro ${legend} NO Actualizado`;
                locals['tipo'] = 2;
              }
              res.json(locals)
            }).catch((error) => {
              let locals = tratarError.tratarError(error, legend);
              res.json(locals);
            });
        } else {
          locals['title'] = `No ha Modificado ningún Registro de ${legend}.`;
          locals['tipo'] = 2;
          res.json(locals);
        }
      }
    });
  } else {
    locals['title'] = `No envio id de ${legend}.`;
    locals['tipo'] = 2;
    res.json(locals);
  }
};

RolController.destroy = (req, res, next) => {
  let locals = {};
  RolModelo.destroy({
    where: {[idtable]: req.params[idtable]}}).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe el registro de ${legend}: ${req.params[idtable]}`;
      locals['tipo'] = 2;
    } else {
      locals['title'] = `${legend} Eliminado Fisicamente`;
      locals['tipo'] = 1;
    }
    res.json(locals);
  }).catch((error) => {
    let locals = tratarError.tratarError(error, legend);
    res.json(locals);
  });
};

RolController.editarFuncion = (req, res) => {
  var locals = { detalles: [] };
  let body = req.body;
  RolModelo.findOne({
    where: {
    [idtable]: body[idtable] },
    attributes: attributes.rol,
    include: [{
      model: FuncionRolModelo,
      attributes: attributes.funcionrol,
      where: {  fechaYHoraBajaFuncionRol: null },
      required: false,
      include: [{
        model: FuncionModelo,
        attributes: attributes.funcion,
      }]
    }]
  }).then( async response => {
      if(!response || response == 0) {
          locals['title'] = `No existe ${legend} con id ${idtable}`;
          locals['tipo'] = 2;
          res.json(locals);
      } else {
          let i = 1;
          for ( let elem of body.detalle ) {
              if ( elem['idFuncionRol'] ) {
                  if ( elem['baja'] == true ) {
                      console.log("BORRAR   :---------------------------")
                      await FuncionRolModelo.update( {'fechaYHoraBajaFuncionRol': fechaArgentina.getFechaArgentina()},{where: {[idtable2]: elem[idtable2]}}).then((resp) => {
                          if(!resp || resp == 0) {
                            locals.detalles.push({
                                  ['title']: `Detalle NO eliminado con ${[idtable2]} = ${elem[[idtable2]]}`,
                                  ['tipo']: 2
                              })
                          } else {
                              locals.detalles.push({
                                  ['title']: `Detalle eliminado con ${[idtable2]} = ${elem[[idtable2]]}`,
                                  ['tipo']: 1
                              })
                          }
                      })
                  } 
              } else {
                  elem[idtable] = body[idtable];
                  if ( elem[idtable3] != null ) {
                      await FuncionModelo.findOne({ where: {[idtable3]: elem[idtable3]}}).then( async (funcion) => {
                          if(!funcion || funcion == 0) {
                              locals.detalles.push({
                                  ['title']: `No existe ${legend3} con id ${elem[idtable3]}`,
                                  ['tipo']: 2
                              })
                          } else {
                            await FuncionRolModelo.findOne({ where: { [idtable3]: elem[idtable3] ,  [idtable]: body[idtable] }}).then( async (funcionrol) => {
                              if(!funcionrol || funcionrol == 0) {
                                elem['fechaYHoraAltaFuncionRol'] = fechaArgentina.getFechaArgentina();
                                await FuncionRolModelo.create(elem).then((resp) => {
                                  if(!resp || resp == 0) {
                                      locals.detalles.push({
                                          ['title']: `Detalle NO creado: ${elem[idtable3]}`,
                                          ['tipo']: 2
                                      })
                                  } else {
                                      locals.detalles.push({
                                          ['title']: `Detalle creado: ${elem[idtable3]}`,
                                          ['tipo']: 1
                                      })
                                  }
                                })
                              } else {
                                locals.detalles.push({
                                  ['title']: `No existe ${legend3} con id ${elem[idtable3]}`,
                                  ['tipo']: 2
                              })
                              }
                            })
                          }
                      })
                  } else {
                      locals.detalles.push({
                          ['title']: `Detalle posicion ${i} falta mandar idFuncion`,
                          ['tipo']: 2
                      })
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

module.exports = RolController;