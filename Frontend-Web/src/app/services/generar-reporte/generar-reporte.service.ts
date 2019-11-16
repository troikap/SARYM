import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenerarReporteService {

  url = environment.urlNgrok || environment.url;
  dir = "/";
  dir2 = "/";
  dir3 = "/";
  tokenEnviroment = environment.token;

  constructor( public http: HttpClient ) { }

  getReportes() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir3}`, { headers })
      .pipe(
        map((data: any) => {
          if (data != null) {
            return data;
          }
        })
      );
  }


}
