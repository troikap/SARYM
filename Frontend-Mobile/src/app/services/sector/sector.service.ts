import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Sector } from '../../models/modelos';
import { ToastService } from '../../providers/toast.service';

@Injectable({
  providedIn: 'root'
})

export class SectorService {
  url = environment.urlNgrok || environment.url;
  dir = '/sector';

  tokenEnviroment = environment.token;

  constructor(
    public http: HttpClient,
    private toastService: ToastService
    ) { }

  getSectores(): Promise<Sector[]> {
    let headers: HttpHeaders = new HttpHeaders();
     headers = headers.append('token', this.tokenEnviroment);
    return this.http
      .get(`${this.url}${this.dir}`, {headers})
      .toPromise()
      .then(response => {
        if ( response && response['tipo'] == 1) {
          return response['data'] as Sector[];
        } else {
          this.toastService.toastWarning('Tuvimos un problema al intentar traer los sectores', 2000)
        }
      })
      .catch( err => {
        console.log("ERRROR ", err)
        return err
      });
  }

}


