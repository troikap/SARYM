import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SectorService {
  url = environment.urlNgrok || environment.url;
  dir = "/sector";

  constructor(public http: HttpClient) {}

  getSector(termino: string) {
    if (termino != "") {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.append("token", "libre");
      return this.http
        .get(`${this.url}${this.dir}/${termino}`, { headers })
        .pipe(
          map((data: any) => {
            if (data != null) {
              return data.data;
            }
          })
        );
    } else {
    }
  }

  getAllSector() {
    return this.http
      .get(`${this.url}${this.dir}`)
      .toPromise()
      .then(response => {
        console.log("UNIDAD MEDIDA ", response)
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }

  updateSector(datas, token): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", token);
    let data = { headers };
    return this.http
      .put(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }

  createSector(datas, token): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("token", token);
    let data = { headers };
    return this.http
      .post(`${this.url}${this.dir}`, datas, data)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log("ERROR : ", err);
      });
  }
}
