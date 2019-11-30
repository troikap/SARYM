import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Mesa } from '../../models/modelos';
import { ToastService } from '../../providers/toast.service';

@Injectable({
  providedIn: 'root'
})

export class MesaService {
  url = environment.urlNgrok || environment.url;
  dir = '/mesa';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient,
    private toastService: ToastService
  ) { }

  getMesas(): Promise<Mesa[]> {
    console.log("ENTRANDO A GET MESA")
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        if ( response && response['tipo'] == 1) {
          return response['data'] as Mesa[];
        } else {
          this.toastService.toastWarning('Tuvimos un problema al intentar traer las mesas', 2000)
        }
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

}


