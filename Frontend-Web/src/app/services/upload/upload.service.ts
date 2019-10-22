import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.urlNgrok || environment.url;
  dir = '/subirImagen';

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) { }


  uploadFile( formData ) { //Observador
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    console.log("IMAGEN ENVIADA:",formData)
    return this.http
      .post(`${this.url}${this.dir}`, formData )
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  // subirImagen( datas: any ) { //Observador
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = headers.append('token', this.tokenEnviroment);
  //   console.log("IMAGEN ENVIADA:",datas)
  //   return this.http
  //     .put(`${this.url}${this.dir}`, datas, {headers})
  //     .toPromise()
  //     .then(response => {
  //       return response;
  //     })
  //     .catch(  );
  // }

}
