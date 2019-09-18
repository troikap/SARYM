import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Log {
  cuit: number,
  pass: string,
  id: number;
  date: Date
}
const LOG_KEY = 'logueo';
const CURRENT_KEY = 'currentUsuario';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  // Create   
addLog(log: Log): Promise<any> {
  console.log("ESTO ES LOG :", log)
  return this.storage.get(LOG_KEY)
  .then( (logs: Log[]) => {
    console.log("METRAIGOLOGUEO : ",logs)
    if (logs) {
      logs.push(log)
      return this.storage.set(LOG_KEY, logs);
    } else {
      return this.storage.set(LOG_KEY, [log]);
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

// Update
updateLog(log: Log): Promise<any> {
  console.log("UPDATING :", log)
  return this.storage.get(LOG_KEY)
    .then((logs: Log[]) => {
      console.log("LOGS ",logs)
      if(!logs || logs.length === 0) {
        console.log("ESTA RETORNANDO NULL")
        return null;
      }
      console.log("ESTA RETORNANDO ALGO")
      let newLogs: Log[] = [];
      for (let i of logs) {
        if (i.id === log.id) {
          newLogs.push(log);
        } else {
          newLogs.push(i);
          console.log("newLogs  LUEGO",newLogs)
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

  setOneItem(name: string, value: string) {
    //     Guardar datos en el navegador
      this.storage.set(name, value);
    }
    
    getOneItem(name: string) {
    //     Recuperar datos
    this.storage.get(name)
      .then((res) => {
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

}
