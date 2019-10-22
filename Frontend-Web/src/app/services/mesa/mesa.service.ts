import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from '../../model/mesa/mesa.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

   url = environment.urlNgrok || environment.url;
   dir = '/mesa';
   dir2 = '/codMesa';
   dir3 = '/todo';

   tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMesaCod(cod: number): Promise<Mesa> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cod}`, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa;
      })
      .catch(  );
  }

  getMesaByAll( termino: string) { //Observador
    console.log("Service getUsuarioByName: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
    }
  }

  getMesas(): Promise<Mesa[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa[];
      })
      .catch();
  }

  getMesa( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa;
      })
      .catch(  );
  }

  updateMesa( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa;
      })
      .catch(  );
  }

  deleteMesa( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("valor del Header:",headers)
    console.log("DATOS A ENVIAR:",datas)
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idMesa}`, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa;
      })
      .catch();
  }

  setMesa( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa;
      })
      .catch();
  }
}