import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Reserva } from '../../models/modelos';

const URL = environment.urlNgrok || environment.url;
const dir = '/reserva';

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
}

