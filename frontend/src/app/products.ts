export interface Product {
  id: number;
  name: string;
  description: string;
  rules: string
}

export const products = [
  {
    id: 1,
    name: 'Pong!',
    description: 'A game of pong.',
    rules: 'The game is played with a rectangular paddle. You must use it to hit the ball back and forth against the 3 walls.'
  },

  {
    id: 2,
    name: 'Megaman Stage',
    description: 'A sample stage without collisions',
    rules: 'Using the WASD keys you can move around the stage. Only the collisions on the floor and the two walls exist. Try jumping.'
  },

  {
    id: 3,
    name: 'Minesweeper',
    description: 'Simple. Click a tile, not a mine.',
    rules: 'Don\'t click a mine! Click the other tiles. Normal tiles have numbers that tell how many bombs are around them. Right clicking a tile will put a flag on it, declaring it is a mine. Middle clicking a tile will put a ? on it, declaring you aren\'t sure if it is a mine or not.'
  },

  {
    id: 4,
    name: 'Snake',
    description: 'Grab the fruit, not your body or the walls.',
    rules: 'Move with WASD. Eat the red squares, and your body becomes longer. Avoid hitting the walls or yourself.'
  }
];
