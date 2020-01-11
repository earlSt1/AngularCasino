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
import { PokerComponent } from './poker/poker.component';

const appRoutes: Routes = [
  {
    path: 'casino/blackjack',
    component: BlackjackComponent,
    data: { title: 'AngularCasino - Blackjack' }
  },
  {
    path: 'poker',
    component: PokerComponent,
    data: { title: 'AngularCasino - Poker' }
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
    PokerComponent
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
