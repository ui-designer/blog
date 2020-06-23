import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/_services/user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class IsloginGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router:Router,
    private jwtHelp : JwtHelperService,
    private _userService : UserService
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const tokenExist = localStorage.getItem("token");
     // const id = this.jwtHelp.decodeToken(tokenExist)._id;
     if(tokenExist){
      this._userService.isGaurdDashboard();
       return true;
     }
     else{
      // console.log('else');
       this.router.navigate(['login']);
       return false;
     }

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
