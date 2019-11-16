import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  url = environment.urlNgrok || environment.url;
  dir = "/cargarBackup";
  dir2 = "/generarBackup";

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }
  
  generarBackup () {
    console.log("BackupService: Generar Backup");

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, { headers })
      .toPromise()
      .then(response => {
        return response;
      })
      .catch();
  
  }

  cargarBackup(archivo) {

    console.log("BackupService: Cargar Backup");

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
}
