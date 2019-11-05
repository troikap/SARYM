import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reserva } from '../../models/modelos';

const URL = environment.urlNgrok || environment.url;
const dir = '/reserva';
const dir2 = '/editarComensal';
const dir3 = '/editarMesa';
const dir4 = '/actualizarDatos';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor( 
    public http: HttpClient
  ) { }

   getReservas( token: string ): Promise<Reserva[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', token);
    return this.http
      .get( URL + dir, {headers})
      .toPromise()
      .then(response => {
        return response['data'] as Reserva[];
      })
      .catch(  );
  }

  updateReserva( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .put(`${URL}${dir}${dir4}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setReserva( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .post(`${URL}${dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setComensalesReserva( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .put(`${URL}${dir}${dir2}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }

  setMesasReserva( datas, token ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', token);
     let data = {headers}
    return this.http
      .put(`${URL}${dir}${dir3}`, datas, data)
      .toPromise()
      .then(response => {
        return response as Reserva;
      })
      .catch(  );
  }
}

