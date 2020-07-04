import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenverifyService implements HttpInterceptor {
  tokenString;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =localStorage.getItem("token");

    if(token !== null){
      this.tokenString = token.split('"')[1];
    }
    if(token){
  req = req.clone({
setHeaders:{
token:this.tokenString,
},
  });
}
    return next.handle(req);
  }
}
