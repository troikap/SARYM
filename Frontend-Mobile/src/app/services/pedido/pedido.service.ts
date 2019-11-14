import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Pedido, Estadia } from '../../models/modelos';
import { environment } from '../../../environments/environment';

const URL = environment.urlNgrok || environment.url;
const dir = '/pedido';
const dir2 = '/todo';
const dir3 = '/A Entregar';
const dir4 = '/actualizarDatos';
const dir5 = '/cambiarEstado';
const dir6 = '/editarDetallePedidoProducto';

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
    return this.http
    .get(`${URL}${dir}${dir2}/${idPedido}`, {headers})
    .toPromise()
    .then(response => {
      let data = response['data'][0];
      this.estadias.push(data);
    })
    .catch(  );
  });
  return;
}

updatePedido( datas ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
   headers = headers.append('token', tokenEnviroment);
   let data = {headers}
  return this.http
    .put(`${URL}${dir}${dir4}`, datas, data)
    .toPromise()
    .then(response => {
      return response as Pedido;
    })
    .catch(  );
}

setPedido( datas ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
   headers = headers.append('token', tokenEnviroment);
   let data = {headers}
  return this.http
    .post(`${URL}${dir}`, datas, data)
    .toPromise()
    .then(response => {
      return response as Pedido;
    })
    .catch(  );
}

cambiarEstado( datas: any ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', tokenEnviroment);
  return this.http
    .put(`${URL}${dir}${dir5}`, datas, {headers})
    .toPromise()
    .then(response => {
      console.log("Servicio cambiarEstado()", response);
      return response;
    })
    .catch(  );
}

setDetallePedidoProducto( datas ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
   headers = headers.append('token', tokenEnviroment);
   let data = {headers}
   console.log("Servicio setDetallePedidoProducto: ", datas);
   return this.http
    .put(`${URL}${dir}${dir6}`, datas, data)
    .toPromise()
    .then(response => {
      console.log("Respuesta servicio Editar Producto Pedido: ", response);
      return response;
    })
    .catch(  );
}

}

