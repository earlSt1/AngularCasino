import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlackjackComponent } from './blackjack/blackjack.component';

@NgModule({
  declarations: [
    AppComponent,
    BlackjackComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent,BlackjackComponent]
})
export class AppModule { }
