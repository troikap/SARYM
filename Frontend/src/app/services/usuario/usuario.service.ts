import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;
const dir = '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( 
    public http: HttpClient
  ) { }

   getUsuarios(): Promise<Usuario[]> {
    return this.http
      .get(URL + dir)
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch(  );
  }

  getUsuario( id: number ): Promise<any> {
    console.log(`${URL}${dir}/${id}`)
    return this.http
      .get(`${URL}${dir}/${id}`)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  loguear( cuit: number, pass: string ): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    console.log("value ",value)
    console.log(`${URL}${dir}/logueo`)
    return this.http
      .post(
        `${URL}/login`,
        value
        )
      .toPromise()
      .then(response => {
        console.log("aaaa ",response)
        return response as Usuario;
      })
      .catch(  );
  }

  setUsuario( data ): Promise<any> {
    console.log(`${URL}${dir}`)
    return this.http
      .post(`${URL}${dir}`, data)
      .toPromise()
      .then(response => {
        console.log("RESPUESTA",response)
        return response as Usuario;
      })
      .catch(  );
  }
}

export interface Usuario {
  idUsuario: string;
  cuitUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  contrasenaUsuario: string;
  dniUsuario: number;
  domicilioUsuario: string;
  emailUsuario: string;
  idDepartamento: number;
  nroCelularUsuario: number;
  nroTelefonoUsuario: number;
}