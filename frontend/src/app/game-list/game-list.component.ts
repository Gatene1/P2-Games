import { Component, Input } from '@angular/core';

import { Product } from '../products';
import { products } from '../products';

import { GameAddon }  from "./gameAddons";
import { minesweeperButton } from "./gameAddons";

let gameChoice = 3;
let startOver = false;
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

export { gameChoice, startOver, clicked};

