import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from './mesa.model';

@Injectable({
  providedIn: 'root'
})

export class MesaService {
  url = environment.urlNgrok || environment.url;
  dir = '/mesa';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMesas(): Promise<Mesa[]> {
    console.log("ENTRANDO A GET MESA")
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        return response as Mesa[];
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

}


