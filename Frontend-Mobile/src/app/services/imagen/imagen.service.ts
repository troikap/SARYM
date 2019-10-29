import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.urlNgrok || environment.url;
const dir = '/traerImagen';

@Injectable({
  providedIn: 'root'
})

export class ImagenService {

  constructor(
    public http: HttpClient
  ) { }

  getImagen(token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(  );
  }

}
