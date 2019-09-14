import { Component, OnInit } from '@angular/core';
import { Deck, Card } from '../deck';
@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent implements OnInit {
  deck:Deck = new Deck();
  constructor() { }

  ngOnInit() {
  }

}
