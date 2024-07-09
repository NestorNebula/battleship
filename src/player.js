import { Gameboard } from './gameboard';

class Player {
  constructor() {
    this.board = Gameboard();
  }
}

class Computer extends Player {
  constructor() {
    super();
    this.lastHit = null;
  }

  randomCoordinates() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return [a, b];
  }

  chooseSquare() {
    if (this.lastHit === null) {
      return this.randomCoordinates();
    }
    const randomDirection = Math.floor(Math.random() * 4);
    switch (randomDirection) {
      case 0:
        return [this.lastHit[0] - 1, this.lastHit[1]];
      case 1:
        return [this.lastHit[0] + 1, this.lastHit[1]];
      case 2:
        return [this.lastHit[0], this.lastHit[1] - 1];
      case 3:
        return [this.lastHit[0], this.lastHit[1] + 1];
      default:
        throw Error('The computer cannot choose a square.');
    }
  }
}

export { Player, Computer };
