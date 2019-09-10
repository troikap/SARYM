import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const URL = environment.url;
const dir = '/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor( 
    public http: HttpClient
  ) { }

   getDepartamentos(): Promise<Departamento[]> {
    return this.http
      .get(URL + dir)
      .toPromise()
      .then(response => {
        return response['Departamento'] as Departamento[];
      })
      .catch(  );
  }
}

export interface Departamento {
  idDepartamento: string;
  nombreDepartamento: string;
}
