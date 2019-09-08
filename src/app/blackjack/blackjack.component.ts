import { Component, OnInit } from '@angular/core';
import { Deck,Card } from '../deck';
import { BlackjackAI} from './blackjack_ai';
import { async } from '@angular/core/testing';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-blackjack',
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css']
})

export class BlackjackComponent implements OnInit {
  deck:Deck = new Deck();
  currentCard:Card = null;
  temp = new Array(this.deck.size);
  msg = "Welcome to Blackjack. Hit to start";
  score = 0;
  score2 = 0;
  bust = false;
  reset = false;
  disableGame = false;
  bestScore = 0;
  playerCards:Card[] = [];
  aiCards:Card[] = [];
  nextMove = "";
  private ai:BlackjackAI;
  constructor() {
  }
  doReset(){
    this.reset=this.deck.reset;
    this.currentCard = null;
    this.bust=false;
    this.score = 0;
    this.score2 = 0;
    this.bestScore = 0;
    this.playerCards = [];
    this.ai = null;
    this.aiCards = [];
    this.msg = "Reshuffled and reset!";
    this.disableGame=false;
  }
  canDrawMore(){
    return (!this.currentCard 
            && (!this.reset || this.checkBust()));
  }
  checkBust(){
    if ((this.score > 21 && this.score == this.score2)
        || this.score > 21 && this.score != this.score2 && this.score2 > 21){
          this.bust = true;
          this.msg = "You have bust. Dealer wins!";
    }else{
      if (this.score2 > 21){
        this.bestScore = this.score;
      }else {
        this.bestScore = this.score2;
      }
    }
  }
  hit(){
    let temp = this.deck.draw;
    if (temp != null){
      if (temp.value > 10){
        //All face cards are worth 10
        this.score += 10;
        this.score2 += 10;
      }else if (temp.value == 1){
        //If Ace, then it's worth 1 or 11
        this.score += 1;
        this.score2 += 11;
      }else{
        this.score += temp.value;
        this.score2 += temp.value;
      }
    }
    this.msg = "You drew: "+temp.toString();
    this.playerCards.push(temp);
    this.checkBust();
    return temp;
  }
  stand(){
    this.msg = "You have chosen to stand. Dealer is now playing ...";
    this.ai = new BlackjackAI(this.bestScore);
    this.runAI();
  }
  
  private runAI(){
   
    (async () => {
      this.nextMove = "Hit";
      while (this.nextMove == "Hit"){
        let temp = this.deck.draw;
        this.aiCards.push(temp);
        this.ai.updateScore(temp.value);
        await delay(1000);
        this.nextMove = this.ai.getNextMove();

      }
      if (this.nextMove == "Bust"){
        this.msg = "Game over. You win!";
      }else{
        if (this.ai.best > this.bestScore){
          this.msg = "Game over. Dealer wins!";
        }else if (this.ai.best == this.bestScore){
          this.msg = "Game over. It's a draw!";
        }else{
          this.msg = "Game over. You win!";
        }
      }
      this.disableGame = true;
    })();
      
    
  }
  ngOnInit() {
  }

}
function delay(ms:number){
  return new Promise(resolve => setTimeout(resolve,ms));
}