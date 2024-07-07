import { Gameboard } from './gameboard';

class Player {
  constructor() {
    this.board = Gameboard();
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  randomCoordinates() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return [a, b];
  }
}

export { Player, Computer };
