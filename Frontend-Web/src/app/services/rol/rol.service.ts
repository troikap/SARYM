import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RolService {
  url = environment.urlNgrok || environment.url;
  
  dir = "/rol";
  dir2 = "/codRol";
  dir3 = "/name";
  dir4 = "/funcion";
  dir5 = "/editarFuncion";

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getRoles(): Promise<Rol[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, { headers })
      .toPromise()
      .then(response => {
        return response as Rol[];
      })
      .catch();
  }

  getRolCod(cod: number): Promise<Rol> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cod}`, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  getRolByAll(termino: string) {
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("token", this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
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

  getFuncionesByRol(termino: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  getFuncionesByRol3(termino: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
      .toPromise()
      .then(response => {
        return response['data'][0].funcionrols;
      })
      .catch();
  }

  getFuncionesByRol2(termino: string, nombreFuncion: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
      .toPromise()
      .then(response => {
        let aux = false;
        let funcionRols = response['data'][0].funcionrols;
        for (let item of funcionRols) {
          if (item.funcion.nombreFuncion == nombreFuncion) {
            aux = true;
          }
        }
        return aux;
      })
      .catch();
  }

  getRol(id: number): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  getFuncionesRolAll(): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir4, { headers })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch();
  }

  getFuncionesRol(id: number): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir4}/${id}`, { headers })
      .toPromise()
      .then(response => {
        return response as any[];
      })
      .catch();
  }

  updateFuncionesRol(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}${this.dir5}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  updateRol(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  deleteRol(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idRol}`, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }

  setRol(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Rol;
      })
      .catch();
  }
}

export interface Rol {
  idRol: string;
  nombreRol: string;
}
