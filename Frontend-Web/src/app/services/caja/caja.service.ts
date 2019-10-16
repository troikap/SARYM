import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// import { UnidadMedida } from '../../model/unidad-medida/unidad-medida.model'; // Da error

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  
  url = environment.urlNgrok || environment.url;
  dir = '/caja';

  constructor(public http: HttpClient) {}
   
  getCaja( termino: string) { //Observador
    // console.log("Service getCaja: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', 'libre');
      return this.http
        .get(`${this.url}${this.dir}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getUnidadMedida: SIN TERMINO");
    }
  }

  getAllCaja() { //Promesa
    return this.http
      .get(`${this.url}${this.dir}`)
      .toPromise()
      .then(response => {
        console.log("CAJA ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }


  updateCaja( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
     console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  createCaja( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

}
