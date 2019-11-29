import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Producto } from './producto.model'

const dir = '/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getProductos(): Promise<Producto[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + dir, {headers})
      .toPromise()
      .then(response => {
        return response as Producto[];
      })
      .catch(  );
  }

  getProducto( id: number , token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token',this.tokenEnviroment);
    return this.http
      .get(`${this.url}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Producto;
      })
      .catch(  );
  }

}