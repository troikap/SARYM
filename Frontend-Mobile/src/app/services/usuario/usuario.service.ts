import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/modelos';

const URL = environment.urlNgrok || environment.url;
const dir = '/usuario';
const tokenEnviroment = environment.token;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( 
    public http: HttpClient
  ) { }

  getUsuarios(): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', tokenEnviroment);
    return this.http
      .get(URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch(  );
  }

  getUsuario( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', tokenEnviroment);
    return this.http
      .get(`${URL}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  validarExistenciaUsuario( cuit: number ): Promise<any> {
    let value = { cuitUsuario: cuit};
    return this.http.post(`${URL}/existUser`, value).toPromise()
    .then( (response) => {
      return response;
    })
    .catch( (err) => {
      console.log("ERROR: ",err)
    })
  }

  loguear( cuit: number, pass: string ): Promise<any> {
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    return this.http
      .post(`${URL}/login`, value)
      .toPromise()
      .then( (response: any) => {
        return response as Usuario;
      })
      .catch( err => {
        console.log("ERROR: ",err)
      } );
  }

  updateUsuario( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${URL}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  setUsuario( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', tokenEnviroment);
     let data = {headers}
     data['idRol'] = 5;
     data['idEstadoUsuario'] = 1;
    return this.http
      .post(`${URL}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  recuperarDatosToken( token ): Promise<any> {
    let value = { token }
    return this.http
      .post(`${URL}/recuperarDatosToken`, value)
      .toPromise()
      .then( (response: any) => {
        console.log()
        return response;
      })
      .catch( err => {
        console.log("ERROR: ",err)
      } );
  }

  envioEmail(data){
    let value = { origen: 'http://localhost:8100', email: data.data.emailUsuario, nombreUsuario: data.data.nombreUsuario, apellidoUsuario: data.data.apellidoUsuario, idUsuario: data.data.idUsuario, cuitUsuario: data.data.cuitUsuario }
    return this.http
      .post(`${URL}/envioEmail`, value)
      .toPromise()
      .then( (response: any) => {
        if (response == null ){
          response = {};
        }
        console.log("resPONSE ", response)
        response['tipo'] = 1;
        return response;
      })
      .catch( err => {
        err['tipo'] = 2;
        console.log("ERROR: ",err)
      } );
  }
  
}