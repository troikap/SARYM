import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../models/modelos';

const dir = '/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;

  constructor( 
    public http: HttpClient
  ) { 
  }

  traerEnviroment() {
    console.log("ENVIROMENT ----------------- ",environment)
    if (environment.urlNgrok != '' && environment.urlNgrok != null){
      return environment.urlNgrok
    } else {
      return environment.url
    }
  }

  async getUsuarios(): Promise<Usuario[]> {
    let headers: HttpHeaders = new HttpHeaders();
    let urlEnviroment = await this.traerEnviroment();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(urlEnviroment + dir, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario[];
      })
      .catch(  );
  }

  async getUsuario( id: number ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let urlEnviroment = await this.traerEnviroment();
    return this.http
      .get(`${urlEnviroment}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  async validarExistenciaUsuario( cuit: number ): Promise<any> {
    let value = { cuitUsuario: cuit};
    let urlEnviroment = await this.traerEnviroment();
    return this.http.post(`${urlEnviroment}/existUser`, value).toPromise()
    .then( (response) => {
      return response;
    })
    .catch( (err) => {
      console.log("ERROR: ",err)
    })
  }

  async loguear( cuit: number, pass: string ): Promise<any> {
    let urlEnviroment = await this.traerEnviroment();
    let value = { cuitUsuario: cuit, contrasenaUsuario: pass}
    return this.http
      .post(`${urlEnviroment}/login`, value)
      .toPromise()
      .then( (response: any) => {
        return response as Usuario;
      })
      .catch( err => {
        console.log("ERROR: ",err)
      } );
  }

  async updateUsuario( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     let urlEnviroment = await this.traerEnviroment();
    return this.http
      .put(`${urlEnviroment}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  async setUsuario( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     let urlEnviroment = await this.traerEnviroment();
     data['idRol'] = 5;
     data['idEstadoUsuario'] = 1;
    return this.http
      .post(`${urlEnviroment}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }

  async recuperarDatosToken( token ): Promise<any> {
    let value = { token }
    let urlEnviroment = await this.traerEnviroment();
    return this.http
      .post(`${urlEnviroment}/recuperarDatosToken`, value)
      .toPromise()
      .then( (response: any) => {
        console.log()
        return response;
      })
      .catch( err => {
        console.log("ERROR: ",err)
      } );
  }

  async envioEmail(data, tipo){
    console.log("DATA ",data)
    let urlEnviroment = await this.traerEnviroment();
    let value = { 
      origen: 'http://localhost:8100', 
      origenWeb: environment.webApp,
      email: data.emailUsuario, 
      nombreUsuario: data.nombreUsuario, 
      apellidoUsuario: data.apellidoUsuario, 
      idUsuario: data.idUsuario, 
      cuitUsuario: data.cuitUsuario,
      tipo: tipo }
    return this.http
      .post(`${urlEnviroment}/envioEmail`, value)
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

  async activarUsuario( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     let urlEnviroment = await this.traerEnviroment();
    return this.http
      .post(`${urlEnviroment}/activarUsuario`, datas)
      .toPromise()
      .then(response => {
        return response as Usuario;
      })
      .catch(  );
  }
  
}