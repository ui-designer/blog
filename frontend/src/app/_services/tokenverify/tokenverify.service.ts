import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenverifyService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  req = req.clone({
setHeaders:{
Authorization:`Bearer $(localStorage.getItem('token'))`,
},
  });
    return next.handle(req);
  }
}
