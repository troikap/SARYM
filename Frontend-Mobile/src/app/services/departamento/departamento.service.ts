import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.urlNgrok || environment.url;
const dir = '/departamento';

const tokenEnviroment = environment.token;

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor( 
    public http: HttpClient
  ) { }

   getDepartamentos( ): Promise<Departamento[]> {
    let headers: HttpHeaders = new HttpHeaders();
    let token;
    if (tokenEnviroment == null) { token = 'libre' } else { token = tokenEnviroment}
    headers = headers.append('token', token);
    return this.http
      .get( URL + dir, {headers})
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
