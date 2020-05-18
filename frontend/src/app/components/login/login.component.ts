import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _login:UserService, private router:Router) {

    if(localStorage.getItem("token")){
      this.router.navigate(['dashboard']);
    }
    else{
      this.router.navigate(['login']);
    }
   }

  ngOnInit() { }
  data;
  email:String= null;
  password:String= null;
  login(loginForm:NgForm){
    if(loginForm.valid){
      this._login.loginService(loginForm.value.usernameValue,loginForm.value.passwordValue).subscribe(data => {
        this.data = data;
        localStorage.setItem("token",JSON.stringify(this.data.token));
        this.router.navigate(['dashboard']);
      })
    }else{
      this.router.navigate(['login']);
      return false;
    }

  }




}
