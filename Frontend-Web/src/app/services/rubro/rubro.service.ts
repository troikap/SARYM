import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RubroService {
  url = environment.urlNgrok || environment.url;
  dir = '/rubro';
  dir2 = '/todo';

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) { }

  getRubro( termino: string) { //Observador
    // console.log("Service getRubro: Termino = ", termino);
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

  getRubroByAll( termino: string) { //Observador
    console.log("Service getRubroName: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir2}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getRubro: SIN TERMINO");
    }
  }

  getAllRubro() { //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Rubro: ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  updateRubro( datas: any ): Promise<any> {
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

  deleteRubro( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("Valor Header:", headers);
    console.log("DATOS A ENVIAR :",datas);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idRubro}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  createRubro( datas ): Promise<any> {
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
