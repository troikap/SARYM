import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const dir = '/traerImagen';

@Injectable({
  providedIn: 'root'
})

export class ImagenService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }

  getImagen(token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + dir, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

}
