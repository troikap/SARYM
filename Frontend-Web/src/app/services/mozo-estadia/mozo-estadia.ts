import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MozoEstadiaService {

   url = environment.urlNgrok || environment.url;
   dir = '/estadia';
   dir1= '/getToMesa';
   dir2= '/mozoestadia';
   dir3 = '/todo';
   dir4 = '/generada';
   dir5 = '/actualizarDatos'; 

   tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

 

  getEstadiaByAll( termino: string) { //Observador
    console.log("parametro en servicio",termino);
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}${this.dir1}/${termino}`, termino, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

  getEstadias(): Promise<any[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch();
  }
  getEstadia( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

  

  updateEstadia( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}${this.dir5}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as any;
      })
      .catch(  );
  }

  getMozoEstadia(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
   return this.http
     .get(this.url + this.dir2, {headers})
     .toPromise()
     .then(response => {
       return response as any;
     })
     .catch();

  }
 
}