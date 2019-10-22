import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const url = environment.urlNgrok || environment.url;
const dir = "/estadomesa";

@Injectable({
  providedIn: "root"
})
export class EstadoMesaService {
  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getEstadosMesas(): Promise<EstadoMesa[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(url + dir, { headers })
      .toPromise()
      .then(response => {
        return response["data"] as EstadoMesa[];
      })
      .catch();
  }
}

export interface EstadoMesa {
  idEstadoMesa: string;
  nombreEstadoMesa: string;
}
