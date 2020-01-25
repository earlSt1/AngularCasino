import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  post = null;
  comments = null;
  constructor(private http: HttpClient,private route: ActivatedRoute) { 
  }

  ngOnInit() {
    const headers= new HttpHeaders({
      'Content-Type':  'application/json',
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.http.get("https://localhost:8080/post/"+id,{headers: headers}).subscribe(
      response => {
        this.post = response;
      }
    );
    this.http.get("https://localhost:8080/post/"+id+"/comments",{headers: headers}).subscribe(
      response => {
        this.comments = response;
      }
    );
  }

}
