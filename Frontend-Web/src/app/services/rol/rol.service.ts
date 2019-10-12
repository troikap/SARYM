import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const url = environment.urlNgrok || environment.url;
const dir = '/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor( 
    public http: HttpClient
  ) { }

   getRoles( ): Promise<Rol[]> {
    return this.http
      .get( (url + dir))
      .toPromise()
      .then(response => {
        console.log('RESPUESTA',response)
        return response['data'] as Rol[];
      })
      .catch(  );
  }
}

export interface Rol {
  idRol: string;
  nombreRol: string;
}