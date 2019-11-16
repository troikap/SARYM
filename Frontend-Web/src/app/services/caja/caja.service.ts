import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EstadoCaja } from 'src/app/model/estadocaja/estadocaja.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class CajaService {
  url = environment.urlNgrok || environment.url;
  dir = "/caja";
  dirNro = "/nroCaja";
  dirEstado = "/estadocaja";
  dirTipoMovimientoCaja = "/tipomovimientocaja";
  dirMovimientoCaja = "/realizarMovimiento";
  dir3 = "/todo";
  dirUpdateDatos = "/actualizarDatos";
  dirUpdateEstado = "/cambiarEstado";
  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getCaja(termino: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http.get(`${this.url}${this.dir}/${termino}`, { headers }).pipe(
      map((data: any) => {
        if (data != null) {
          return data.data;
        }
      })
    );
  }

  getCajasByAll(termino: string) {
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("token", this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
        .pipe(
          map((data: any) => {
            if (data != null) {
              return data.data;
            }
          })
        );
    }
  }

  getCajas(): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, { headers })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch();
  }

  getEstadosCaja(): Promise<EstadoCaja[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dirEstado, { headers })
      .toPromise()
      .then(response => {
        return response as EstadoCaja[];
      })
      .catch();
  }
  getTipoMovimientoCajas(): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dirTipoMovimientoCaja, { headers })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch();
  }

  updateCaja(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirUpdateDatos}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }

  updateCajaEstado(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirUpdateEstado}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }

  createMovimientoCaja(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirMovimientoCaja}`, datas, {
        headers
      })
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }

  deleteCaja(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idUsuario}`, { headers })
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }

  setCaja(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }
}
