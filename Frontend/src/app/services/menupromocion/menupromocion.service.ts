import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MenuPromocion } from './menupromocion.model'

const URL = environment.urlNgrok || environment.url;
const dir = '/menupromocion';

@Injectable({
  providedIn: 'root'
})
export class MenupromocionService {

  constructor(
    public http: HttpClient
  ) { }

  getMenuPromociones(token: string): Promise<MenuPromocion[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response as MenuPromocion[];
      })
      .catch(  );
  }

  getMenuPromocion( id: number , token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(`${URL}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as MenuPromocion;
      })
      .catch(  );
  }

}