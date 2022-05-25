import { Injectable } from '@angular/core';
import { ICard } from '../interfaces/ICard';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  // allCards: string[] = [
  //   "4T", "2T", "ST", "PT", "RT",
  //   "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
  //   "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
  //   "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS",
  //   "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH"
  // ];

  allCardsObj: ICard[] = [{ Name: "Draw 4", Value: "4T" }, { Name: "Draw 2", Value: "2T" }, { Name: "Swap Hands", Value: "ST" }, { Name: "Reverse Turn", Value: "RT" }, { Name: "Pause Turn", Value: "PT" },
  /*Diamond*/
  { Name: "2 of Diamonds", Value: "2D" },
  { Name: "3 of Diamonds", Value: "3D" },
  { Name: "4 of Diamonds", Value: "4D" },
  { Name: "5 of Diamonds", Value: "5D" },
  { Name: "6 of Diamonds", Value: "6D" },
  { Name: "7 of Diamonds", Value: "7D" },
  { Name: "8 of Diamonds", Value: "8D" },
  { Name: "9 of Diamonds", Value: "9D" },
  { Name: "10 of Diamonds", Value: "10D" },
  { Name: "Ace of Diamonds", Value: "AD" },
  { Name: "King of Diamonds", Value: "KD" },
  { Name: "Queen of Diamonds", Value: "QD" },
  { Name: "Joker of Diamonds", Value: "JD" },
  /*Spade*/
  { Name: "2 of Spades", Value: "2S" },
  { Name: "3 of Spades", Value: "3S" },
  { Name: "4 of Spades", Value: "4S" },
  { Name: "5 of Spades", Value: "5S" },
  { Name: "6 of Spades", Value: "6S" },
  { Name: "7 of Spades", Value: "7S" },
  { Name: "8 of Spades", Value: "8S" },
  { Name: "9 of Spades", Value: "9S" },
  { Name: "10 of Spades", Value: "10S" },
  { Name: "Ace of Spades", Value: "AS" },
  { Name: "King of Spades", Value: "KS" },
  { Name: "Queen of Spades", Value: "QS" },
  { Name: "Joker of Spades", Value: "JS" },
  /*Clubs*/
  { Name: "2 of Clubs", Value: "2C" },
  { Name: "3 of Clubs", Value: "3C" },
  { Name: "4 of Clubs", Value: "4C" },
  { Name: "5 of Clubs", Value: "5C" },
  { Name: "6 of Clubs", Value: "6C" },
  { Name: "7 of Clubs", Value: "7C" },
  { Name: "8 of Clubs", Value: "8C" },
  { Name: "9 of Clubs", Value: "9C" },
  { Name: "10 of Clubs", Value: "10C" },
  { Name: "Ace of Clubs", Value: "AC" },
  { Name: "King of Clubs", Value: "KC" },
  { Name: "Queen of Clubs", Value: "QC" },
  { Name: "Joker of Clubs", Value: "JC" },
  /*Heart*/
  { Name: "2 of Hearts", Value: "2H" },
  { Name: "3 of Hearts", Value: "3H" },
  { Name: "4 of Hearts", Value: "4H" },
  { Name: "5 of Hearts", Value: "5H" },
  { Name: "6 of Hearts", Value: "6H" },
  { Name: "7 of Hearts", Value: "7H" },
  { Name: "8 of Hearts", Value: "8H" },
  { Name: "9 of Hearts", Value: "9H" },
  { Name: "10 of Hearts", Value: "10H" },
  { Name: "Ace of Hearts", Value: "AH" },
  { Name: "King of Hearts", Value: "KH" },
  { Name: "Queen of Hearts", Value: "QH" },
  { Name: "Joker of Hearts", Value: "JH" }
  ]

  constructor(private http: HttpClient) {
  }

  getRandomCards(count: number) {
    let _arr = [...this.allCardsObj];
    return [...Array(count)].map(() => _arr.splice(Math.floor(Math.random() * _arr.length), 1)[0]);
  }

  sortCards(cards: string[]): Observable<ICard[]> {
    let url =  environment.apiUrl + 'Card';
    return this.http.post<string[]>(url,cards).pipe(map((res: any) => this.mapCards(res)))
  }

  mapCards(res: any) : ICard[] {
    var cards: ICard[] = [];
    for (let i = 0; i < res.length; i += 1) {
      var card: ICard = {} as ICard;
      card.Value = res[i];
      card.Name = this.allCardsObj.find(card => card.Value === res[i])?.Name;
      cards.push(card);
    }
    return cards;
  }
}
