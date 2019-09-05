import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Item {
  id: number,
  title: string,
  value: string,
  modified: number
}

export interface Log {
  cuit: number,
  pass: string,
  date: Date
}
const LOG_KEY = 'logueo';

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage
  ) { }

  // Create   
addItem(item: Item): Promise<any> {
  return this.storage.get(ITEMS_KEY)
  .then( (items: Item[]) => {
    if (items) {
      items.push(item)
      return this.storage.set(ITEMS_KEY, items);
    } else {
      return this.storage.set(ITEMS_KEY, [item]);
    }
  })
}

addLog(log: Log): Promise<any> {
  return this.storage.get(LOG_KEY)
  .then( (logs: Log[]) => {
    if (logs) {
      logs.push(log)
      return this.storage.set(LOG_KEY, logs);
    } else {
      return this.storage.set(LOG_KEY, [log]);
    }
  })
}

// Read
getItem(): Promise<Item[]> {
  return this.storage.get(ITEMS_KEY);
}

getLog(): Promise<Log> {
  return this.storage.get(LOG_KEY);
}

// Update
updateItem(item: Item): Promise<any> {
  return this.storage.get(ITEMS_KEY)
    .then((items: Item[]) => {
      if(!items || items.length === 0) {
        return null;
      }
      let newItems: Item[] = [];
      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
    })
}

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
        if (i.cuit === log.cuit) {
          newLogs.push(log);
        } else {
          newLogs.push(i);
        }
      }
      return this.storage.set(LOG_KEY, newLogs);
    })
}

// Delete
deleteItem(id: number): Promise<Item> {
  return this.storage.get(ITEMS_KEY)
    .then((items: Item[]) => {
      if (!items || items.length === 0) {
        return null;
      }
      let toKeep: Item[] = [];
      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    })
}

  setOneItem(name: string, value: string) {
    //     Guardar datos en el navegador
      this.storage.set(name, value);
    }
    
    getOneItem(name: string) {
    //     Recuperar datos
    this.storage.get(name)
      .then((res) => {
        console.log('BBBBBBBBBBBBBBBBBBB ', res)
      })
    }
    setOneObject(name: string, object: any) {
    //     Guardar objetos en el LocalStorage
      this.storage.set(name, JSON.stringify(object));
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
