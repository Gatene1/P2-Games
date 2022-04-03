// noinspection TypeScriptCheckImport

import { Component } from '@angular/core';
import { gameChoice, startOver, minesweeperStartOver, clicked, GameListComponent} from "./game-list/game-list.component";

import { Snake } from './Snake';
import { snake } from './Snake';

import { GameAddon } from './game-list/gameAddons';
import { minesweeperButton } from './game-list/gameAddons';
import {min, TimeInterval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Game Chooser';
}

let buttons = document.getElementById('msResetButton');






/******
 *****
 ****
 ***
 **Global Variables / functions
 ***
 ****
 *****
 ******/

let canvas: HTMLCanvasElement;
let ctxGame1 : CanvasRenderingContext2D;
let textInput1 : HTMLInputElement;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

let framesPerSecond: number = 30;



let getCanvasElementById = (id : 'SampleGame1') : HTMLCanvasElement => {
  let canvasGame1 = document.getElementById(id);
  if (!(canvasGame1 instanceof HTMLCanvasElement)) {
    throw new Error('Can\'t access "${id}"');
  }
  return canvasGame1;
};

//canvas = getCanvasElementById('SampleGame1');

let getCanvasRenderingContext2D = (canvasGame1 : HTMLCanvasElement) : CanvasRenderingContext2D => {
  let context1 = canvasGame1.getContext('2d');

  if (context1 === null) {
    throw new Error("Browser doesn't support Canvas Context Drawing");
  }
  return context1;
};

//ctxGame1 = getCanvasRenderingContext2D(canvas);

let grabTextElement = (id: 'textField1') : HTMLInputElement => {
  let textField1 = document.getElementById(id);
  if (!(textField1 instanceof HTMLInputElement))
    throw new Error('Can\'t grab the text box');
  return textField1;
};

let grabTextArea = (id: 'textField2') : HTMLTextAreaElement => {
  let textField2 = document.getElementById(id);
  if (!(textField2 instanceof HTMLTextAreaElement))
    throw new Error('Can\'t grab the text area');
  return textField2;
};

let msResetButton = (id: 'msResetButton') : HTMLButtonElement => {
  let msResetButton = document.getElementById(id);
  if (!(msResetButton instanceof HTMLButtonElement))
    throw new Error('Can\'t grab the button');
  return msResetButton;
};

let gameOneReset = false;
let gameTwoReset = false;
let gameThreeReset = false;
let gameFourReset = false;












/******
 *****
 ****
 ***
 **Game 1: Pong game variables
 ***
 ****
 *****
 ******/
const PADDLE_WIDTH:number = 100;
const PADDLE_HEIGHT:number = 10;
let distance:number = 60;
let paddleX:number = 220;
let paddleY:number = 380;
let ballX: number = 75;
let ballY: number = 75;
let ballSpeedX: number = 5;
let ballSpeedY: number = 7;
let mouseX:number, mouseY:number;

function ResetGameOne() {
  let ballX: number = 75;
  let ballY: number = 75;
  let ballSpeedX: number = 5;
  let ballSpeedY: number = 7;
  let mouseX:number, mouseY:number;
}




/******
 *****
 ****
 ***
 **Game 2: Megaman game variables
 ***
 ****
 *****
 ******/


let keys = {
  left: false,
  right: false,
  space: false,
  quote: false
}

let megaman = {
  x: 176,
  y: 306,
  x_v: 0,
  y_v: 0,
  imgWidth: 64,
  imgHeight: 64,
  trueWidth: 48,
  trueHeight: 42,
  flipped: false,
  moveSpeed: .02,
  jumpSpeed: 5.6,
  maxJumpFrame: 10,
  jumpInterval: 8.25,
  action : {
    idle: true,
    walk: false,
    grounded: true,
    jump: false,
    fall: false
  }

};
let gravity = 0.6;
let friction = 0.7;
let megamanIdlingFrameCount = 0;
let megamanMovingFrameCount = 0;
let megamanJumpingFrameCount = 0;
let megamanIdlingFrameMax = 120;
let blinkCountThreshold = 126;

const STAGE_COLS = 13;
const STAGE_ROWS = 13;
let stageImage: CanvasImageSource;
let elecmanStageRoom1 =  [2, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let megamanIdle1 = document.getElementById('megamanIdle1');
let megamanIdle2 = document.getElementById('megamanIdle2');
let elecManInsideFloor1 = document.getElementById('elecManInsideFloor1');

function ResetGameTwo() {
  megaman.x = 176;
  megaman.y = 306;
}

function rowColToArrayIndex(col:number, row:number) {
  return col + STAGE_COLS * row;
}

function DrawTracks() {
  for (let eachRow = 0; eachRow < STAGE_ROWS; eachRow++)
    for (var eachCol = 0; eachCol < STAGE_COLS; eachCol++) {
      let arrayIndex = rowColToArrayIndex(eachCol, eachRow);
      if (elecmanStageRoom1[arrayIndex] == 1) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/elecManInsideFloor1.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 2) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/elecManInsideWall1.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 6);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 3) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/elecManInsidePlatform1.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 4) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/wilyLogoBL.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 5) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/wilyLogoBR.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 6) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/wilyLogoTL.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
      if (elecmanStageRoom1[arrayIndex] == 7) {
        stageImage = new Image();
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/wilyLogoTR.png";
        ctxGame1.drawImage(stageImage, eachCol * 32 - 8, eachRow * 30 + 8);  // 13 is the width of each tile
      }
    }
}










