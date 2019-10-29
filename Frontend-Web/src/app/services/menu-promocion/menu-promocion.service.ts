import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';

@Injectable({
  providedIn: 'root'
})
export class MenuPromocionService {

  url = environment.urlNgrok || environment.url;
  dir = '/menupromocion';
  dir2 = '/todo';
  dirEstado = '/estadomenupromocion';
  ditActalizarDatos = '/actualizarDatos'
  dirCambiarEstado = '/cambiarEstado';
  dirCambiarPrecio = '/cambiarPrecio';
  dirEditarProducto = '/editarProductos';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMenuPromocionByAll( termino: string) { //Observador
    console.log("Service getMenuPromocionByAll: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir2}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getMenuPromocionByAll: SIN TERMINO");
    }
  }

  getAllMenuPromocion() { //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Menu Promocion Obtenidos: ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }


  getMenuPromocion( id: number ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers}) 
      .toPromise()
      .then((response: any) => {
        console.log("Servicio getMenuPromocion: ", response.data);
        return response.data;
      })
      .catch(  );
  }

  updateMenuPromocion( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR:", datas)
    return this.http
      .put(`${this.url}${this.dir}${this.ditActalizarDatos}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  deleteMenuPromocion( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("Valor Header:", headers);
    console.log("DATOS A ENVIAR :",datas);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idMenuPromocion}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  crearMenuPromocion( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment); 
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
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

  cambiarPrecio( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarPrecio}`, datas, {headers})
      .toPromise()
      .then(response => {
        console.log("Servicio cambiarPrecio()", response);
        return response;
      })
      .catch(  );
  }

  editarProductoMenuPromocion(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
    .put(`${this.url}${this.dir}${this.dirEditarProducto}`, datas, {headers})
    .toPromise()
    .then(response => {
      console.log("Servicio editarProductoMenuPromocion()", response);
      return response;
    })
    .catch();
  }

}
