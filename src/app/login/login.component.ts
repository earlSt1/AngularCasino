import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  error = false;
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials, 
      () => {
        if (this.app.authenticated){
          console.log("auth");
          this.error=false;
          this.router.navigateByUrl('/')
        }else{
          console.log("No auth");
          this.error=true;
        }
      }
    );
    
  }

}