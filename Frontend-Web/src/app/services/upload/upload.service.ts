import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  url = environment.urlNgrok || environment.url;
  dir = "/subirImagen";
  dir2 = "/traerImagen";

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) {}

  uploadFile(archivo) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, archivo, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  }

  getFile(carpeta: string, img: string) {
    return `${this.url}${this.dir2}/${carpeta}/${img}`;
  }
}
