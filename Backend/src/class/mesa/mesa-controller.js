"use strict";

require('../../config');
const MesaModelo = require("./mesa-model"),
  MesaController = () => { },
  attributes = require('../attributes'),
  tratarError = require("../../middlewares/handleError"),
  SectorModelo = require("../sector/sector-model"),
  MesaEstadoModelo = require("../mesaestado/mesaestado-model"),
  EstadoMesaModelo = require("../estadomesa/estadomesa-model"),
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  legend = "Mesa",
  legend2 = "MesaEstado",
  legend3 = "EstadoMesa",
  // legend4 = "Ubicacion",
  legend5 = "Sector",
  idtable = `id${legend}`,
  idtable2 = `id${legend2}`,
  idtable3 = `id${legend3}`,
  // idtable4 = `id${legend4}`,
  idtable5 = `id${legend5}`,
  nametable = `nro${legend}`;

MesaController.getToAllAttributes = (req, res, next) => {
  let locals = {};
  MesaModelo.findAll({
    where: {
        [Op.or]: [
            {idMesa: {[Op.substring]: req.params.anyAttribute}},
            {nroMesa: {[Op.substring]: req.params.anyAttribute}},
            {capacidadMesa: {[Op.substring]: req.params.anyAttribute}},
            Sequelize.literal("`mesaestados->estadomesa`.`nombreEstadoMesa` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`mesaestados->estadomesa`.`colorEstadoMesa` LIKE '%" + req.params.anyAttribute + "%'"),
            Sequelize.literal("`sector`.`nombreSector` LIKE '%" + req.params.anyAttribute + "%'"),
            // Sequelize.literal("`ubicacion`.`descripcionUbicacion` LIKE '%" + req.params.anyAttribute + "%'"),
            ]
        },
    attributes: attributes.mesa,
    include: [
      {
        model: MesaEstadoModelo,
        where: { fechaYHoraBajaMesaEstado: null },
        attributes: attributes.mesaestado,
        include: [
          {
            model: EstadoMesaModelo,
            attributes: attributes.estadomesa
          },
        ]
      },
      {
        model: SectorModelo,
        attributes: attributes.sector
      },
      // {
      //   model: UbicacionModelo,
      //   attributes: attributes.ubicacion
      // }
    ]
  }).then(project => {
      if (!project || project == 0) {
        locals['title'] = `No existe registro con valor : ${req.params.anyAttribute}.`;
        locals['tipo'] = 2;
      } else {
        locals['title'] = `${legend}`;
        locals['data'] = project;
        locals['tipo'] = 1;
      }
      res.json(locals);
  });
};

