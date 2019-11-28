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
  
  private url = environment.urlNgrok || environment.url;

  private tokenEnviroment = environment.token;

  private dir = '/reserva';
  private dir2 = '/editarComensal';
  private dir3 = '/editarMesa';
  private dir4 = '/actualizarDatos';
  private dirTodo = "/todo";
  private dirComensal = "/getToComensal";
  private dirCambiarEstado = '/cambiarEstado';

  constructor( 
    private http: HttpClient,
    private storage: StorageService,
  ) { }

  getReservasPorEstado( termino: string) {
    console.log("Service getReservasPorEstado: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
      .get(`${this.url}${this.dir}${this.dirTodo}/${termino}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      });
    }
    else {
      // console.log("Service getReservasPorEstado: SIN TERMINO");
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
        return response['data'] as Reserva;
      })
      .catch();
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
     console.log("Servicio Crear Reserva, datos: ", datas);
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setComensalesReserva( datas, eliminar? ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     datas['eliminar'] = eliminar;
       return this.http
         .put(`${this.url}${this.dir}${this.dir2}`, datas, data)
         .toPromise()
         .then(response => {
           return response;
         })
         .catch( err => {
          console.log("Error ", err)
        })
  }

  setMesasReserva( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}

     console.log("Servicio setMesasReserva: ", datas);

     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        console.log("Respuesta servicio Editar Mesas: ", response);
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

