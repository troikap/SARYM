import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Estadia, Pago } from '../../models/modelos';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  dir = '/pago';
  dir2 = '/getPagoToEstadia';
  dir3 = '/editarPagoPedido';
  dir4 = '/actualizarDatos';
  dirTodo = "/todo";

  constructor( 
    public http: HttpClient,
    private storage: StorageService,
  ) { }

  getPagosByAll( termino: string) { //Observador
    console.log("Service getPagosByAll: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dirTodo}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    } else {
        console.log("falta mandar TERMINO")
        return "mandale TERMINO!"
    }
  }

   getPagos(): Promise<Pago[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Service getEstadias: ", response);
        return response['data'] as Pago[];
      })
      .catch(  );
  }

  getPago( id: number ): Promise<Pago> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Pago;
      })
      .catch();
  }

  getPagosPorEstadia(idEstadia: number): Promise<Pago[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}${this.dir2}/${idEstadia}`, {} , {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Pago[];
      })
      .catch(  );
  }

  updatePago( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir4}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Pago;
      })
      .catch(  );
  }

  setPago( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     console.log("Servicio Crear Pago, datos: ", datas);
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Pago;
      })
      .catch(  );
  }

  setPagoPedido( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     console.log("Servicio setPagoPedido: ", datas);
     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        console.log("Respuesta servicio PagoPedido: ", response);
        return response;
      })
      .catch(  );
  }
}
