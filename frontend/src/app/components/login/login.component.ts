import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {


  constructor(private _login:UserService, private router:Router) {
      if(!!localStorage.getItem("token")){
        this.router.navigate(['dashboard']);
      }
      else{
        this.router.navigate(['login']);
      }
   }

  ngOnInit() { }

  login(loginForm:NgForm){
    if(loginForm.valid){
      this._login.login(loginForm.value.usernameValue,loginForm.value.passwordValue);
    }
  }



}
