export interface CajaCreate {
    idCaja?: number;
    nroCaja: number; 
    idUsuario?: number;  
  }
  export interface CajaEdit {
    idCaja?: number;
    nroCaja: number;    
    idEstadoCaja?: number; 
    idUsuario?: number; 
    descripcionCajaEstado: string,
    montoAperturaCajaEstado: number 
  }
  