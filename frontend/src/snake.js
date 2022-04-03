const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');


class snake {
  constructor(x,y) {
    this.y = y;
    this.x = x;
  }
}


let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
let speedX = 0;
let speedY = 0;

let appleX = 5;
let appleY = 5;
const snakeParts = [];
let length = 1;
let score = 0;


function draw() { // Gameplay loop.
  changePos();

  let result = isGameOver();
  if (result) return;
  clearScreen();
  checkCollision();
  drawApple();
  drawSnake();
  drawScore();
  if (score > 3) speed = 10;
  if (score > 5) speed = 13;
  if (score > 7) speed = 16;
  if (score > 9) speed = 19;
  if (score > 12) speed = 22;
  setTimeout(draw, 1000/speed);
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '10px Verdana';
  ctx.fillText("Score " + score, canvas.width - 50, 10);
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
    ctx.fillStyle = 'white';
    ctx.font = '50px Verdana';
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;
    ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
  }
  return gameOver;
}


function clearScreen() {
  // Creates the black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

function changePos() {
  // Changes the direction of the snake when event happens.
  headX += speedX;
  headY += speedY;
}

function drawApple() {
  // Draws apple and makes it red.
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
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
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  // Puts an item at the end of the snakeParts array
  snakeParts.push(new snake(headX, headY));
  if (snakeParts.length > length) {
    snakeParts.shift();
  }

  // Head of the snake
  ctx.fillStyle = 'orange';
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

document.body.addEventListener('keydown', keyDown);
// Checks if the user has pressed a direction key. If so, it changes the direction of the snake to that direction.
function keyDown(evt) {
  if(evt.keyCode === 38){  // up
    if (speedY === 1) { return }
    speedY = -1;
    speedX = 0;
  }
  if(evt.keyCode === 40){  // down
    if (speedY === -1) { return }
    speedY = 1;
    speedX = 0;
  }
  if(evt.keyCode === 37){  // left
    if (speedX === 1) { return }
    speedX = -1;
    speedY = 0;
  }
  if(evt.keyCode === 39){  // right
    if (speedX === -1) { return }
    speedX = 1;
    speedY = 0;
  }
}

draw();
