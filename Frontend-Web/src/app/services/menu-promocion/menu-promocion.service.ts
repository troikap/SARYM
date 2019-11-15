import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class MenuPromocionService {
  url = environment.urlNgrok || environment.url;
  dir = "/menupromocion";
  dir2 = "/todo";
  dirEstado = "/estadomenupromocion";
  ditActalizarDatos = "/actualizarDatos";
  dirCambiarEstado = "/cambiarEstado";
  dirHabilitarDeshabilitarMenuPromocion = "/habilitarDeshabilitarMenuPromocion";
  dirCambiarPrecio = "/cambiarPrecio";
  dirEditarProducto = "/editarProductos";

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getMenuPromocionByAll(termino: string) {
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("token", this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir2}/${termino}`, { headers })
        .pipe(
          map((data: any) => {
            if (data != null) {
              return data.data;
            }
          })
        );
    } else {
    }
  }

  getAllMenuPromocion() {
    //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {});
  }

  getMenuPromocion(id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, { headers })
      .toPromise()
      .then((response: any) => {
        return response.data;
      })
      .catch();
  }

  updateMenuPromocion(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.ditActalizarDatos}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  deleteMenuPromocion(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idMenuPromocion}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  crearMenuPromocion(datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  cambiarEstado(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarEstado}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  habilitarDeshabilitarMenuPromocion(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(
        `${this.url}${this.dir}${this.dirHabilitarDeshabilitarMenuPromocion}`,
        {},
        { headers }
      )
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  cambiarPrecio(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirCambiarPrecio}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  editarProductoMenuPromocion(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dirEditarProducto}`, datas, {
        headers
      })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }
}
