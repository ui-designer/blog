import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/_services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login:LoginService) { }

  ngOnInit() {

    this.login.login().subscribe(login => {this.login = login;
      console.log(this.login)

    })

  }

  savePost(){

  }




}
