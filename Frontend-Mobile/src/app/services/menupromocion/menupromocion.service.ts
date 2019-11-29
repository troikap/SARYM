import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MenuPromocion } from './menupromocion.model'

const dir = '/menupromocion';

@Injectable({
  providedIn: 'root'
})
export class MenupromocionService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMenuPromociones(): Promise<MenuPromocion[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + dir, {headers})
      .toPromise()
      .then(response => {
        return response as MenuPromocion[];
      })
      .catch(  );
  }

  getMenuPromocion( id: number): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as MenuPromocion;
      })
      .catch(  );
  }

}