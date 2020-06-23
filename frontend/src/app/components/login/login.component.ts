import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

loginFormGroup: FormGroup;
tokenData;
  constructor(private _login:UserService, private router:Router, private _http:HttpClient, private jwtHelp : JwtHelperService) {
   this._login.isLogin();


   }



  ngOnInit() {
    this.loginFormGroup = new FormGroup({
        'email': new FormControl(null,[Validators.required,Validators.email], this.isEmailUnique.bind(this)),
        'password': new FormControl(null,[Validators.required])
    });
   }

   res;
  userLogin(){
    console.log(this.loginFormGroup);
    if(this.loginFormGroup.valid){
      this._login.login(this.loginFormGroup.value.email,this.loginFormGroup.value.password);

    }
  }



  uniqueEmail;

  isEmailUnique(control:FormControl): Promise<any> | Observable<any> {
    return new Promise<any>( resolve=>{
      setTimeout(()=>{
        //console.log(this.registrationForm);
        this._http.post('http://localhost:4000/api/user/userEmailExist',{email:control.value}).subscribe(uniqueEmail => {
          if(uniqueEmail != true){
            resolve({'emailNotAvailable':true});
          }else{
            resolve(null);
          }
          } )
      },1000);
    })
  }




}
