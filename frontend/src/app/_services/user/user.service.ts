import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() getLoggedInName = new EventEmitter();
  @Output() getLoggedInStatus = new EventEmitter();

  constructor( private _http:HttpClient, private router:Router, private jwtHelp:JwtHelperService ) {

  }

   BASE_URL = "http://localhost:4000/api/user";


  loginService(email,password): Observable<any> {
    return this._http.post<any>(`${this.BASE_URL}/login`, { email:email, password:password} );
  }

  registrationService(registrationData): Observable<any> {
    //console.log(registrationData);
    return this._http.post<any>(`${this.BASE_URL}/register`, registrationData );
  }

  tokenValidateService(token): Observable<any> {
    //console.log({token:token});
    return this._http.post<any>(`${this.BASE_URL}/tokenValidate`, {token:token} );
  }


  profile(): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.get(`${this.BASE_URL}/profile/${userId}`);
  }


  profileNameVerify(data): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.post(`${this.BASE_URL}/updateNameVerify/${userId}`, data);
  }

  profileEmailVerify(data): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.post(`${this.BASE_URL}/updateEmailVerify/${userId}`, data);
  }


  profilePhoneVerify(data): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.post(`${this.BASE_URL}/updatePhoneVerify/${userId}`, data);
  }

  imageUpload(data): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.patch(`${this.BASE_URL}/upload/${userId}`, data);
  }

  editProfile(data): Observable<any> {
    const userId = this.jwtHelp.decodeToken()._id;
    return this._http.patch(`${this.BASE_URL}/editProfile/${userId}`, data);
  }


  data:any=null;
  async login(username,password){
      this.loginService(username,password).subscribe(data => {
        this.data = data;
        localStorage.setItem("token",JSON.stringify(this.data.token));
        const token = localStorage.getItem("token");
        if(token){
          this.router.navigate(['dashboard']);
        } else{
          this.router.navigate(['login']);
        }
    })
  }

islogin:boolean;
  async isLogin(){
    const token =localStorage.getItem("token");
    if(token !== null){

      const tokenString =token.split('"')[1];
    this.tokenValidateService(tokenString).subscribe(tokenData => {
      //console.log(tokenData.expiredAt);
      if(token && tokenData._id){
        this.router.navigate(['dashboard']);
        this.getLoggedInName.emit(tokenData.name);
        this.getLoggedInStatus.emit(true);
        return true;
      }
      else if(token && tokenData.expiredAt){
        this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
      }else{
        this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
      }
    });

  }else{
    this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
  }

  }

  async isGaurdDashboard(){
    const token =localStorage.getItem("token");
    // console.log(token);
    // console.log(typeof(token));
    if(token !== null){

      const tokenString =token.split('"')[1];
    this.tokenValidateService(tokenString).subscribe(tokenData => {
      //console.log(tokenData.expiredAt);
      if(token && tokenData._id){
        //this.router.navigate(['dashboard']);
        this.getLoggedInName.emit(tokenData.name);
        this.getLoggedInStatus.emit(true);
        return true;
      }
      else if(token && tokenData.expiredAt){
        this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
      }else{
        this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
      }
    });

  }else{
    this.router.navigate(['login']);
        this.getLoggedInStatus.emit(false);
        return false;
  }
  }

  async userLogout(){
    localStorage.removeItem("token");
    this.router.navigate(['login']);
    this.getLoggedInStatus.emit(false);
        return false;
  }




}
