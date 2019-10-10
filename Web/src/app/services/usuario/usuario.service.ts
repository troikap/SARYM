import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario/usuario.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   url = environment.urlNgrok || environment.url;
   dir = '/usuario';
   dir2 = '/cuitUsuario';

  constructor(
    public http: HttpClient
  ) { }

  loguear( cuit: number, pass: string ): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    return this.http
      .post(`${this.url}/login`, value )
      .toPromise()
      .then(response => {
        // console.log("USUARIO ", response)
        return response as Usuario;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  getUsuarioCuit(cuit: number): Promise<Usuario> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', 'token');
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cuit}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  getUsuarios(token: string): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
    return this.http
      .get(this.url + this.dir, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch(  );
  }

  getUsuario( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', 'token');
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  updateUsuario( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}`, datas, data)
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
      .post(`${this.url}${this.dir}`, datas, data)
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