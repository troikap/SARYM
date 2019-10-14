import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioReservaService {

  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();
  private datos;

  constructor() { }

  sendObjectSource( data:any ) {
    this.datos = data;
    this.objectSource.next(this.datos);
    // this.limpiar();
  }

  limpiar() {
    this.objectSource = new BehaviorSubject<{}>({});
    this.$getObjectSource = this.objectSource.asObservable();
  }
}
