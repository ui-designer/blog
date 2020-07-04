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

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  images;

  selectImage(event){
    if(event.target.files.length>0){
      const file = event.target.files[0];
      this.images = file;
    }
  }

  editProfileForm: FormGroup;
name;
email;
phone;
gender;
imageName;


  constructor(private _userService:UserService, private _http:HttpClient, private route:Router) {
    this._userService.isGaurdDashboard();
    this._userService.profile().subscribe(res=> {
      this.name = res.name;
      this.email = res.email;
      this.phone = res.phone;
      this.gender = res.gender;
      this.imageName = res.image
      this.editProfileForm = new FormGroup({
        'name': new FormControl(this.name,[Validators.required,Validators.minLength(4)],this.isNameUnique.bind(this)),
        'email': new FormControl(this.email,[Validators.required, Validators.email],this.isEmailUnique.bind(this)),
        'phone': new FormControl(this.phone,[Validators.required],this.isPhoneUnique.bind(this)),
        'gender': new FormControl(this.gender),
        'image': new FormControl(null)
    });
    });
  }

  ngOnInit() {
    //REACTIVE FORM CODE




  }



  res;
  editProfile(){
    const formData = new FormData();
    formData.append('image',this.images)
    if(this.editProfileForm.valid){
        this._userService.editProfile({name:this.editProfileForm.controls.name.value, email:this.editProfileForm.controls.email.value, phone:this.editProfileForm.controls.phone.value, gender:this.editProfileForm.controls.gender.value}).subscribe(res => {
            res = this.res;
         } )

         this._userService.imageUpload(formData).subscribe(res => {
            res = this.res;
          } )
        }


  }

uniqueName;

isNameUnique(control:FormControl): Promise<any> | Observable<any> {
  return new Promise<any>( resolve=>{
    setTimeout(()=>{
      //console.log(this.editProfileForm);
      this._userService.profileNameVerify({name:control.value}).subscribe(uniqueName => {
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
      //console.log(this.editProfileForm);
      this._userService.profileEmailVerify({email:control.value}).subscribe(uniqueEmail => {
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
      //console.log(this.editProfileForm);
      this._userService.profilePhoneVerify({phone:control.value}).subscribe(uniquePhone => {
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
