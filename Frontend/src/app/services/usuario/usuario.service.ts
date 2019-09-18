import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.urlNgrok || environment.url;
const dir = '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( 
    public http: HttpClient
  ) { }

  getUsuarios(token: string): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch(  );
  }

  getUsuario( id: number , token: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(`${URL}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  loguear( cuit: number, pass: string ): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    return this.http
      .post(
        `${URL}/login`,
        value
        )
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  updateUsuario( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .put(`${URL}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  setUsuario( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .post(`${URL}${dir}`, datas, data)
      .toPromise()
      .then(response => {
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