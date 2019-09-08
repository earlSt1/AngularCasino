import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BlackjackComponent } from './blackjack/blackjack.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'blackjack',
    component: BlackjackComponent,
    data: { title: 'AngularCasino - Blackjack' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {title: 'AngularCasino - Home'}
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
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent,BlackjackComponent,HomeComponent]
})
export class AppModule { }
