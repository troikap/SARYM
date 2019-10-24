// import {Injectable} from '@angular/core';
// import {  RequestOptions, Response, Headers, RequestMethod   ,HttpClient , HttpHeaders, HttpRequest,} from '@angular/http';
// import {Observable} from 'rxjs/Observable';
// import {Angular2TokenService} from 'angular2-token';
// @Injectable()
// export class FormDataService extends Angular2TokenService {
//     sendMultipart(url: string, data: FormData): Observable<Response> {
//         this.init({
//             apiBase: localStorage.getItem('apiBase'),
//             globalOptions: {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',  // <-- Set mutlipart/form-data only for this request
//                     'Accept': 'multipart/form-data', // <-- Set mutlipart/form-data only for this request
//                     "access_token_name": localStorage.getItem('accessToken'),
//                     "client_name": localStorage.getItem('client'),
//                     "uid_name": localStorage.getItem('uid'),
//                     "expiry_name": localStorage.getItem('expiry'),
//                     "token-type_name": 'Bearer'
//                 }
//             }
//         });
//         let hdrs = this.currentAuthHeaders;
//         hdrs.append('enctype', "multipart/form-data")
//         let requestOptions = new RequestOptions({
//             method: RequestMethod.Post,
//             headers: hdrs,
//             url: url,
//             body: data
//         });
//         return this.request(requestOptions);
//     }
// }