/******
 *****
 ****
 ***
 **Game 3: Minesweeper game variables
 ***
 ****
 *****
 ******/


let mines = 5;
let minesSet = false;
let minesweeperGameOver = false;
let minesweeperGameWon = false;
let minesweeperGameOverLogo = 400;
let minesweeperGameOverGradient = 0.2;
let minesweeperGameOverGradientIncrement = 0.01;
let minesweeperGameOverLogoSpeed = -5;

let squareColor = '#00ff00';
let row1 = [0, 0, 0, 0, 0];
let row2 = [0, 0, 0, 0, 0];
let row3 = [0, 0, 0, 0, 0];
let row4 = [0, 0, 0, 0, 0];
let row5 = [0, 0, 0, 0, 0];

let row1Ex = [0, 0, 0, 0, 0];
let row2Ex = [0, 0, 0, 0, 0];
let row3Ex = [0, 0, 0, 0, 0];
let row4Ex = [0, 0, 0, 0, 0];
let row5Ex = [0, 0, 0, 0, 0];

function ResetMineField() {
  row1 = [0, 0, 0, 0, 0];
  row2 = [0, 0, 0, 0, 0];
  row3 = [0, 0, 0, 0, 0];
  row4 = [0, 0, 0, 0, 0];
  row5 = [0, 0, 0, 0, 0];
}

function ResetMineSquares() {
  minesweeperGameOverLogoSpeed = -5
  minesweeperGameOverGradientIncrement = 0.01;
  let stringConvert: string = "";
  // Draws the black and white squares of the board.
  let valueToPrint: string = '';
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      // if j is even, squareColor is black, else white
      if (i % 2 == 0)
        squareColor = j % 2 == 0 ? "black" : "white";
      else
        squareColor = j % 2 == 0 ? "white" : "black";
      DrawRectangle(i * 80, j * 80, 80, 80, squareColor);
    }
  }
  for (let k = 0; k < 5; k++) {
    let squareColorOdd = k % 2 == 0 ? "white" : "black";
    let squareColorEven = k % 2 == 0 ? "black" : "white";
    if (row1Ex[k] == 1) {
      if (row1[k] == 10) {
        stringConvert = "\u{1F4A3}"; // Bomb
        DrawText(stringConvert, k * 80 + 30, 40, "24px Arial", squareColorOdd);
        minesweeperGameOver = true;
      } else {
        stringConvert = row1[k].toString();
        DrawText(stringConvert, k * 80 + 30, 40, "24px Arial", squareColorOdd);
      }
    } else if (row1Ex[k] == 11) {
      stringConvert = "\u{1F6A9}"; // Flag
      DrawText(stringConvert, k * 80 + 30, 40, "24px Arial", squareColorOdd);
    } else if (row1Ex[k] == 12) {
      stringConvert = "\u{2754}"; // Question Mark
      DrawText(stringConvert, k * 80 + 30, 40, "24px Arial", squareColorOdd);
    }

    if (row2Ex[k] == 1) {
      if (row2[k] == 10) {
        stringConvert = "\u{1F4A3}"; // Bomb
        DrawText(stringConvert, k * 80 + 30, 120, "24px Arial", squareColorEven);
        minesweeperGameOver = true;
      } else {
        stringConvert = row2[k].toString();
        DrawText(stringConvert, k * 80 + 30, 120, "24px Arial", squareColorEven);
      }
    } else if (row2Ex[k] == 11) {
      stringConvert = "\u{1F6A9}"; // Flag
      DrawText(stringConvert, k * 80 + 30, 120, "24px Arial", squareColorEven);
    } else if (row2Ex[k] == 12) {
      stringConvert = "\u{2754}"; // Question Mark
      DrawText(stringConvert, k * 80 + 30, 120, "24px Arial", squareColorEven);
    }

    if (row3Ex[k] == 1) {
      if (row3[k] == 10) {
        stringConvert = "\u{1F4A3}"; // Bomb
        DrawText(stringConvert, k * 80 + 30, 200, "24px Arial", squareColorOdd);
        minesweeperGameOver = true;
      } else {
        stringConvert = row3[k].toString();
        DrawText(stringConvert, k * 80 + 30, 200, "24px Arial", squareColorOdd);
      }
    } else if (row3Ex[k] == 11) {
      stringConvert = "\u{1F6A9}"; // Flag
      DrawText(stringConvert, k * 80 + 30, 200, "24px Arial", squareColorOdd);
    } else if (row3Ex[k] == 12) {
      stringConvert = "\u{2754}"; // Question Mark
      DrawText(stringConvert, k * 80 + 30, 200, "24px Arial", squareColorOdd);
    }

    if (row4Ex[k] == 1) {
      if (row4[k] == 10) {
        stringConvert = "\u{1F4A3}"; // Bomb
        DrawText(stringConvert, k * 80 + 30, 280, "24px Arial", squareColorEven);
        minesweeperGameOver = true;
      } else {
        stringConvert = row4[k].toString();
        DrawText(stringConvert, k * 80 + 30, 280, "24px Arial", squareColorEven);
      }
    } else if (row4Ex[k] == 11) {
      stringConvert = "\u{1F6A9}"; // Flag
      DrawText(stringConvert, k * 80 + 30, 280, "24px Arial", squareColorEven);
    } else if (row4Ex[k] == 12) {
      stringConvert = "\u{2754}"; // Question Mark
      DrawText(stringConvert, k * 80 + 30, 280, "24px Arial", squareColorEven);
    }
    if (row5Ex[k] == 1) {
      if (row5[k] == 10) {
        stringConvert = "\u{1F4A3}"; // Bomb
        DrawText(stringConvert, k * 80 + 30, 360, "24px Arial", squareColorOdd);
        minesweeperGameOver = true;
      } else {
        stringConvert = row5[k].toString();
        DrawText(stringConvert, k * 80 + 30, 360, "24px Arial", squareColorOdd);
      }
    } else if (row5Ex[k] == 11) {
      stringConvert = "\u{1F6A9}"; // Flag
      DrawText(stringConvert, k * 80 + 30, 360, "24px Arial", squareColorOdd);
    } else if (row5Ex[k] == 12) {
      stringConvert = "\u{2754}"; // Question Mark
      DrawText(stringConvert, k * 80 + 30, 360, "24px Arial", squareColorOdd);
    }
  }
}