MesaController.getToName = (req, res, next) => {
  let locals = {};
  MesaModelo.findAll({where: { [nametable]: { [Op.substring]: req.params[nametable] }},
    attributes: attributes.mesa,
    include: [
      {
        model: MesaEstadoModelo,
        where: { fechaYHoraBajaMesaEstado: null },
        attributes: attributes.mesaestado,
        include: [
          {
            model: EstadoMesaModelo,
            attributes: attributes.estadomesa
          },
        ]
      },
      {
        model: SectorModelo,
        attributes: attributes.sector
      },
      // {
      //   model: UbicacionModelo,
      //   attributes: attributes.ubicacion
      // }
    ]
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

MesaController.getAll = (req, res, next) => {
  let locals = {};
  MesaModelo.findAll({
    attributes: attributes.mesa,
    include: [
      {
        model: MesaEstadoModelo,
        where: { fechaYHoraBajaMesaEstado: null },
        attributes: attributes.mesaestado,
        include: [
          {
            model: EstadoMesaModelo,
            attributes: attributes.estadomesa
          },
        ]
      },
      {
        model: SectorModelo,
        attributes: attributes.sector
      },
      // {
      //   model: UbicacionModelo,
      //   attributes: attributes.ubicacion
      // }
    ]
  })
  .then(projects => {
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
};

MesaController.getOne = (req, res, next) => {
  let locals = {};
  MesaModelo.findOne({
    where: { [idtable]: req.params[idtable] },
    attributes: attributes.mesa,
    include: [
      {
        model: MesaEstadoModelo,
        where: { fechaYHoraBajaMesaEstado: null },
        attributes: attributes.mesaestado,
        include: [
          {
            model: EstadoMesaModelo,
            attributes: attributes.estadomesa
          },
        ]
      },
      {
        model: SectorModelo,
        attributes: attributes.sector
      },
      // {
      //   model: UbicacionModelo,
      //   attributes: attributes.ubicacion
      // }
    ]
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

MesaController.create = (req, res) => {
  let locals = {};
  EstadoMesaModelo.findOne({ where: {[idtable3]: 1 } }).then( responses => {
    if ( !responses || responses == 0 ) {
        locals['title'] = `No existe instancia de ${legend3} con ${idtable3}.`;
        locals['tipo'] = 2;
        res.json(locals);
    } else {
      // UbicacionModelo.findOne({ where: {[idtable4]: req.body[idtable4]} }).then( respo => {
      //   if ( !respo || respo == 0 ) {
      //     locals['title'] = `No existe instancia de ${legend4} con ${idtable4}.`;
      //     locals['tipo'] = 2;
      //     res.json(locals);
      //   } else {
          SectorModelo.findOne({ where: {[idtable5]: req.body[idtable5]} }).then( respon => {
            if ( !respon || respon == 0 ) {
              locals['title'] = `No existe instancia de ${legend5} con ${idtable5}.`;
              locals['tipo'] = 2;
              res.json(locals);
            } else { 
              MesaModelo.create(req.body).then(result => {
                locals['title'] = `${legend} creada.`;
                locals['data'] = result;
                locals['id'] = result[idtable];
                locals['tipo'] = 1;
                let pushMesaEstado = {};
                pushMesaEstado[idtable] = result[idtable];
                pushMesaEstado['fechaYHoraAltaMesaEstado'] = new Date();
                pushMesaEstado[idtable3] = 1;
                MesaEstadoModelo.create(pushMesaEstado).then( response => {
                  locals['title'] = `${legend} creado. ${legend2} creado.`;
                  locals['data'] = response;
                  locals['tipo'] = 1;
                  res.json(locals);
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
        //} //-
      //}) //-
    }
  })
};

MesaController.actualizarDatos = (req, res) => {
  let locals = {};
  let body = req.body;
  MesaModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.mesa,
      include: [
        {
          model: MesaEstadoModelo,
          where: { fechaYHoraBajaMesaEstado: null },
          attributes: attributes.mesaestado,
          include: [
            {
              model: EstadoMesaModelo,
              attributes: attributes.estadomesa
            },
          ]
        },
        {
          model: SectorModelo,
          attributes: attributes.sector
        },
        // {
        //   model: UbicacionModelo,
        //   attributes: attributes.ubicacion
        // }
      ]
    }).then(response => {
      if (!response || response == 0) {
        locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
        locals['tipo'] = 2;
        res.json(locals);
      } else {
        MesaModelo.update(body, {
            where: {[idtable]: body[idtable]}
        }).then(result => {
          if (!result || result == 0) {
              locals['title'] = `No se actualizo ${legend}.`;
              locals['tipo'] = 2;
          } else {
            locals['title'] = `Se actualizo ${legend}.`;
            locals['tipo'] = 1;
          }
          res.json(locals);
      }).catch((error) => {
        let locals = tratarError.tratarError(error, legend);
        res.json(locals);
      });
    }
  });
};

MesaController.cambiarEstado = (req, res) => {
  let locals = {};
  let body = req.body;
  MesaModelo.findOne({
    where: {
      [idtable]: body[idtable] },
      attributes: attributes.mesa,
      include: [
        {
          model: MesaEstadoModelo,
          where: { fechaYHoraBajaMesaEstado: null },
          attributes: attributes.mesaestado,
          include: [
            {
              model: EstadoMesaModelo,
              attributes: attributes.estadomesa
            },
          ]
        },
        {
          model: SectorModelo,
          attributes: attributes.sector
        },
        // {
        //   model: UbicacionModelo,
        //   attributes: attributes.ubicacion
        // }
      ]
    }).then(response => {
    if (!response || response == 0) {
      locals['title'] = `No existe ${legend} con id ${body[idtable]}`;
      locals['tipo'] = 2;
      res.json(locals);
    } else {
      EstadoMesaModelo.findOne({where: { [idtable3]: body[idtable3] }}).then((estadomesa) =>{
        if(!estadomesa || estadomesa == 0) {
          locals['title'] = `No existe ${legend3} con id ${idtable3}.`;
          locals['tipo'] = 2;
          res.json(locals);
        } else {
          let pushMesaEstado = {};
          pushMesaEstado['fechaYHoraBajaMesaEstado'] = new Date();
            MesaEstadoModelo.update(pushMesaEstado , {
              where: { [idtable]: body[idtable], fechaYHoraBajaMesaEstado: null }}).then((respons) => {
            if(!respons || respons == 0) {
              locals['title'] = `No existe ${legend2} habilitado.`;
              locals['tipo'] = 2;
              res.json(locals);
            } else {
              body['fechaYHoraAltaMesaEstado'] = new Date();
              MesaEstadoModelo.create(body).then((resp) => {
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
  });
};

module.exports = MesaController;