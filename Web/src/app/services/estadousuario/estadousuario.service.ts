import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const url = environment.urlNgrok || environment.url;
const dir = '/estadousuario';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {

  constructor( 
    public http: HttpClient
  ) { }

   getEstadosUsuarios( ): Promise<EstadoUsuario[]> {
    return this.http
      .get( (url + dir))
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