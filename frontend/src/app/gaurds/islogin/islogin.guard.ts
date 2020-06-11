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
    private _islogin:UserService,
    private router:Router,
    private jwtHelp : JwtHelperService
    ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const tokenExist = localStorage.getItem("token");
      const id = this.jwtHelp.decodeToken(tokenExist)._id;

     if(tokenExist && id){
       return true;
       this.router.navigate(['dashboard']);
     }
     else{
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
