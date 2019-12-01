import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Estadia } from '../../models/modelos';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { ToastService } from '../../providers/toast.service'

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
    private toastService: ToastService,
  ) { }

  getProductosByAll( termino: string): Promise<Estadia[]> {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dirTodo}/${termino}`, {headers})
        .toPromise()
        .then( response => {
          console.log("RESPUESTA ", response)
          if ( response ) {
            if ( response['tipo'] == 1) {
              return response['data'] as Estadia[] ;
            } else {
              this.toastService.toastWarning('No se encontró Estadia en proceso.', 2000)
            }
          } else {
            this.toastService.toastError('No se pudo realizar la busqueda de Estadía.', 2000)
          }
        }).catch();
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
    return this.http
      .post(`${this.url}${this.dir}${this.dirUsuario}/${idUsuario}`, {} , {headers})
      .toPromise()
      .then(response => {
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
        return response;
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
        return response;
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
        console.log("Resupesrta setClienteEstadia: ", response);
        return response;
      })
      .catch(  );
  }

  setComensalesEstadia( datas, eliminar? ): Promise<any> {
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
      .catch(  );
  }

  setMesasEstadia( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Estadia;
      })
      .catch(  );
  }

  cambiarEstado( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarEstado}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  cambiarMozoEstadia( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarMozoEstadia}`, datas, {headers})
      .toPromise()
      .then(response => {
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
            this.toastService.toastWarning('No se encontró Estadia.', 2000)
          }
        } else {
          this.toastService.toastError('No se pudo realizar la busqueda de Estadía.', 2000)
        }
      })
      .catch(  );
  }
}


