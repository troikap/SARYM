import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Pedido, Estadia } from '../../models/modelos';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../providers/toast.service'

const dir = '/pedido';
const dir2 = '/todo';
const dir3 = '/A Entregar';
const dir4 = '/actualizarDatos';
const dir5 = '/cambiarEstado';
const dir6 = '/editarDetallePedidoProducto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url = environment.urlNgrok || environment.url;
  tokenEnviroment = environment.token;
  pedido: Pedido;
  estadias: Estadia[] = [];
  mostroMensaje;

  constructor(
    public http: HttpClient,
    private toastService: ToastService,
  ) { }

getPedidosAEnviar(): Promise<Pedido[]> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', this.tokenEnviroment);
  return this.http
   .get(`${this.url}${dir}${dir2}${dir3}`, {headers})
   .toPromise()
   .then( response => {
    if ( response ) {
      if ( response['tipo'] == 1) {
        this.mostroMensaje = false;
        return response['data'] as Pedido[];
      } else {
        if ( !this.mostroMensaje ) {
          this.mostroMensaje = true;
          this.toastService.toastWarning('No se encontraron Pedidos a Entregar.', 2000)
        }
      }
    } else {
      if ( !this.mostroMensaje ) {
        this.mostroMensaje = true;
        this.toastService.toastError('No se pudo realizar la busqueda de Estadía.', 2000)
      }
    }
  }).catch();
}

getEstadiaPedidosAEnviar(pedidos): Promise<Estadia[]> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', this.tokenEnviroment);
  pedidos.forEach(element => {
    let idPedido = element.idPedido;
    return this.http
    .get(`${this.url}${dir}${dir2}/${idPedido}`, {headers})
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
   headers = headers.append('token', this.tokenEnviroment);
   let data = {headers}
  return this.http
    .put(`${this.url}${dir}${dir4}`, datas, data)
    .toPromise()
    .then(response => {
      return response as Pedido;
    })
    .catch(  );
}

setPedido( datas ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
   headers = headers.append('token', this.tokenEnviroment);
   let data = {headers}
  return this.http
    .post(`${this.url}${dir}`, datas, data)
    .toPromise()
    .then(response => {
      return response as Pedido;
    })
    .catch(  );
}

cambiarEstado( datas: any ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('token', this.tokenEnviroment);
  return this.http
    .put(`${this.url}${dir}${dir5}`, datas, {headers})
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(  );
}

setDetallePedidoProducto( datas ): Promise<any> {
  let headers: HttpHeaders = new HttpHeaders();
   headers = headers.append('token', this.tokenEnviroment);
   let data = {headers}
   console.log("Servicio setDetallePedidoProducto: ", datas);
   return this.http
    .put(`${this.url}${dir}${dir6}`, datas, data)
    .toPromise()
    .then(response => {
      console.log("Respuesta servicio Editar Producto Pedido: ", response);
      return response;
    })
    .catch(  );
}

}

