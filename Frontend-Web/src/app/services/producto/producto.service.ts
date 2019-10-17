import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/model/producto/producto.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  
  url = environment.urlNgrok || environment.url;
  dir = '/producto';
  dir2 = '/todo';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getProductosByAll( termino: string) { //Observador
    console.log("Service getProductosByAll: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir2}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getProductos: SIN TERMINO");
    }
  }

  getAllProductos() { //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Prodcutos Obtenidos: ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  updateProductos( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  deleteProductos( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("Valor Header:", headers);
    console.log("DATOS A ENVIAR :",datas);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idProductos}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  createProductos( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment); 
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }
}
