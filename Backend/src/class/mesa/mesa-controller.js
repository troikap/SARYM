"use strict";

require('../../config');
const MesaModel = require("./mesa-model"),
 SectorModel = require("../sector/sector-model"),
 UbicacionModel = require("../ubicacion/ubicacion-model"),
 MesaEstadoModel = require("../mesaestado/mesaestado-model"),
 EstadoMesaModel = require("../estadomesa/estadomesa-model"),
  
  
  Sequelize = require('sequelize'),
  Op = Sequelize.Op,
  MesaController = () => { },
  legend = "Mesa",
  legend2 = "AAAAAAAAAAAA",
  legend3 = "BBBBBBBBBBBB",
  idtable = "idMesa",
  idtableestado = "idAAAAAAAAAAAAA",
  idestadotable = "idBBBBBBBBBBBBB",
  nombreEstado = "nombreAAAAAAAAAAAAAAAAA",
  table = "mesa";

MesaController.getAll = (req, res) => {
  let locals = {};
  MesaModel.findAll({ 
    // BUSCA POR FORANEA 
    attributes: [
        "idMesa",
        "idUbicacion",
        "nroMesa",
        "capacidadMesa",
    ],
    include: [
        {
            model: SectorModel,
            attributes: [
                "idSector",
                "codSector",
                "nombreSector",
                "fechaYHoraBajaSector",
            ],
        },
        {
            model: UbicacionModel,
            attributes: [
                "idUbicacion",
                "nroUbicacion",
                "descripcionUbicacion",
            ],
        },
        {
            model: MesaEstadoModel,
            attributes: [
                "idMesaEstado",
                "idMesa",
                "idEstadoMesa",
                "fechaYHoraAltaMesaEstado",
                "fechaYHoraBajaMesaEstado",
            ],
            include: [
                {
                    model: EstadoMesaModel,
                    attributes: [
                        "idEstadoMesa",
                        "codEstadoMesa",
                        "nombreEstadoMesa",
                        "colorEstadoMesa",
                    ], 
                }
            ]
        },
    ],
  }).then(response => {
      console.log("MESAS ", response)
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

MesaController.getOne = (req, res) => {
  let locals = {};
  // BUSCA EL USUARIO CON ID INGRESADO
  console.log("req.params , ",req.params)
  MesaModel.findOne({
    where: { [idtable]: req.params[idtable] },
    // BUSCA POR FORANEA 
    attributes: [
        "idMesa",
        "idUbicacion",
        "nroMesa",
        "capacidadMesa",
    ],
    include: [
        {
            model: SectorModel,
            attributes: [
                "idSector",
                "codSector",
                "nombreSector",
                "fechaYHoraBajaSector",
            ],
        },
        {
            model: UbicacionModel,
            attributes: [
                "idUbicacion",
                "nroUbicacion",
                "descripcionUbicacion",
            ],
        },
        {
            model: MesaEstadoModel,
            attributes: [
                "idMesaEstado",
                "idMesa",
                "idEstadoMesa",
                "fechaYHoraAltaMesaEstado",
                "fechaYHoraBajaMesaEstado",
            ],
            include: [
                {
                    model: EstadoMesaModel,
                    attributes: [
                        "idEstadoMesa",
                        "codEstadoMesa",
                        "nombreEstadoMesa",
                        "colorEstadoMesa",
                    ], 
                }
            ]
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

module.exports = MesaController;