import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http:HttpClient ) {}

   userLoginApi = "http://localhost:4000/api/user/login";


  loginService(email,password): Observable<any> {
    return this._http.post<any>(this.userLoginApi, { email:email, password:password} );
  }

}
