import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const url = environment.urlNgrok || environment.url;
const dir = "/rol";

@Injectable({
  providedIn: "root"
})
export class RolService {
  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  getRoles(): Promise<Rol[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(url + dir, { headers })
      .toPromise()
      .then(response => {
        return response["data"] as Rol[];
      })
      .catch();
  }
}

export interface Rol {
  idRol: string;
  nombreRol: string;
}
