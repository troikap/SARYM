import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; // Da error

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  
  url = environment.urlNgrok || environment.url;
  dir = '/unidadmedida';

  constructor(public http: HttpClient) {}
   
  getUnidadMedida( termino: string) { //Observador
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', 'libre');
    return this.http
      .get(`${this.url}${this.dir}/${termino}`, {headers})
      .pipe( map ((data: any) => {
        console.log(data.data);
        return data.data;
      }));
  }

  getAllUnidadMedida() { //Promesa
    return this.http
      .get(`${this.url}${this.dir}`)
      .toPromise()
      .then(response => {
        console.log("UNIDAD MEDIDA ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }


}
