
import { CanActivate} from '@angular/router';
import {LoginService } from './../Service/login.service';

export class LoginValidation implements CanActivate {
    constructor(private _loginService: LoginService) {}
    canActivate() {
      return this._loginService.IsUserValid();
    }
  }
  