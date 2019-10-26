import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.urlNgrok || environment.url;
  dir = '/subirImagen';

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient) { }

  uploadFile( archivo) { 
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, archivo , {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

  getFile( carpeta: string, img: string) { 
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${carpeta}/${img}`, {headers})
      .pipe( map ((data: any) => {
        console.log(data.data);
        if (data != null) {
          return data.data;
        }
    }));
    
  }
  
}
