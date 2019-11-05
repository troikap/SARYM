export interface Mesa {
    idMesa: Number,
    capacidadMesa: Number,
    mesaestados: {
        fechaYHoraAltaMesaEstado: Date,
        fechaYHoraBajaMesaEstado: Date,
        idEstadoMesa: Number,
        idMesaEstado: Number,
        estadomesa: {
            codEstadoMesa: String,
            colorEstadoMesa: String,
            idEstadoMesa: Number,
            nombreEstadoMesa: String,
        }
    },
    nroMesa: Number,
    nroUbicacion: Number,
    sector: {
        codSector: String,
        fechaYHoraBajaSector: Date,
        idSector: Number,
        nombreSector: String,
    },
  }