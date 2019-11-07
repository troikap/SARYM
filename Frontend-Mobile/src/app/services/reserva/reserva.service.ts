import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reserva } from '../../models/modelos';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  
  url = environment.urlNgrok || environment.url;

  tokenEnviroment = environment.token;

  dir = '/reserva';
  dir2 = '/editarComensal';
  dir3 = '/editarMesa';
  dir4 = '/actualizarDatos';
  dirTodo = "/todo";
  dirComensal = "/getToComensal";
  dirCambiarEstado = '/cambiarEstado';

  constructor( 
    public http: HttpClient,
    private storage: StorageService,
  ) { }

  getProductosByAll( termino: string) { //Observador
    console.log("Service getProductosByAll: Termino = ", termino);
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
    }
    else {
      // console.log("Service getProductosByAll: SIN TERMINO");
    }
  }

   getReservas(): Promise<Reserva[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Service getReservas: ", response);
        return response['data'] as Reserva[];
      })
      .catch(  );
  }

  getReserva( id: number ): Promise<Reserva> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Service getReserva: ", response);
        return response['data'] as Reserva;
      })
      .catch(  );
  }

  getReservasPorUsuario(idUsuario: number): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log(`${this.url}${this.dir}${this.dirComensal}/${idUsuario}`);
    return this.http
      .post(`${this.url}${this.dir}${this.dirComensal}/${idUsuario}`, {estado: 'Generada'}  , {headers})
      .toPromise()
      .then(response => {
        console.log("Service getReservasPorUsuario: ", response['detalles']);
        return response['detalles'] as any[];
      })
      .catch(  );
  }

  updateReserva( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir4}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setReserva( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setComensalesReserva( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir2}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setMesasReserva( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  cambiarEstado( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarEstado}`, datas, {headers})
      .toPromise()
      .then(response => {
        console.log("Servicio cambiarEstado()", response);
        return response;
      })
      .catch(  );
  }
}

