import { Component, Input } from '@angular/core';

import { Product } from '../products';
import { products } from '../products';

import { GameAddon }  from "./gameAddons";
import { minesweeperButton } from "./gameAddons";

import { AppComponent } from "../app.component";

let gameChoice = 3;
let startOver = false;
let minesweeperStartOver = false;
let clicked = false;

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})

export class GameListComponent {
  @Input() product!: Product;
  products = products;
  @Input() gameAddon!: GameAddon;
  gameButton = minesweeperButton;



  share(game:number) {
    if (game == 1) {
      gameChoice = 1;
      startOver = true;
    } else if (game == 2) {
      gameChoice = 2;
      startOver = true;
    } else if (game == 3) {
      gameChoice = 3;
      minesweeperStartOver = true;
      window.location.reload();
    }
    else if (game == 4) {
      gameChoice = 4;
      startOver = true;
    }
  }

  static MinesweeperResetFalse() {
      clicked = false;
  }

  MinesweeperReset() {
    clicked = true;
  }
}


export { gameChoice, startOver, minesweeperStartOver, clicked};

