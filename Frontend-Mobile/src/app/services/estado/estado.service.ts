import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../providers/toast.service';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {
  url = environment.urlNgrok || environment.url;

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient,
    private toastService: ToastService
  ) { }

  getEstados( nombre ): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}/${nombre}`, {headers})
      .toPromise()
      .then(response => {
        if ( response && response['tipo'] == 1) {
          return response['data'];
        } else {
          this.toastService.toastWarning('Tuvimos un problema al intentar traer las estados', 2000)
        }
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

}


