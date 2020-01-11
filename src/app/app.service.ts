import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;
  username = null;
  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
        const headers= new HttpHeaders({
            'Content-Type':  'application/json',
        });
        const data = {"username":credentials.username,"password":credentials.password};
        
        this.http.post('https://localhost:8080/authenticate', data , {headers: headers}).subscribe(
            response => {  
                if (response['token']) {
                    localStorage.setItem("token",response['token']);
                    localStorage.setItem("username",response['username']);
                    this.authenticated = true;
                    this.username = response['username']
                } else {
                    this.authenticated = false;
                }
                return callback && callback();
            },
            error => {
                if (error['status']==401){
                    this.authenticated=false;
                    return callback && callback();
                }
            }
        );
    }

}