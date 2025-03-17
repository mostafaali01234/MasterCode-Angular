import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private authSubject: BehaviorSubject<boolean>;
  constructor() {
    this.authSubject = new BehaviorSubject<boolean>(false);
  }

  getAuthSubject():BehaviorSubject<boolean>{
    return this.authSubject;
  }

  getToken(): string{
    return this.isUserLoggedIn() ? localStorage.getItem('token') || "" : "";
  }

  login(){
    localStorage.setItem('token', 'b2f4f2f293fh293f');
    this.authSubject.next(true);
  }
  
  logout(){
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
  
  isUserLoggedIn():boolean{
    return localStorage.getItem('token')?true:false;
  }
}
