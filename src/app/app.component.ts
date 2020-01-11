import { Component } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular App';
  testData = "Test data";
  
  constructor(private app: AppService, private http: HttpClient, private router: Router) {
    //this.app.authenticate(undefined, undefined);
    if (localStorage['token']!=null){
      this.app.authenticated=true;
      this.app.username=localStorage.getItem('username');
    }
  }
  authenticated(){
    return this.app.authenticated;
  }
  logout() {
    //this.http.post('logout', {}).pipe(finalize(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.app.authenticated = false;
      this.router.navigateByUrl('/login');
    //})).subscribe();
  }
  hello(){
    this.http.get("https://localhost:8080/hello",{}).subscribe(response => {
      this.testData = response['response'];
    });
  }
}
