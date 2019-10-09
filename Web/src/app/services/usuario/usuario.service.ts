import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Usuario } from 'src/app/model/usuario/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   url = 'http://localhost:3000';
   dir = '/usuario';

  constructor(
    public http: HttpClient
  ) { }

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
}
