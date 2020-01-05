import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials, callback) {
        const headers= new HttpHeaders({
        'Content-Type':  'application/json',
        });
        const data = {"username":credentials.username,"password":credentials.password};
        this.http.post('http://localhost:8080/authenticate', data , {headers: headers}).subscribe(response => {
            if (response['token']) {
                localStorage.setItem("token",response['token']);
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }

}