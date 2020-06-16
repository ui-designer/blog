import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { parse } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http:HttpClient, private router:Router ) {

  }

   BASE_URL = "http://localhost:4000/api/user";


  loginService(email,password): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL}/login`, { email:email, password:password} );
  }

  registrationService(registrationData): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL}/register`, registrationData );
  }


  data:any=null;
  async login(username,password){
      this.loginService(username,password).subscribe(data => {
        this.data = data;
        localStorage.setItem("token",JSON.stringify(this.data.token));
        const token = localStorage.getItem("token");
        if(token){
          this.router.navigate[('dashboard')];
        } else{
          this.router.navigate(['login']);
        }
    })
  }



}
