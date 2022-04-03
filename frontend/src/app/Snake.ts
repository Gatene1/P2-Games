export interface Snake {
  y: number;
  x: number;
}

export class snake implements Snake{
  y:number;
  x:number;

  public constructor(x:number,y:number) {
    this.y = y;
    this.x = x;
  }
}
