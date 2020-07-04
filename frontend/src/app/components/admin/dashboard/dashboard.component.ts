import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _userService :UserService) {
    this._userService.isGaurdDashboard();
   }

  ngOnInit() {
  }

}
