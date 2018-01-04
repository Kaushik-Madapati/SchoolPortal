import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 
 
  LoginAdmin(newUser: string, newPasswd:string) {

    //this.router.navigate(['/main']);
       
     if (newUser) {
        // if((newUser == "admin@test.com") && ( newPasswd == "admin"))
           //  this.router.navigate(['/view']);
         //else  
            //  this.router.navigate(['/user']);

        
         console.log(newUser, newPasswd);
     }

}

LoginTeacher(newUser: string, newPasswd:string) {

    //this.router.navigate(['/main']);
       
     if (newUser) {
        // if((newUser == "admin@test.com") && ( newPasswd == "admin"))
           //  this.router.navigate(['/view']);
         //else  
            //  this.router.navigate(['/user']);

        
         console.log(newUser, newPasswd);
     }

} 

}
