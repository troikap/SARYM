import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from './mesa.model';

const URL = environment.urlNgrok || environment.url;
const dir = '/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(
    public http: HttpClient
  ) { }

  getMesas(token: string): Promise<Mesa[]> {
    console.log("ENTRANDO A GET MESA")
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(URL + dir, {headers})
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


