import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  constructor(
    private http: HttpClient
    ) { }

    getUsers(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get('localhost:3000/usuario')
        .subscribe((res) => {
          if ( res !== null) {
            console.log(res)
          } else {
            console.log('RECHAZADO');
            reject();
          }
        });
      });
    }
}
