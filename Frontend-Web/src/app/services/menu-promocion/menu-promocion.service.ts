import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Producto } from 'src/app/model/producto/producto.model';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MenuPromocion } from 'src/app/model/menu-promocion/menu-promocion.model';

@Injectable({
  providedIn: 'root'
})
export class MenuPromocionService {

  url = environment.urlNgrok || environment.url;
  dir = '/menupromocion';
  dir2 = '/todo';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getMenuPromocionByAll( termino: string) { //Observador
    console.log("Service getMenuPromocionByAll: Termino = ", termino);
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
      // console.log("Service getMenuPromocionByAll: SIN TERMINO");
    }
  }

  getAllMenuPromocion() { //Promesa
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Menu Promocion Obtenidos: ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }


  getMenuPromocion( id: number ): Promise<MenuPromocion> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers}) 
      .toPromise()
      .then(response => {
        let prod = response as MenuPromocion;
        console.log("Datos Obtenidos del Servicio:", prod['MenuPromocion']);
        return prod['MenuPromocion'];
      })
      .catch(  );
  }

  updateMenuPromocion( datas: any ): Promise<any> {
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

  deleteMenuPromocion( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("Valor Header:", headers);
    console.log("DATOS A ENVIAR :",datas);
    return this.http
      .delete(`${this.url}${this.dir}/${datas.idMenuPromocion}`, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  createMenuPromocion( datas ): Promise<any> {
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
