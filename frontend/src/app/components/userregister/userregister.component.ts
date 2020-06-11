import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})
export class UserregisterComponent implements OnInit {

  constructor(private registrationForm:UserService) {  }

  ngOnInit() {
  }


val:boolean = false;
matchFlag;
dataMatch(data:NgForm){
 // console.log(data.name);
 this.val= true;
   this.registrationForm.userData(data).subscribe(response => {
     if(response == true){
       this.matchFlag =  true;
       return this.matchFlag;
     }
  });
}


  res;
  userRegister(registrationForm:NgForm){
    if(registrationForm.valid){
      //console.log(registrationForm.value);
      this.registrationForm.registrationService(registrationForm.value).subscribe(res => {
       res = this.res;
        //console.log(res);
       } )
    }
  }




}
