import { Component, OnInit } from '@angular/core';
import { Deck,Card } from '../deck';
//import { Card } from '../card';
@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})
export class BlackjackComponent implements OnInit {
  deck:Deck = new Deck();
  currentCard:Card = null;
  temp = new Array(this.deck.size);
  msg = "Draw a card!";
  constructor() {
   
  }
  drawCard(){
    let temp = this.deck.draw;
    if (temp == null){
      this.msg = "No cards left!";
    }else{
      this.msg = "";
    }
    this.currentCard = this.deck.draw;
  }
  ngOnInit() {
  }

}
