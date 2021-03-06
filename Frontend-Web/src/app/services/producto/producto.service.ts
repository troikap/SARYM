import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Producto } from "src/app/model/producto/producto.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductoService {
  url = environment.urlNgrok || environment.url;
  dir = "/producto";
  dir2 = "/todo";
  dirEstado = "/estadoproducto";
  ditActalizarDatos = "/actualizarDatos";
  dirCambiarEstado = "/cambiarEstado";
  dirHabilitarDeshabilitarProducto = "/habilitarDeshabilitarProducto";
  dirCambiarPrecio = "/cambiarPrecio";

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getProductosByAll(termino: string) {
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

  getAllProductos() {
    //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }

  getProducto(id: number): Promise<Producto> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, { headers })
      .toPromise()
      .then((response: any) => {
        let prod = response.data as Producto;
        return prod;
      })
      .catch();
  }

  updateProducto(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.ditActalizarDatos}`, datas, {
        headers
      })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  deleteProductos(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idProductos}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  crearProducto(datas): Promise<any> {
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

  habilitarDeshabilitarProducto(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(
        `${this.url}${this.dir}${this.dirHabilitarDeshabilitarProducto}`,
        datas,
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

  getAllEstadoProducto() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dirEstado}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {});
  }
}
