import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/usuario/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   url = environment.urlNgrok || environment.url;
   dir = '/usuario';
   dir2 = '/cuitUsuario';
   dir3 = '/todo';
   dirToken = '/verificarTokenRol';
   tokenEstaLogueado: string;

   tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient
  ) { }


  estaLogueado(): Promise<any> {
    let token = localStorage.getItem('token')
    let rol = localStorage.getItem('rolUsuario')
    let value = { token, rol }
    return this.http
      .post(`${this.url}${this.dirToken}`, value )
      .toPromise()
      .then(response => {
        console.log("USUARIO ", response)
        return response;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  getRolUsuarioLoggeado () {
    let rolUsuario = localStorage.getItem('rolUsuario');
    return rolUsuario;
  }

  loguear( cuit: number, pass: string ): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    return this.http
      .post(`${this.url}/login`, value )
      .toPromise()
      .then(response => {
        console.log("USUARIO ", response)
        return response as Usuario;
      })
      .catch( err => {
        console.log("ERROR : ",err)
      } );
  }

  getUsuarioCuit(cuit: number): Promise<Usuario> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cuit}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  getUsuarioByAll( termino: string) { //Observador
    console.log("Service getUsuarioByName: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getUnidadMedida: SIN TERMINO");
    }
  }

  getUsuarios(): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, {headers})
      .toPromise()
      .then(response => {
        console.log("Devuelve Usuarios: ", response);
        return response as Usuario[];
      })
      .catch();
  }

  getUsuario( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  updateUsuario( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     console.log("DATOS A ENVIAR :",datas)
    return this.http
      .put(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  deleteUsuario( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    let value = { descripcionUsuarioEstado: datas['descripcionUsuarioEstado'] || 'SIN DESCRIPCION.'}
    console.log("HEADER ", headers)
    return this.http
      .post(`${this.url}${this.dir}/${datas.idUsuario}`,value ,{headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }

  setUsuario( datas: any ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }
}