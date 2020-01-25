import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.inteceptor';
import { PostListComponent } from './post-list/post-list.component';
import { PostViewComponent } from './post-view/post-view.component';

const appRoutes: Routes = [
  {
    path: 'casino/blackjack',
    component: BlackjackComponent,
    data: { title: 'AngularCasino - Blackjack' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'AngularCasino - Home'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'AngularCasino - Login'}
  },{
    path: 'post',
    component: PostListComponent,
    data: {title: 'AngularCasino - Blog'}
  },{
    path: 'post/:id',
    component: PostViewComponent,
    data: {title: 'AngularCasino - Blog'}
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

@NgModule({
  
  declarations: [
    AppComponent,
    BlackjackComponent,
    HomeComponent,
    LoginComponent,
    PostListComponent,
    PostViewComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AppService,
   
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent] //,BlackjackComponent,HomeComponent,LoginComponent]
})
export class AppModule { }
