import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../model/usuario/usuario.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  url = environment.urlNgrok || environment.url;
  dir = "/usuario";
  dir2 = "/cuitUsuario";
  dir3 = "/todo";
  dirToken = "/verificarTokenRol";

  dirExistUsr = "/existUser";
  dirEnvioMail = "/envioEmail";
  dirRecuperarToken = "/recuperarDatosToken";

  tokenEstaLogueado: string;

  tokenEnviroment = environment.token;

  constructor(public http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  estaLogueado(): Promise<any> {
    let token = localStorage.getItem("token");
    let value = { token };
    return this.http
      .post(`${this.url}${this.dirToken}`, value)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }

  getRolUsuarioLoggeado() {
    let rolUsuario = localStorage.getItem("rolUsuario");
    return rolUsuario;
  }

  validarExistenciaUsuario( cuit: number ): Promise<any> {
    let value = {cuitUsuario: cuit};
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dirExistUsr}`, value)
      .toPromise()
      .then(response => {
        console.log("validarExistenciaUsuario: ", response);
        return response;
      })
      .catch( (err) => {
        console.log("ERROR: ",err)
      })
  }

  envioEmail(data){
    let value = { origen: 'http://localhost:4200', email: data.data.emailUsuario, nombreUsuario: data.data.nombreUsuario, apellidoUsuario: data.data.apellidoUsuario, idUsuario: data.data.idUsuario, cuitUsuario: data.data.cuitUsuario }
    return this.http
      .post(`${this.url}${this.dirEnvioMail}`, value)
      .toPromise()
      .then( (response: any) => {
        if (response == null ){
          response = {};
        }
        console.log("response ", response)
        response['tipo'] = 1;
        return response;
      })
      .catch( err => {
        err['tipo'] = 2;
        console.log("ERROR: ",err)
      } );
  }

  recuperarDatosToken( token ): Promise<any> {
    let value = { token }
    return this.http
      .post(`${this.url}${this.dirRecuperarToken}`, value)
      .toPromise()
      .then( (response: any) => {
        console.log()
        return response;
      })
      .catch( err => {
        console.log("ERROR: ",err)
      } );
  }

  loguear(cuit: number, pass: string): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass };
    return this.http
      .post(`${this.url}/login`, value)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch( err => {
        return err;
      });
  }

  getUsuarioCuit(cuit: number): Promise<Usuario> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}${this.dir2}/${cuit}`, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }

  getUsuarioByAll(termino: string) {
    //Observador
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("token", this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dir3}/${termino}`, { headers })
        .pipe(
          map((data: any) => {
            if (data != null) {
              return data.data;
            }
          })
        );
    } else {
    }
  }

  getUsuarios(): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(this.url + this.dir, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch();
  }

  getUsuario(id: number): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}/${id}`, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }

  updateUsuario(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .put(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }

  deleteUsuario(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    let value = {
      descripcionUsuarioEstado:
        datas["descripcionUsuarioEstado"] || "SIN DESCRIPCION."
    };
    return this.http
      .post(`${this.url}${this.dir}/${datas.idUsuario}`, value, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }

  setUsuario(datas: any): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", this.tokenEnviroment);
    return this.http
      .post(`${this.url}${this.dir}`, datas, { headers })
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch();
  }
}