if (minesweeperStartOver)
  ResetGameThree();

function ResetGameThree() {
  minesSet = false;
  minesweeperGameOver = false;
  ResetMineField();
  row1Ex = [0, 0, 0, 0, 0];
  row2Ex = [0, 0, 0, 0, 0];
  row3Ex = [0, 0, 0, 0, 0];
  row4Ex = [0, 0, 0, 0, 0];
  row5Ex = [0, 0, 0, 0, 0];
  ResetMineSquares();
}

// GetValueOfSquare will return the value of the squareOn parameter.
const GetValueOfSquare = (squareOnF: number): number => {
  let rowNumber = Math.trunc(squareOnF / 5);
  let rowPOVColumn = squareOnF % 5;
  switch (rowNumber) {
    case 0:
      return row1[rowPOVColumn];
      break;
    case 1:
      return row2[rowPOVColumn];
      break;
    case 2:
      return row3[rowPOVColumn];
      break;
    case 3:
      return row4[rowPOVColumn];
      break;
    case 4:
      return row5[rowPOVColumn];
      break;
    default:
      return 0;
      break;
  }
}


function SetValueOfSquare(x: number, setSquare: number) {
  let rowNumberSV = Math.trunc(x / 5);
  let rowPOVColumnSV = x % 5;
  switch (rowNumberSV) {
    case 0:
      row1[rowPOVColumnSV] = setSquare;
      break;
    case 1:
      row2[rowPOVColumnSV] = setSquare;
      break;
    case 2:
      row3[rowPOVColumnSV] = setSquare;
      break;
    case 3:
      row4[rowPOVColumnSV] = setSquare;
      break;
    case 4:
      row5[rowPOVColumnSV] = setSquare;
      break;
    default:
      break;
  }
}






/******
 *****
 ****
 ***
 **Game 4: Snake game variables
 ***
 ****
 *****
 ******/




let speed = 1;
let tileCount = 20;
let tileSize = CANVAS_WIDTH / tileCount+2.5;
let headX = 10;
let headY = 10;
let speedX = 0;
let speedY = 0;

let appleX = 5;
let appleY = 5;
let snakeParts:snake[];
let length = 1;
let score = 0;

function ResetGameFour() {
  speed = 1;
  tileCount = 20;
  tileSize = CANVAS_WIDTH / tileCount+2.5;
  headX = 10;
  headY = 10;
  speedX = 0;
  speedY = 0;
  appleX = 5;
  appleY = 5;
  snakeParts = [];
  length = 1;
  score = 0;
}








/******
 *****
 ****
 ***
 **End of game-specific variables
 ***
 ****
 *****
 ******/







function UpdateVariables() {


}



function CallAll() {

  let resetButtonActivate = msResetButton('msResetButton');

  if (gameChoice == 3) {
    resetButtonActivate.disabled = false;
  } else {
    resetButtonActivate.disabled = true;
  }

  addEventListener('keypress', (event) => {

    if (gameChoice == 2) {
      switch (event.code) {
        case 'KeyA':
          keys.left = true;
          break;
        case 'KeyD':
          keys.right = true;
          break;
        case "Space":
          keys.space = true;
          break;
        case 'quote':
          keys.quote = true;
          break;
        default:
          break;
      }
    }

    if (gameChoice == 4) {
      switch (event.code) {
        case 'KeyW':
          if (speedY === 1) {
            return;
          }
          speedY = -1;
          speedX = 0;
          break;
        case 'KeyS':
          if (speedY === -1) {
            return;
          }
            speedY = 1;
            speedX = 0;
          break;
        case 'KeyA':
          if (speedX === 1) {
            return;
          }
          speedX = -1;
          speedY = 0;
          break;
        case 'KeyD':
          if (speedX === -1) {
            return;
          }
          speedX = 1;
          speedY = 0;
          break;
        default:
          break;
      }
    }
  });

  addEventListener('keyup', (event) => {
      if (gameChoice == 2) {
        switch (event.code) {
          case 'KeyA':
            keys.left = false;
            break;
          case 'KeyD':
            keys.right = false;
            break;
          case "Space":
            keys.space = false;
            break;
          case 'quote':
            keys.quote = false;
            break;
          default:
            break;
        }
      }
    }
  ); // KeyA, Enter, Quote

  DrawAll();
  UpdateVariables();
}

