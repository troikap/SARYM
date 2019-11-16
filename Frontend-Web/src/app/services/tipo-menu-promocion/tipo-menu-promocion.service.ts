import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class TipoMenuPromocionService {
  url = environment.urlNgrok || environment.url;
  dir = "/tipomenupromocion";
  dir2 = "/todo";
  dirEstado = "/estadomenupromocion";

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getAllTipoMenuPromocion() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }

  getAllEstadoMenuPromocion() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dirEstado}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }
}
