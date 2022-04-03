# Game Pad
- Our mission for this project was to take our new-found knowledge and 
  try to build our own games from scratch.
- We used Angular as our front-end framework and Spring as our back-end framework.
- We set out with a simple goal of testing our skills and understanding of the 
  frameworks we used to build this project.
- We started with a simple game that we called `Pong` and we built it entirely using Typescript.
- Use `ng serve` to run the application locally on a dev server. 


- We used the following libraries:
  - [Angular](https://angular.io/)
  - [Spring](https://spring.io/)
  - [JQuery](https://jquery.com/)
  - [Postgresql](https://www.postgresql.org/)
  - [Typescript](https://www.typescriptlang.org/)


## User Stories
- User has access to 4 different games on the landing page:
  - `Pong`
  - `Mega-man prototype`
  - `Minesweeper`
  - `Snake`


- User can navigate to the game page by clicking on the buttons with the desired game name.
- This will change the contents of the canvas as well as reset the others games.


## Pong
- The game is a single player game where the user can move the paddle left
  and right using the mouse while hovering over the canvas.
- The game is played by using the paddle to stop the ball from reaching 
  the bottom of the screen.
- If the ball reaches the bottom of the screen, the ball will reset to the middle of the screen
  and continue to move about the canvas, while bouncing off the other bounding walls.




## Mega-man Prototype
- User can move the character left and right using the `A` and `D` keys.
- If the character doesn't move, it will trigger an idle animation where he blinks every few seconds.
- User can jump by pressing the `Spacebar` and the character will jump higher the longer it is pressed.


## Minesweeper
- The object of this game is to reveal all the tiles that don't contain a bomb.
- Upon navigating to the Minesweeper tab, the user is presented with an empty grid with bombs
  hidden randomly under tiles.
- Each tile contains a number or a bomb, click the tile to reveal its contents.
- When a number is revealed, the number equals the amount of bombs that are adjacent to that tile.
- When a bomb is revealed, game is lost and the player can click the `Reset` button above the 
  playing field.
- Game is won if all non-bomb tiles are discovered.

## Snake
- This game will remain paused until the snake is moved. 
- Control the snake using the `Arrow` keys.
- The object of the game is to move the snake about the board collecting apples.
- Each apple eaten increases the snake's length by one segment and increases your score by one.
- Snake gradually gets faster as its length increases.
- Game is lost if the user runs into a bounding wall or if it runs into its own body.
- 