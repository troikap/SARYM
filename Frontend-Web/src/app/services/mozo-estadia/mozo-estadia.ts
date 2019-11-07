import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MozoEstadiaService {

   url = environment.urlNgrok || environment.url;
   dir = '/Estadia';
   dir3 = '/todo';
   dir4 = '/generada';
   dir5 = '/actualizarDatos'; 

   tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

 

  getEstadiaByAll( termino: string) { //Observador
    console.log("Service getEstadiaByName: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}${this.dir4}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
    }
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

 
}