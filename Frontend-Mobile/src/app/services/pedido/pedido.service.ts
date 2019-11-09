import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Pedido, Estadia } from '../../models/modelos';
import { environment } from '../../../environments/environment';
import { Z_UNKNOWN } from 'zlib';

const URL = environment.urlNgrok || environment.url;
const dir = '/pedido';
const dir2 = '/todo';
const dir3 = '/A Entregar';
const tokenEnviroment = environment.token;


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedido: Pedido;
  estadias: Estadia[] = [];


  constructor(
    public http: HttpClient
  ) { }

getPedidosAEnviar(): Promise<Pedido[]> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', tokenEnviroment);
 return this.http
   .get(`${URL}${dir}${dir2}${dir3}`, {headers})
   .toPromise()
   .then(response => {
     return response as Pedido[];
   })
   .catch(  );
}

getEstadiaPedidosAEnviar(pedidos): Promise<Estadia[]> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', tokenEnviroment);
  pedidos.forEach(element => {
    let idPedido = element.idPedido;
    console.log("el ID DEL PEDIDOS ES: ", idPedido);
    return this.http
    .get(`${URL}${dir}${dir2}/${idPedido}`, {headers})
    .toPromise()
    .then(response => {
      console.log("AAAAAAAAAAAAAAAAAA", response['data'])
      let data = response['data'][0];
      this.estadias.push(data);
    })
    .catch(  );
  });
  return;
  //return this.estadias as Promise<Estadia[]>;
}
}

