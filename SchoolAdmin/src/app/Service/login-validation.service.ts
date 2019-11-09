import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router'
import {LoginService} from './../Service/login.service'

@Injectable({
  providedIn: 'root'
})
export class LoginValidationService implements CanActivate  {

  constructor(private _loginService : LoginService ) { }

  canActivate() {
    console.log(this._loginService.IsUserValid());
     return this._loginService.IsUserValid();
     //return true;
    
  }
}
