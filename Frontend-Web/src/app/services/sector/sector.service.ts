import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Sector } from '../../model/Sector/sector.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  url = environment.urlNgrok || environment.url;
  dir = '/sector';
  dir2 = '/codSector'; //cuitUsuario
  dir3 = '/todo';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getSectorCod(cod: number): Promise<Sector> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cod}`, { headers })
      .toPromise()
      .then(response => {
        return response as Sector;
      })
      .catch();
  }

  getSectorByAll(termino: string) { //Observador
    console.log("Service getSectorByName: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
        .pipe(map((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
        }));
    }
    else {
    }
  }

  getSectores(): Promise<Sector[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, { headers })
      .toPromise()
      .then(response => {
        return response as Sector[];
      })
      .catch();
  }

  getSector(id: number): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, { headers })
      .toPromise()
      .then(response => {
        return response as Sector;
      })
      .catch();
  }

  updateSector(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :", datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Sector;
      })
      .catch();
  }

  deleteSector(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("valor del Header:", headers)
    console.log("DATOS A ENVIAR:", datas)
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idSector}`, { headers })
      .toPromise()
      .then(response => {
        return response as Sector;
      })
      .catch();
  }

  setSector(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Sector;
      })
      .catch();
  }
}
