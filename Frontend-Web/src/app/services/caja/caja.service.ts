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
  dirNro = '/nroCaja'
  dirEstado = '/estadocaja';

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}
   
  getCaja( termino: string) { //Observador
    // console.log("Service getCaja: Termino = ", termino);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${termino}`, {headers})
      .pipe( map ((data: any) => {
        console.log(data.data);
        if (data != null) {
          return data.data;
        }
    }));
    
  }

  getCajaByNro( termino: number) { //Observador
    console.log("Service getCaja: Termino = ", termino);
    if (termino != null) {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dirNro}/${termino}`, {headers})
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
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("CAJA ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  getAllEstadoCaja() { //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dirEstado}`, {headers})
      .toPromise()
      .then(response => {
        console.log("ESTADO CAJA ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }


  updateCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  deleteCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("Valor Header:", headers);
    console.log("DATOS A ENVIAR :",datas);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idCaja}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  createCaja( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment); 
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }


}
