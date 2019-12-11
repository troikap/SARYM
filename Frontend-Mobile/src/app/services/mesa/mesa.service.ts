import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from '../../models/modelos';
import { ToastService } from '../../providers/toast.service';

@Injectable({
  providedIn: 'root'
})

export class MesaService {
  url = environment.urlNgrok || environment.url;
  dir = '/mesa';
  dirCambiarEstado = '/cambiarEstado';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient,
    private toastService: ToastService
  ) { }

  getMesas(): Promise<Mesa[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        if ( response && response['tipo'] == 1) {
          return response['data'] as Mesa[];
        } else {
          // this.toastService.toastWarning('Tuvimos un problema al intentar obtener las mesas', 2000)
        }
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

  getMesa( id: number ) {
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
}


