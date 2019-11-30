import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from './mesa.model';

@Injectable({
  providedIn: 'root'
})

export class MesaService {
  url = environment.urlNgrok || environment.url;
  dir = '/mesa';
  dirCambiarEstado = '/cambiarEstado';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMesas(): Promise<Mesa[]> {
    console.log("ENTRANDO A GET MESA")
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
    .get(`${this.url}${this.dir}`, {headers})
    .toPromise()
    .then(response => {
      return response as Mesa[];
    })
    .catch( err => {
      console.log("ERRROR ", err)
      return err
    });
  }

  cambiarEstado( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
    .put(`${this.url}${this.dir}${this.dirCambiarEstado}`, datas, {headers})
    .toPromise()
    .then(response => {
      console.log("Servicio cambiarEstadoMesa()", response);
      return response;
    })
    .catch(  );
  }
}


