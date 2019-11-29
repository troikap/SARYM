import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const dir = '/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  constructor( 
    public http: HttpClient
  ) { }

   getDepartamentos( ): Promise<Departamento[]> {
    let headers: HttpHeaders = new HttpHeaders();
    let token;
    if (this.tokenEnviroment == null) { token = 'libre' } else { token = this.tokenEnviroment}
    headers = headers.append('token', token);
    return this.http
      .get( this.url + dir, {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Departamento[];
      })
      .catch(  );
  }
}

export interface Departamento {
  idDepartamento: string;
  nombreDepartamento: string;
}
