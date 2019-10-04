import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Producto } from './producto.model'

const URL = environment.urlNgrok || environment.url;
const dir = '/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(
    public http: HttpClient
  ) { }

  getProductos(token: string): Promise<Producto[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response as Producto[];
      })
      .catch(  );
  }

  getProducto( id: number , token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(`${URL}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Producto;
      })
      .catch(  );
  }

}