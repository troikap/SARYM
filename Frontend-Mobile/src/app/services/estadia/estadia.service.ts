import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Estadia } from '../../models/modelos';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EstadiaService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  dir = '/estadia';
  dir2 = '/editarComensal';
  dir3 = '/editarMesa';
  dir4 = '/actualizarDatos';
  dirTodo = "/todo";
  dirComensal = "/getToComensal";
  dirCambiarEstado = '/cambiarEstado';
  dirUsuario = "/getToUsuario";
  dirCambiarMozoEstadia = "/cambiarMozoEstadia";
  dirEditarClienteEstadia = "/editarClienteEstadia";
  dirMesa = "/getToMesa";


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

   getEstadias(): Promise<Estadia[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Service getEstadias: ", response);
        return response['data'] as Estadia[];
      })
      .catch(  );
  }

  getEstadia( id: number ): Promise<Estadia> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Estadia;
      })
      .catch();
  }

  getEstadiasPorUsuario(idUsuario: number): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    // console.log("URL ",`${this.url}${this.dir}${this.dirUsuario}/${idUsuario}`)
    return this.http
      .post(`${this.url}${this.dir}${this.dirUsuario}/${idUsuario}`, {} , {headers})
      .toPromise()
      .then(response => {
        // console.log("Service getEstadiasPorUsuario: ", response);
        return response as any[];
      })
      .catch(  );
  }

  updateEstadia( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir4}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Estadia;
      })
      .catch(  );
  }

  setEstadia( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     console.log("Servicio Crear Estadia, datos: ", datas);
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Estadia;
      })
      .catch(  );
  }

  setClienteEstadia(datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    let data = {headers}
    console.log("Servicio Crear Estadia, datos: ", datas);
    return this.http
      .put(`${this.url}${this.dir}${this.dirEditarClienteEstadia}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Estadia;
      })
      .catch(  );
  }

  setComensalesEstadia( datas, eliminar? ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    let data = {headers}
    datas['eliminar'] = eliminar;
    console.log("Servicio setComensalesEstadia", datas);
    return this.http
      .put(`${this.url}${this.dir}${this.dir2}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Estadia;
      })
      .catch(  );
  }

  setMesasEstadia( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}

     console.log("Servicio setMesasEstadia: ", datas);

     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        console.log("Respuesta servicio Editar Mesas: ", response);
        return response as Estadia;
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

  cambiarMozoEstadia( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarMozoEstadia}`, datas, {headers})
      .toPromise()
      .then(response => {
        console.log("Servicio cambiarMozoEstadia()", response);
        return response;
      })
      .catch(  );
  }

  getEstadiaPorMesa( idMesa ): Promise<Estadia> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .post(`${this.url}${this.dir}${this.dirMesa}/${idMesa}`, {} , data)
      .toPromise()
      .then(response => {
        if ( response ) {
          if ( response['tipo'] == 1) {
            return response['data'] as Estadia;
          } else {
  
          }

        }
      })
      .catch(  );
  }
}


