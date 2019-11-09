import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
 
  private _isValidUser:boolean = false;
  constructor() { }

  SetLoginFlag(id:boolean) {
    this._isValidUser = id;
    console.log("service",id);
 }
  IsUserValid():boolean{
    console.log("IsUserValid",this._isValidUser);
    return this._isValidUser;
  }

  canActivate() {
    console.log(this.IsUserValid());
     //return this.IsUserValid();
     return true;
    
  }
 

}
