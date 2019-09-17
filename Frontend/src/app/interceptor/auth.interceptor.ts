import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestIntercepted = request.clone({
            headers: request.headers
        });
        if (request.url.includes('api/user/loginData') || request.url.includes('webservices/register_member')) {
            return next.handle(requestIntercepted);
        }
        // const token = this.authenticationService.token;
        // if (token) {
        //     const authReq = request.clone({
        //         headers: request.headers
        //         .set('Authorization', `Bearer ${token}`)
        //     });
        //     // Pass on the cloned request instead of the original request.
        //     return next.handle(authReq);
        // }

        return next.handle(requestIntercepted);
    }

}