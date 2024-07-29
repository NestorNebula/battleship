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
      if (this.lastHit.move[0] > 0 && !this.lastHit.top) {
        choices.push({
          possiblemove: [this.lastHit.move[0] - 1, this.lastHit.move[1]],
          id: 1,
        });
      }
      if (this.lastHit.move[0] < 9 && !this.lastHit.bottom) {
        choices.push({
          possiblemove: [this.lastHit.move[0] + 1, this.lastHit.move[1]],
          id: 2,
        });
      }
      if (this.lastHit.move[1] > 0 && !this.lastHit.left) {
        choices.push({
          possiblemove: [this.lastHit.move[0], this.lastHit.move[1] - 1],
          id: 3,
        });
      }
      if (this.lastHit.move[1] < 9 && !this.lastHit.right) {
        choices.push({
          possiblemove: [this.lastHit.move[0], this.lastHit.move[1] + 1],
          id: 4,
        });
      }
      if (choices.length === 0) return false;
      let randomDirection = Math.floor(Math.random() * choices.length);
      let choice = choices[randomDirection];
      if (choice.id === 1) this.lastHit.top = true;
      if (choice.id === 2) this.lastHit.bottom = true;
      if (choice.id === 3) this.lastHit.left = true;
      if (choice.id === 4) this.lastHit.right = true;
      return choice.possiblemove;
    }
  }
}

class ComputerMove {
  constructor(move) {
    this.move = move;
    this.previous = null;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;
  }
}

export { Player, Computer, ComputerMove };
