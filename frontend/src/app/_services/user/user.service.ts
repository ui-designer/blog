import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private _http:HttpClient, private router:Router ) {

  }

   BASE_URL = "http://localhost:4000/api/user/login";


  loginService(email,password): Observable<any> {
    return this._http.post<any>(this.BASE_URL, { email:email, password:password} );
  }



  data:any=null;
  async login(username,password){
      this.loginService(username,password).subscribe(data => {
        this.data = data;
        localStorage.setItem("token",JSON.stringify(this.data.token));
        const token = localStorage.getItem("token");
        if(token){
          this.router.navigate(['dashboard']);
        } else{
          this.router.navigate(['login']);
        }
    })
  }


  get isLoginIn():boolean{
    const  user  =  JSON.parse(localStorage.getItem('refreshTok'));
    return  user  !==  null;
  }




}
