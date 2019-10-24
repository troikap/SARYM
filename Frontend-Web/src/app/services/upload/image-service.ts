// import {Injectable} from '@angular/core';
// import {HttpClient, HttpHeaders , RequestOptionsArgs, RequestOptions, Response } from '@angular/common/http';
// import {Observable} from 'rxjs/Observable';
// import { FormDataService } from "ecommerce-commons";
// export interface Header {
//   header: string;
//   value: string;
// }
// @Injectable()
// export class ImageService {
//   constructor(private http: HttpClient, private formDataService: FormDataService) {
//   }
//   public postImage(url: string, image: File, headers?: HttpHeaders[], partName: string = 'image[attachment]', withCredentials?: boolean) {
//     if (!url || url === '') {
//       throw new Error('Url is not set! Please set it before doing queries');
//     }
//     let options: RequestOptionsArgs = new RequestOptions();
//     if (withCredentials) {
//       options.withCredentials = withCredentials;
//     }
//     if (headers) {
//       options.headers = new HttpHeaders();
//       for (let header of headers)
//         options.headers.append(header.header, header.value);
//     }
//     let formData: FormData = new FormData();
//     formData.append(partName, image);
//     return this.formDataService.sendMultipart(url, formData);
//   }
// }