import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { element } from '@angular/core/src/render3';

export interface Log {
  cuit: number,
  pass: string,
  id: number;
  date: Date
}
const LOG_KEY = 'logueo';
const CURRENT_KEY = 'currentUsuario';
const COMENSAL_RESERVA_KEY = 'comensalReserva';
const COMENSAL_ESTADIA_KEY = 'comensalEstadia';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private storage: Storage
  ) { }

 addComensal(comensal): Promise<any> {
  console.log("comensal!!!!!! : ",comensal)

  return this.storage.get(COMENSAL_RESERVA_KEY)
  .then( async (comensales ) => {
    let esta = false;
    if (comensales) {
      for ( let element of comensales ) {
        if (element.idReserva == comensal.idReserva ) {
          esta = true;
          if (element.idComensal != comensal.idComensal) {
            element.idComensal = comensal.idComensal;
            return await this.storage.set(COMENSAL_RESERVA_KEY, comensales);
          }
        }
      }
      if ( !esta ) {
        comensales.push(comensal)
        console.log("Se agrego al Storage")
        return this.storage.set(COMENSAL_RESERVA_KEY, comensales);
      }
    } else {
      return this.storage.set(COMENSAL_RESERVA_KEY, [comensal] );
    }
  })
}

validarComensal(): Promise<any> {
  let fechaActual = new Date();
  let numeroActual = Number(fechaActual);
  let actualizarReservas: any[] = [];
  return this.storage.get(COMENSAL_RESERVA_KEY)
  .then( ( comensales ) => {
    let registrosVigentes: any[] = [];
    if (comensales) {
      // EJEMPLO PARA ACTIVAR TOAST EN SELECCIONE COMENSAL
      // let newElement = {fechaReserva: "2019-10-30",
      //   horaEntradaReserva: "18:59:00",
      //   idComensal: 20,
      //   idReserva: 10}
      //   registrosVigentes.push( newElement )
      for ( let element of comensales ) {
        let fecha = String(element.fechaReserva) +' '+ String( element.horaEntradaReserva);
        let fechaReserva = new Date(fecha);
        let numeroReserva = Number(fechaReserva);
        if ( (numeroReserva - numeroActual) < 0 ) {
          // Borrar
          console.log("Se esta eliminado comensal por Vendimiento", )
          actualizarReservas.push({idReserva: element.idReserva, vencida: true, idComensal: element.idComensal})
        } else {
          console.log("Esta vigente")
          registrosVigentes.push( element )
        }
      }
      this.storage.set(COMENSAL_RESERVA_KEY, registrosVigentes)
      return actualizarReservas;
    } else {
      return actualizarReservas;
    }
  })
}

// Read
getLog(): Promise<Log> {
  return this.storage.get(LOG_KEY);
}

getCurrentUsuario(): Promise<Log> {
  return this.storage.get(CURRENT_KEY);
}

getComensales(): Promise<any> {
  return this.storage.get(COMENSAL_RESERVA_KEY);
}

// Update
updateLog(log: Log): Promise<any> {
  return this.storage.get(LOG_KEY)
    .then((logs: Log[]) => {
      if(!logs || logs.length === 0) {
        return null;
      }
      let newLogs: Log[] = [];
      for (let i of logs) {
        if (i.id === log.id) {
          newLogs.push(log);
        } else {
          newLogs.push(i);
        }
      }
      return this.storage.set(LOG_KEY, newLogs);
    })
}

actualizarLog(log: Log): Promise<any> {
  return this.storage.get(LOG_KEY)
    .then((logs: Log[]) => {
      let newLogs: Log[] = [];
      if(!logs || logs.length === 0) {
        newLogs.push(log);
      } else {
        let esta = false;
        for (let i of logs ) {
          if (i.id === log.id) {
            newLogs.push(log);
            esta = true
          } else {
            newLogs.push(i);
          } 
        }
        if (!esta) {
          newLogs.push(log)
        }
      }
      return this.storage.set(LOG_KEY, newLogs);
    })
    .catch( (err) => {
      console.log("Error ,", err)
    })
  }

  deleteItem(Log : Log): Promise<Log> {
    return this.storage.get(LOG_KEY)
      .then((logs: Log[]) => {
        if (!logs || logs.length === 0) {
          return null;
        }
        let toKeep: Log[] = [];
        for (let i of logs) {
          if (i.id !== Log.id) {
            toKeep.push(i);
          }
        }
        return this.storage.set(LOG_KEY, toKeep);
      })
  }
        
    setOneObject(name: string, object: any) {
    //     Guardar objetos en el LocalStorage
      this.storage.set(name, object);
    }
    
    getOneObject(name){
      return this.storage.get(name);
    }
 

    delOneItem(name: string) {
    //     Borrar one item for name key
      this.storage.remove(name);
    }
    
    delAll() {
    //     Para eliminar todas las variables guardadas en el localStorage haremos:
      this.storage.clear();
    }

    
 // Create   
// addLog(log: Log): Promise<any> {
//   console.log("ESTO ES LOG :", log)
//   return this.storage.get(LOG_KEY)
//   .then( (logs: Log[]) => {
//     console.log("METRAIGOLOGUEO : ",logs)
//     if (logs) {
//       logs.push(log)
//       return this.storage.set(LOG_KEY, logs);
//     } else {
//       return this.storage.set(LOG_KEY, [log]);
//     }
//   })
// }

// Delete
// deleteItem(id: number): Promise<Item> {
//   return this.storage.get(ITEMS_KEY)
//     .then((items: Item[]) => {
//       if (!items || items.length === 0) {
//         return null;
//       }
//       let toKeep: Item[] = [];
//       for (let i of items) {
//         if (i.id !== id) {
//           toKeep.push(i);
//         }
//       }
//       return this.storage.set(ITEMS_KEY, toKeep);
//     })
// }

}
