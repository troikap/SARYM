import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Caja } from '../../models/modelos';

@Injectable({
  providedIn: 'root'
})

export class CajaService {
  url = environment.urlNgrok || environment.url;
  dir = '/caja';
  dirCambiarEstado = '/cambiarEstado';
  dirRealizarMovimiento = '/realizarMovimiento'

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient,
  ) { }

  getCajas(): Promise<Caja[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        if ( response && response['tipo'] == 1) {
          return response['data'] as Caja[];
        } else {
        }
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

  getCaja( id: number ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  cambiarEstado( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
    .put(`${this.url}${this.dir}${this.dirCambiarEstado}`, datas, {headers})
    .toPromise()
    .then(response => {
      console.log("Servicio cambiarEstadoMesa()", response);
      return response;
    })
    .catch(  );
  }

  realizarMovimientoCaja( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
    .put(`${this.url}${this.dir}${this.dirRealizarMovimiento}`, datas, {headers})
    .toPromise()
    .then(response => {
      console.log("Servicio cambiarEstadoMesa()", response);
      return response;
    })
    .catch(  );
  }
}


