import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private _http:HttpClient ) {}

   userLoginApi = "http://localhost:4000/api/user/login";


  login(): Observable<any> {
    return this._http.post<any>(this.userLoginApi, { title: 'User Login' });
  }




}
