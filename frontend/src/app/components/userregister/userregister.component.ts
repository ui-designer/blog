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


function ageValidator(min: number, max: number) {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value !== null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { ageValidator: true };
    }
    return null;
  };
}




@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private _registrationService:UserService, private _http:HttpClient) {  }

  ngOnInit() {
    //REACTIVE FORM CODE
    this.registrationForm = new FormGroup({
        'name': new FormControl(null,[Validators.required,Validators.minLength(4)],this.isNameUnique.bind(this)),
        'email': new FormControl(null,[Validators.required, Validators.email],this.isEmailUnique.bind(this)),
        'password': new FormControl(null,Validators.required),
        'cpassword': new FormControl(null,[Validators.required]),
        'phone': new FormControl(null,[Validators.required,Validators.minLength(10),Validators.pattern[0-9]],this.isPhoneUnique.bind(this)),
    });



  }



  res;
  userRegister(){
 //console.log(this.registrationForm);
    if(this.registrationForm.valid){
          this._registrationService.registrationService(this.registrationForm.value).subscribe(res => {
           res = this.res;

           } )
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
        }
        } )
    },1000);
  })
}












}
