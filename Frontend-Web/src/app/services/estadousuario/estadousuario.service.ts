import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const url = environment.urlNgrok || environment.url;
const dir = '/estadousuario';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {

  tokenEnviroment = environment.token;

  constructor( 
    public http: HttpClient
  ) { }

   getEstadosUsuarios( ): Promise<EstadoUsuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get( (url + dir), {headers})
      .toPromise()
      .then(response => {
        console.log('RESPUESTA',response)
        return response['data'] as EstadoUsuario[];
      })
      .catch(  );
  }
}

export interface EstadoUsuario {
  idEstadoUsuario: string;
  nombreEstadoUsuario: string;
}