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
    while (true) {
      if (this.lastHit === null) {
        return this.randomCoordinates();
      }
      let choices = [];
      if (this.lastHit[0] > 0) {
        choices.push([this.lastHit[0] - 1, this.lastHit[1]]);
      }
      if (this.lastHit[0] < 9) {
        choices.push([this.lastHit[0] + 1, this.lastHit[1]]);
      }
      if (this.lastHit[1] > 0) {
        choices.push([this.lastHit[0], this.lastHit[1] - 1]);
      }
      if (this.lastHit[1] < 9) {
        choices.push([this.lastHit[0], this.lastHit[1] + 1]);
      }
      let randomDirection = Math.floor(Math.random() * choices.length);
      let choice = choices[randomDirection];
      return choice;
    }
  }
}

export { Player, Computer };
