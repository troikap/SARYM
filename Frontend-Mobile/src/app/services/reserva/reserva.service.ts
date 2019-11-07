import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reserva } from '../../models/modelos';
<<<<<<< HEAD
import { map } from 'rxjs/operators';
=======
import { StorageService } from '../../services/storage/storage.service';


const URL = environment.urlNgrok || environment.url;
const dir = '/reserva';
const dir2 = '/editarComensal';
const dir3 = '/editarMesa';
const dir4 = '/actualizarDatos';
>>>>>>> Lucas


@Injectable({
  providedIn: 'root'
})
export class ReservaService {
<<<<<<< HEAD
  
  url = environment.urlNgrok || environment.url;

  tokenEnviroment = environment.token;

  dir = '/reserva';
  dir2 = '/editarComensal';
  dir3 = '/editarMesa';
  dir4 = '/actualizarDatos';
  dirTodo = "/todo";

=======
  token;
>>>>>>> Lucas
  constructor( 
    public http: HttpClient,
    private storage: StorageService,
  ) { }

<<<<<<< HEAD
  getProductosByAll( termino: string) { //Observador
    console.log("Service getProductosByAll: Termino = ", termino);
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append('token', this.tokenEnviroment);
      return this.http
        .get(`${this.url}${this.dir}${this.dirTodo}/${termino}`, {headers})
        .pipe( map ((data: any) => {
          console.log(data.data);
          if (data != null) {
            return data.data;
          }
      }));
    }
    else {
      // console.log("Service getProductosByAll: SIN TERMINO");
    }
  }

   getReservas(): Promise<Reserva[]> {
=======
  loadToken() {
    this.storage.getOneObject('token').then((data) => {
      this.token = data;
    })
  }

   getReservas( token: string ): Promise<Reserva[]> {
>>>>>>> Lucas
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        console.log("Service getReservas: ", response);
        return response['data'] as Reserva[];
      })
      .catch(  );
  }

<<<<<<< HEAD
  updateReserva( datas): Promise<any> {
=======
  getReserva( id: number ): Promise<Reserva> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', this.token);
    return this.http
      .get(`${URL}${dir}/${id}`, {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Reserva;
      })
      .catch(  );
  }

  updateReserva( datas, token ): Promise<any> {
>>>>>>> Lucas
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir4}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setReserva( datas): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setComensalesReserva( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
    return this.http
      .put(`${this.url}${this.dir}${this.dir2}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setMesasReserva( datas ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
     let data = {headers}
     return this.http
      .put(`${this.url}${this.dir}${this.dir3}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }
}

