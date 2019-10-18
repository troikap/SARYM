import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CajaCreate, CajaEdit } from 'src/app/model/caja/caja.model';
import { EstadoCaja } from 'src/app/model/estadocaja/estadocaja.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  
  url = environment.urlNgrok || environment.url;
  dir = '/caja';
  dirNro = '/nroCaja'
  dirEstado = '/estadocaja';
  dir3 = '/todo';
  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}
   
  getCaja( termino: string) { //Observador
    // console.log("Service getTipoMoneda: Termino = ", termino);
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

  getCajasByAll( termino: string) { //Observador
    console.log("Service getCajaByNro: Termino = ", termino);
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
      // console.log("Service getUnidadMedida: SIN TERMINO");
    }
  }

  getCajas(): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, {headers})
      .toPromise()
      .then(response => {
        console.log("Trae Cajas: ", response);
        return response as any[];
        
      })
      .catch(  );
  }

  getEstadosCaja(): Promise<EstadoCaja[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dirEstado, {headers})
      .toPromise()
      .then(response => {
        console.log("Trae estados Caja: ", response);
        return response as EstadoCaja[];
      })
      .catch();
  }

  updateCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

  deleteCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("valor del Header:",headers)
    console.log("DATOS A ENVIAR:",datas)
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idUsuario}`, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

  setCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

}
