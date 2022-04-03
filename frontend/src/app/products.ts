export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const products = [
  {
    id: 1,
    name: 'Pong!',
    price: 1,
    description: 'Pong'
  },

  {
    id: 2,
    name: 'A sample stage without collisions',
    price: 2,
    description: 'MegaMan Stage'
  },

  {
    id: 3,
    name: 'Simple. Click a tile, not a mine.',
    price: 3,
    description: 'Minesweeper'
  },

  {
    id: 4,
    name: 'A sample stage without collisions',
    price: 4,
    description: 'Snake'
  }
];
