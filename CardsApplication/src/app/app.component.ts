import { Component, OnInit } from '@angular/core';
import { ICard } from './interfaces/ICard';
import { CardService } from './services/card.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CardsApplication';
  randomCards : ICard[] = [];
  sortedCards : ICard[] = [];
  initCardCount = 2;
  selectedCount = 0;
  loading = false;

  constructor(private cardService: CardService) {

  }
  ngOnInit(): void {
    this.getRandomCards();
  }

  get isCardsSorted() {
    return this.sortedCards.length !== 0;
  }
  getImageSource(value: string) {
    return 'assets/'+value+'.png';
  }

  getRandomCards() {
    this.loading = true;
    this.sortedCards = [];
    this.randomCards = this.cardService.getRandomCards(this.selectedCount > 2 ? this.selectedCount: this.initCardCount)
    this.loading = false;
  }

  sortCards() {
    this.loading = true;
    var cardValues = this.randomCards.map(card => {return card.Value})
    this.cardService.sortCards(cardValues).pipe().subscribe((sortedCards: ICard[]) => {
      this.sortedCards = sortedCards;
      this.loading = false;
    });
  }
}
