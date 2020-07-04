import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  Validator,
  AbstractControl,
  FormControl,
} from "@angular/forms";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


function passwordMatch(password:string, cpassword:string) {
  return (control: AbstractControl): { [key: string]: boolean } | null => {

    //console.log(control);
    if (control.get(password).value != control.get(cpassword).value) {
      //return { passwordNotMatch: true };
      control.get(cpassword).setErrors({ passwordNotMatch: true });
    }

      return null;

  };
}


function phoneMinLength(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (control.value < 1000000000 || control.value > 10000000000) ) {
      return { 'phoneMinLength': true };
  }
  return null;
}




@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private _registrationService:UserService, private _http:HttpClient, private route:Router) {  }

  ngOnInit() {
    //REACTIVE FORM CODE
    this.registrationForm = new FormGroup({
        'name': new FormControl(null,[Validators.required,Validators.minLength(4)],this.isNameUnique.bind(this)),
        'email': new FormControl(null,[Validators.required, Validators.email],this.isEmailUnique.bind(this)),
        'phone': new FormControl(null,[Validators.required, phoneMinLength],this.isPhoneUnique.bind(this)),
        'gender': new FormControl('Male'),
        'password': new FormControl(null,[Validators.required]),
        'cpassword': new FormControl(null,[Validators.required]),
        'image': new FormControl(" ")
    },  passwordMatch('password', 'cpassword'));



  }



  res;
  userRegister(){
    //console.log(this.registrationForm.value);
    if(this.registrationForm.valid){
      this._registrationService.registrationService(this.registrationForm.value).subscribe(res => {
          //console.log(res);
           res = this.res;
          } )
          this.registrationForm.reset();
          this.route.navigate(['login']);
        }
  }

uniqueName;

isNameUnique(control:FormControl): Promise<any> | Observable<any> {
  return new Promise<any>( resolve=>{
    setTimeout(()=>{
      //console.log(this.registrationForm);
      this._http.post('http://localhost:4000/api/user/userNameExist',{name:control.value}).subscribe(uniqueName => {
        if(uniqueName == true){
          resolve({'nameIsNotAllowed':true});
        }else{
          resolve(null);
        }
        } )
    },1000);
  })
}



uniqueEmail;

isEmailUnique(control:FormControl): Promise<any> | Observable<any> {
  return new Promise<any>( resolve=>{
    setTimeout(()=>{
      //console.log(this.registrationForm);
      this._http.post('http://localhost:4000/api/user/userEmailExist',{email:control.value}).subscribe(uniqueEmail => {
        if(uniqueEmail == true){
          resolve({'emailIsNotAllowed':true});
        }else{
          resolve(null);
        }
        } )
    },1000);
  })
}



uniquePhone;

isPhoneUnique(control:FormControl): Promise<any> | Observable<any> {
  return new Promise<any>( resolve=>{
    setTimeout(()=>{
      //console.log(this.registrationForm);
      this._http.post('http://localhost:4000/api/user/userPhoneExist',{phone:control.value}).subscribe(uniquePhone => {
        if(uniquePhone == true){
          resolve({'phoneIsNotAllowed':true});
        }else{
          resolve(null);
        }
        } )
    },1000);
  })
}












}