function DrawRectangle(x: number, y: number, width: number, height: number, color: string) {

  if (color == "Clear")
    ctxGame1.clearRect(x, y, width, height);
  else {
    ctxGame1.fillStyle = color;
    ctxGame1.fillRect(x, y, width, height);
  }
}

function DrawCircle(centerX: number, centerY: number, radius: number, fillColor: string | CanvasGradient | CanvasPattern) {
  ctxGame1.fillStyle = fillColor;
  ctxGame1.beginPath();
  ctxGame1.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  ctxGame1.fill();
}

function DrawText(message: string, x: number, y: number, font: string, color: string) {
  ctxGame1.font = font;
  ctxGame1.fillStyle = color;
  ctxGame1.fillText(message, x, y);
}


window.onload = function() {
  ctxGame1 = getCanvasRenderingContext2D(getCanvasElementById('SampleGame1'));

  ResetGameOne();
  ResetGameTwo();
  ResetGameThree();
  ResetGameFour();

  setInterval(CallAll, 1000/framesPerSecond);

}









/******
 *****
 ****
 ***
 **End of Global Variables / functions
 ***
 ****
 *****
 ******/


function DrawAll() {
  if (gameOneReset) {
    ResetGameOne();
    gameOneReset = false;
  }
  if (gameTwoReset) {
    ResetGameTwo();
    gameTwoReset = false;
  }
  if (gameThreeReset) {
    ResetGameThree();
    gameThreeReset = false;
  }
  if (gameFourReset) {
    ResetGameFour();
    gameFourReset = false;
  }

  if (gameChoice == 1) {  // Pong Game
    gameOneReset = false;
    gameTwoReset = true;
    gameThreeReset = true;
    gameFourReset = true;

    canvas = getCanvasElementById('SampleGame1');
    ctxGame1 = getCanvasRenderingContext2D(canvas);

    DrawRectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, 'black'); // Background
    DrawRectangle(paddleX, paddleY, 100, 10, '#0080ee'); // Bottom paddle
    DrawCircle(ballX += ballSpeedX, ballY += ballSpeedY, 10, 'white'); // Ball
    // DrawRectangle(paddleX, paddleY, 100, 10, '#0080ee'); // Background

    canvas.addEventListener('mousemove', function (evt: MouseEvent) {
      let rect = canvas.getBoundingClientRect(); // Position of mouse on page
      let root = document.documentElement;

      mouseX = evt.clientX - rect.left - root.scrollLeft;
      paddleX = mouseX - (PADDLE_WIDTH / 2);
    });

    if (ballY >= paddleY && ballX >= paddleX && ballX <= paddleX + PADDLE_WIDTH) {  // If ball hits bottom paddle, it will bounce back.
      ballSpeedY *= -1;
    } else if (ballX <= 10 || ballX >= CANVAS_WIDTH - 10) {  // If ball hits left or right wall, it inverses its direction (bounces off wall).
      ballSpeedX *= -1;
    } else if (ballY <= 10) {  // If the ball hits the top wall, it inverses its direction (bounces off wall).
      ballSpeedY *= -1;
    } else if (ballY >= CANVAS_HEIGHT - 10) {  // If the ball hits the bottom wall behind the paddle, it calls the ballReset function and resets the ball to the middle of the board.
      ballReset();
    }


    function ballReset() {  // Simple function to reset the ball to the middle of the board.
      ballX = CANVAS_WIDTH / 2; // Sets ball to middle of the x-axis.
      ballY = CANVAS_HEIGHT / 2;  // Sets ball to middle of the y-axis.
    }


  } else if (gameChoice == 2) { // Megaman Game
    DrawRectangle(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT, "#9bbc0f")
    DrawTracks();
    stageImage = new Image();

    if (keys.space) {
      // I want to be able to hold the spacebar to jump higher, so I got rid of the if !action.jump
      // if (megaman.action.fall || megaman.action.jump){
      //   if (!megaman.flipped)
      //     stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJump.png";
      //   else
      //     stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJumpFlipped.png";
      // }
      // if grounded...
      if (megaman.action.grounded) {
        megaman.y_v -= megaman.jumpInterval;
        megaman.action.jump = true;
        megaman.action.grounded = false;
      }
      // If in the air.
      if (megaman.y < 306) {
        megaman.action.grounded = false;
        // if falling
        if (megamanJumpingFrameCount > megaman.maxJumpFrame) {
          megaman.action.jump = false;
          megaman.action.fall = true;
          megamanIdlingFrameCount = 0;
          megamanMovingFrameCount = 0;
          megamanJumpingFrameCount = megamanJumpingFrameCount;

        }
        // if jumping
        else if (megamanJumpingFrameCount <= megaman.maxJumpFrame) {
          megaman.action.jump = true;
          megaman.action.fall = false;
          megamanIdlingFrameCount = 0;
          megamanMovingFrameCount = 0;
          megamanJumpingFrameCount++;
        }
      }

      if (!megaman.action.grounded) {
        if (!megaman.flipped)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJump.png";
        else
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJumpFlipped.png";
      }
    }


    // need a falling and not grounded version of this too.
    else if (keys.left && megaman.action.grounded) {
      megaman.action.idle = false;
      megaman.action.walk = true;
      megaman.action.grounded = true;
      megaman.action.jump = false;
      megaman.action.fall = false;
      megaman.flipped = false;
      megamanIdlingFrameCount = 0;
      megamanMovingFrameCount++;
      megamanJumpingFrameCount = 0;
      if (megamanMovingFrameCount <= 8)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk1.png";
      else if (megamanMovingFrameCount > 8 && megamanMovingFrameCount <= 16)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2.png";
      else if (megamanMovingFrameCount > 16 && megamanMovingFrameCount <= 24)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3.png";
      else if (megamanMovingFrameCount <= 32)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk4.png";
      else if (megamanMovingFrameCount <= 40)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3.png";
      else if (megamanMovingFrameCount <= 48) {
        if (megamanMovingFrameCount == 48)
          megamanMovingFrameCount = 17;
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2.png";
      }
      megaman.x_v = -3.2;
      megaman.y_v += gravity;
    }
    // need a falling and not grounded version of this too.
    else if (keys.right && megaman.action.grounded) {
      megaman.action.idle = false;
      megaman.action.walk = true;
      megaman.action.grounded = true;
      megaman.action.jump = false;
      megaman.action.fall = false;
      megaman.flipped = true;
      megamanIdlingFrameCount = 0;
      megamanMovingFrameCount++;
      if (megamanMovingFrameCount <= 8)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk1Flipped.png";
      else if (megamanMovingFrameCount > 8 && megamanMovingFrameCount <= 16)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2Flipped.png";
      else if (megamanMovingFrameCount > 16 && megamanMovingFrameCount <= 24)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3Flipped.png";
      else if (megamanMovingFrameCount <= 32)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk4Flipped.png";
      else if (megamanMovingFrameCount <= 40)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3Flipped.png";
      else if (megamanMovingFrameCount <= 48) {
        if (megamanMovingFrameCount == 48)
          megamanMovingFrameCount = 17;
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2Flipped.png";
      }
      megaman.x_v = 3.2;
      megaman.y_v += gravity;
    }
      // If not pressing the left or right keys, and not jumping
    // Need a need a not grounded version of the same below conditional.
    else if (!keys.left && !keys.right) {
      megaman.action.idle = true;
      megaman.action.walk = false;
      megaman.action.grounded = true;
      megaman.action.jump = false;
      megaman.action.fall = false;
      megamanIdlingFrameCount++;
      megamanMovingFrameCount = 0;
      if (megamanIdlingFrameCount > 90 && megamanIdlingFrameCount <= 105) {
        // if Megaman is idle for more than 3 seconds, but less than 3.5, draw the idle blinking frame.
        if (megaman.flipped)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle2Flipped.png";
        else
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle2.png";
        megaman.x_v += 0;
        megaman.y_v += gravity;
      } else {
        if (megamanIdlingFrameCount > 105)
          megamanIdlingFrameCount = 0;
        // if after blinking, idle frame count is reset, but if < 90, keeps accruing.
        if (megaman.flipped)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle1Flipped.png";
        else
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle1.png";
        ctxGame1.drawImage(stageImage, megaman.x, megaman.y += megaman.y_v);
        megaman.x_v = 0;
        megaman.y_v += gravity;
      }
    }
    // This takes care of Megaman blinking out when falling and being idle.
    if (megaman.action.jump || megaman.action.fall) {
      if (!megaman.flipped)
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJump.png";
      else
        stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanJumpFlipped.png";
    }

    if (megaman.y + megaman.y_v > 305)
      megaman.y_v = 305 - megaman.y;


    if (megaman.x + megaman.x_v > 311)
      megaman.x_v = 311 - megaman.x;
    if (megaman.x + megaman.x_v < 7)
      megaman.x_v = 7 - megaman.x;

    // textInput1.value = "i = " + megaman.action.idle.toString() + ", w = " + megaman.action.walk.toString() + ", j = " + megaman.action.jump.toString() + ", g = " + megaman.action.grounded.toString() + ", f = " + megaman.action.fall.toString() ;
    // textInput1.value = "y = " + megaman.y.toString() + ", y_v = " + megaman.y_v.toString();
    ctxGame1.drawImage(stageImage, megaman.x += megaman.x_v, megaman.y += megaman.y_v);


    if (megaman.y >= 305) {
      megaman.y = 305;
      megaman.y_v = 0;
      megaman.action.grounded = true;
      megaman.action.jump = false;
      megaman.action.fall = false;
      if (!megaman.action.walk) {
        megaman.action.walk = false;
        megaman.x_v = 0;
        megamanIdlingFrameCount++;
        megamanMovingFrameCount = 0;
        megamanJumpingFrameCount = 0;
        if (megaman.flipped)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle1Flipped.png";
        else
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanIdle1.png";
      } else {
        megaman.action.walk = true;
        megamanIdlingFrameCount = 0;
        megamanMovingFrameCount++;
        megamanJumpingFrameCount = 0;
        if (megamanMovingFrameCount <= 8)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk1Flipped.png";
        else if (megamanMovingFrameCount > 8 && megamanMovingFrameCount <= 16)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2Flipped.png";
        else if (megamanMovingFrameCount > 16 && megamanMovingFrameCount <= 24)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3Flipped.png";
        else if (megamanMovingFrameCount <= 32)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk4Flipped.png";
        else if (megamanMovingFrameCount <= 40)
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk3Flipped.png";
        else if (megamanMovingFrameCount <= 48) {
          if (megamanMovingFrameCount == 48)
            megamanMovingFrameCount = 17;
          stageImage.src = "http://agamedesigner.info/appImages/AngularTesting/megamanWalk2Flipped.png";
        }
        if (megaman.flipped)
          megaman.x_v = 3.2;
        else
          megaman.x_v = -3.2;
        megaman.y_v += gravity;
      }
    }

    gameOneReset = true;
    gameTwoReset = false;
    gameThreeReset = true;
    gameFourReset = true;



  } else if (gameChoice == 3) { // Minesweeper
    if (gameChoice == 3 && startOver)
      ResetGameThree();

    gameOneReset = true;
    gameTwoReset = true;
    gameThreeReset = false;
    gameFourReset = true;

    canvas = getCanvasElementById('SampleGame1');
    ctxGame1 = getCanvasRenderingContext2D(canvas);


    GameOver();

    let textInput2 = grabTextArea("textField2");
    let mouseButton;
    let rowClicked;
    let colClicked;
    let valueToAdd: number = 0;

    canvas.addEventListener('mousemove', function (evt: MouseEvent) {
      if (gameChoice == 3 && !minesweeperGameOver) {
        let rect = canvas.getBoundingClientRect(); // Position of mouse on page
        let root = document.documentElement;
        let crosshairImage = new Image();

        mouseX = evt.clientX - rect.left - root.scrollLeft;
        mouseY = evt.clientY - rect.top - root.scrollTop;

        // These do the dirty work of which square the mouse is in.
        rowClicked = Math.trunc(mouseY / 79);
        colClicked = Math.trunc(mouseX / 79);

        // Finds out if the row and column the mouse is over is black or white and sets the appropriate crosshair image.
        if (rowClicked % 2 == 0 && colClicked % 2 == 0)
          crosshairImage.src = "http://agamedesigner.info/appImages/AngularTesting/goldCrossHair.png";
        else if (rowClicked % 2 == 0 && colClicked % 2 == 1)
          crosshairImage.src = "http://agamedesigner.info/appImages/AngularTesting/darkGoldCrossHair.png";
        else if (rowClicked % 2 == 1 && colClicked % 2 == 0)
          crosshairImage.src = "http://agamedesigner.info/appImages/AngularTesting/darkGoldCrossHair.png";
        else if (rowClicked % 2 == 1 && colClicked % 2 == 1)
          crosshairImage.src = "http://agamedesigner.info/appImages/AngularTesting/goldCrossHair.png";

        ResetMineSquares();
        ctxGame1.drawImage(crosshairImage, colClicked * 81, rowClicked * 81);
      }
    });
    canvas.addEventListener('mousedown', function (evt: MouseEvent) {
      if (gameChoice == 3 && !minesweeperGameOver) {
        let rect = canvas.getBoundingClientRect(); // Position of mouse on page
        let root = document.documentElement;

        mouseX = evt.clientX - rect.left - root.scrollLeft;
        mouseY = evt.clientY - rect.top - root.scrollTop;

        valueToAdd = 1;

        rowClicked = Math.trunc(mouseY / 81);
        colClicked = Math.trunc(mouseX / 81);
        if (evt.button == 0) {
          switch (rowClicked) {
            case 0:
              row1Ex[colClicked] = valueToAdd;
              textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();

              ResetMineSquares();
              break;
            case 1:
              row2Ex[colClicked] = valueToAdd;
              textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();
              ResetMineSquares();
              break;
            case 2:
              row3Ex[colClicked] = valueToAdd;
              textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();
              ResetMineSquares();
              break;
            case 3:
              row4Ex[colClicked] = valueToAdd;
              textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();
              ResetMineSquares();
              break;
            case 4:
              row5Ex[colClicked] = valueToAdd;
              textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();
              ResetMineSquares();
              break;
          }
        } else if (evt.button == 1) {
          switch (rowClicked) {
            case 0:
              row1Ex[colClicked] = 12;
              ResetMineSquares();
              break;
            case 1:
              row2Ex[colClicked] = 12;
              ResetMineSquares();
              break;
            case 2:
              row3Ex[colClicked] = 12;
              ResetMineSquares();
              break;
            case 3:
              row4Ex[colClicked] = 12;
              ResetMineSquares();
              break;
            case 4:
              row5Ex[colClicked] = 12;
              ResetMineSquares();
              break;
            default:
              break;
          }
        } else if (evt.button == 2) {
          switch (rowClicked) {
            case 0:
              row1Ex[colClicked] = 11;
              ResetMineSquares();
              break;
            case 1:
              row2Ex[colClicked] = 11;
              ResetMineSquares();
              break;
            case 2:
              row3Ex[colClicked] = 11;
              ResetMineSquares();
              break;
            case 3:
              row4Ex[colClicked] = 11;
              ResetMineSquares();
              break;
            case 4:
              row5Ex[colClicked] = 11;
              ResetMineSquares();
              break;
            default:
              break;
          }
        }
      }

    });


    // if the mines haven't been placed yet, nor the number of bombs on each square, and the active game is Minesweeper.
    if (!minesSet && gameChoice == 3) {
      let textInput2 = grabTextArea("textField2");
      let mineCount = 0;
      let x: number;
      let y: number;
      while (mineCount < mines) {
        // Gets a random number between 0 and 1, multiplies by 100 to get a whole number, and truncates the decimal.
        x = Math.trunc((Math.random()) * 100);
        // Places the bombs in the arrays for the board.
        if (x <= 24) {// if (row1[x] == 0) {
          y = (x % 5).valueOf();
          switch (Math.trunc(x / 5)) {
            case 0:
              if (row1[y.valueOf()] == 0) {
                row1[y] = 10;
                mineCount++;
              }
              break;
            case 1:
              if (row2[y.valueOf()] == 0) {
                row2[y] = 10;
                mineCount++;
              }
              break;
            case 2:
              if (row3[y.valueOf()] == 0) {
                row3[y] = 10;
                mineCount++;
              }
              break;
            case 3:
              if (row4[y.valueOf()] == 0) {
                row4[y] = 10;
                mineCount++;
              }
              break;
            case 4:
              if (row5[y.valueOf()] == 0) {
                row5[y] = 10;
                mineCount++;
              }
              break;
          }
        }


      }
      let squaresChecked = 0;
      let squareOn = 0;
      let bombsNearSquare = 0;
      // This variable has a type for the function return to run.
      let squareOnValue: number = 0;
      // These variables hold either -1, 0, 10, or some other positive number.
      let squareLeft = -1, squareRight = -1, squareDown = -1, squareUp = -1, squareUpLeft = -1, squareUpRight = -1,
        squareDownLeft = -1, squareDownRight = -1;


      for (let checkSquare = 0; checkSquare < 25; checkSquare++) {
        // if the value of the current square is not 10 (a bomb).
        if (GetValueOfSquare(checkSquare) < 10) {

          // Checking for squares on the left end. If not, get the values like normal.
          if (checkSquare % 5 == 0) {
            squareLeft = -1;
            squareUpLeft = -1;
            squareDownLeft = -1;
            squareRight = checkSquare + 1;
            squareUpRight = checkSquare - 4;
            squareDownRight = checkSquare + 6;
          } else if (checkSquare % 5 == 4) {
            squareRight = 25;
            squareUpRight = 25;
            squareDownRight = 25;
            squareLeft = checkSquare - 1;
            squareUpLeft = checkSquare - 6;
            squareDownLeft = checkSquare + 4;
          } else {
            squareLeft = checkSquare - 1;
            squareUpLeft = checkSquare - 6;
            squareDownLeft = checkSquare + 4;
            squareRight = checkSquare + 1;
            squareUpRight = checkSquare - 4;
            squareDownRight = checkSquare + 6;
          }

          // These are going to be normal values
          squareDown = checkSquare + 5;
          squareUp = checkSquare - 5;

          // Increments the bomb counter if the value of the square of the above is a bomb.
          if (squareLeft >= 0) {
            if (GetValueOfSquare(squareLeft) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareRight <= 24) {
            if (GetValueOfSquare(squareRight) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareDown <= 24) {
            if (GetValueOfSquare(squareDown) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareUp >= 0) {
            if (GetValueOfSquare(squareUp) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareUpLeft >= 0) {
            if (GetValueOfSquare(squareUpLeft) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareUpRight <= 24) {
            if (GetValueOfSquare(squareUpRight) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareDownLeft >= 0) {
            if (GetValueOfSquare(squareDownLeft) == 10) {
              bombsNearSquare++;
            }
          }
          if (squareDownRight <= 24) {
            if (GetValueOfSquare(squareDownRight) == 10) {
              bombsNearSquare++;
            }
          }
          SetValueOfSquare(checkSquare, bombsNearSquare);
          bombsNearSquare = 0;
        } // if
      }  // for


      //textInput2.value = row1.toString() + "\n" + row2.toString() + "\n" + row3.toString() + "\n" + row4.toString() + "\n" + row5.toString();
      textInput2.value = row1Ex.toString() + "\n" + row2Ex.toString() + "\n" + row3Ex.toString() + "\n" + row4Ex.toString() + "\n" + row5Ex.toString();

      ResetMineSquares();
      minesSet = true;


    }
    // The imported variable from game-list.ts tells if the user clicked the button "Reset Minesweeper Board".
    if (clicked == true) {
      window.location.reload();
      minesSet = false;

      squareColor = '#00ff00';
      row1 = [0, 0, 0, 0, 0];
      row2 = [0, 0, 0, 0, 0];
      row3 = [0, 0, 0, 0, 0];
      row4 = [0, 0, 0, 0, 0];
      row5 = [0, 0, 0, 0, 0];

      row1Ex = [0, 0, 0, 0, 0];
      row2Ex = [0, 0, 0, 0, 0];
      row3Ex = [0, 0, 0, 0, 0];
      row4Ex = [0, 0, 0, 0, 0];
      row5Ex = [0, 0, 0, 0, 0];

      ResetMineSquares();

      // This is the static method in the game-list.ts.
      GameListComponent.MinesweeperResetFalse();

    }

    function DrawOpaqueBackground(gameOverOpacity: number) {
      // This is the Game Over background, slightly see through.
      ctxGame1.fillStyle = 'rgba(0, 0, 0, ' + gameOverOpacity + ')';
      ctxGame1.fillRect(0, 0, canvas.width, canvas.height);
    }

    function GameOver() {
      if (minesweeperGameOver) {
        let thisTextInput: HTMLInputElement = <HTMLInputElement>document.getElementById('textField1');
        ResetMineSquares();
        if (minesweeperGameOverGradient == 1.0)
          minesweeperGameOverGradientIncrement = 0;
        DrawOpaqueBackground(minesweeperGameOverGradient += minesweeperGameOverGradientIncrement);
        ctxGame1.fillStyle = 'white';
        ctxGame1.font = '50px Arial';
        let gradient = ctxGame1.createLinearGradient(0,0,canvas.width,0);
        gradient.addColorStop(0,"magenta");
        gradient.addColorStop(0.5,"blue");
        gradient.addColorStop(1.0,"red");
        ctxGame1.fillStyle = gradient;
        if (minesweeperGameOverLogo <= CANVAS_WIDTH/2 - 125) {
          minesweeperGameOverLogoSpeed = 0;
        }
        ctxGame1.fillText('Game Over', minesweeperGameOverLogo += minesweeperGameOverLogoSpeed, canvas.height / 2);
      }
      return;
    }

  } else if (gameChoice == 4) {
    gameOneReset = true;
    gameTwoReset = true;
    gameThreeReset = true;
    gameFourReset = false;

    canvas = getCanvasElementById('SampleGame1');
    ctxGame1 = getCanvasRenderingContext2D(canvas);

    function drawScore() {
      ctxGame1.fillStyle = 'white';
      ctxGame1.font = '10px Verdana';
      ctxGame1.fillText("Score " + score, canvas.width - 50, 10);
    }

    function isGameOver() {
      // check if snake touches bounding walls
      let gameOver = false;

      // Base case for if game hasn't started.
      if (speedY === 0 && speedX === 0) {
        return false;
      }

      if (headX < 0) {  // left wall
        gameOver = true;
      } else if (headX > tileCount - 1) { // right wall
        gameOver = true;
      } else if (headY < 0) {  // top wall
        gameOver = true;
      } else if (headY > tileCount - 1) { // bottom wall
        gameOver = true;
      }

      // Check if snake hits itself. If so, gameOver becomes true and triggers game over text.
      for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
          gameOver = true;
          break;
        }
      }


      // If gameOver is true, it prints gradient colored text and stops the game.
      if (gameOver) {
        clearScreen();
        ctxGame1.fillStyle = 'white';
        ctxGame1.font = '50px Verdana';
        let gradient = ctxGame1.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1.0, "red");
        ctxGame1.fillStyle = gradient;
        ctxGame1.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
      }
      return gameOver;
    }


    function clearScreen() {
      // Creates the black background
      ctxGame1.fillStyle = 'black';
      ctxGame1.fillRect(0, 0, canvas.width, canvas.height);
    }

    function changePos() {
      // Changes the direction of the snake when event happens.
      headX += speedX;
      headY += speedY;
    }

    function drawApple() {
      // Draws apple and makes it red.
      ctxGame1.fillStyle = 'red';
      ctxGame1.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
    }

    function checkCollision() {
      // Checks if snake hits apple. If so, it increments the length and score by one, then generates a new apple in a random position.
      if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        length++;
        score++;

      }
    }

    function drawSnake() {
      // Body of the snake. Adds a new part to the snake every time an apple is eaten.
      ctxGame1.fillStyle = 'green';
      for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctxGame1.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
      }

      // Puts an item at the end of the snakeParts array
      snakeParts.push(new snake(headX, headY));
      if (snakeParts.length > length) {
        snakeParts.shift();
      }

      // Head of the snake
      ctxGame1.fillStyle = 'orange';
      ctxGame1.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
    }

    function draw() { // Gameplay loop.
      changePos();

      let result = isGameOver();
      if (result) {
        return;
      }
      clearScreen();
      checkCollision();
      drawApple();
      drawSnake();
      drawScore();
      if (score < 2) speed = 1;
      if (score > 2) speed = 10;
      if (score > 4) speed = 12;
      if (score > 7) speed = 14;
      if (score > 9) speed = 16;
      if (score > 12) speed = 20;
    }
    draw();
  }
}









