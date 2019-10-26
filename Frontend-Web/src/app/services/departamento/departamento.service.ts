import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const url = environment.urlNgrok || environment.url;
const dir = '/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  tokenEnviroment = environment.token;

  constructor( 
    public http: HttpClient
  ) { }

   getDepartamentos( ): Promise<Departamento[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get( (url + dir), {headers})
      .toPromise()
      .then((response: any) => {
        console.log("Servicio Departamentos:", response.data);
        return response.data as Departamento[];
      })
      .catch(  );
  }
}

export interface Departamento {
  idDepartamento: string;
  nombreDepartamento: string;
}
