import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginStatus:boolean = false;
  userName = null;
  constructor(private _userServive:UserService) {

    _userServive.getLoggedInName.subscribe(name => {
      this.userName = name;
      console.log(this.userName);
    });
    _userServive.getLoggedInStatus.subscribe(loginStatus => {
      this.loginStatus = loginStatus;
      console.log(this.loginStatus);
    });

    // const token =localStorage.getItem("token");
    // if(token !== null){
    //   const tokenString =token.split('"')[1];
    //   this._userServive.tokenValidateService(tokenString).subscribe(tokenData => {
    //     if(token && tokenData._id){
    //       this.username = tokenData.name;
    //       this.isLogin= true;
    //       console.log(this.username);
    //       console.log(this.isLogin);
    //     }
    //     else if(token && tokenData.expiredAt){
    //       this.isLogin= false;
    //     }else{
    //       this.isLogin= false;

    //     }
    //   });

    // }else{
    //   this.isLogin= false;
    // }

   }



   ngOnInit() {

  }

logout(){
this._userServive.userLogout();
}





}
