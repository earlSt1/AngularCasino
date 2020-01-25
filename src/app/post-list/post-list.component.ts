import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postList = null;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
    });
  
    this.http.get("https://localhost:8080/post/getAll",{headers: headers}).subscribe(
      response => {
        this.postList = response;
      }
    );
  }

}
