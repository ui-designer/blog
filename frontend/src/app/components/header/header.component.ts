import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginStatus:boolean = false;
  userName = null;
  imageName;
  constructor(private _userService:UserService, private router:Router,  private jwtHelp:JwtHelperService) {



    _userService.getLoggedInName.subscribe(name => {
      this.userName = name;
      if(this.jwtHelp.decodeToken() !== null){
        this._userService.profile().subscribe(res=> {
          this.imageName = res.image;
        });
      }
    });
    _userService.getLoggedInStatus.subscribe(loginStatus => {
      this.loginStatus = loginStatus;
    });





   }

   ngOnInit() {

  }

  logout(){
  this._userService.userLogout();
  }

}
