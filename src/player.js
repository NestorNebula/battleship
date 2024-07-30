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
    this.hitships = [];
  }

  randomCoordinates() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { choice: [a, b] };
  }

  chooseSquare() {
    while (true) {
      if (this.lastHit) {
        //console.log(this.lastHit);
        //console.log(this.hitships);
      }
      if (this.lastHit === null) {
        return this.randomCoordinates();
      }
      let choices = [];
      if (
        this.lastHit.move[0] > 0 &&
        !this.lastHit.top &&
        this.lastHit.direction !== 'horizontal'
      ) {
        choices.push({
          possiblemove: [this.lastHit.move[0] - 1, this.lastHit.move[1]],
          id: 1,
          direction: 'vertical',
        });
      }
      if (
        this.lastHit.move[0] < 9 &&
        !this.lastHit.bottom &&
        this.lastHit.direction !== 'horizontal'
      ) {
        choices.push({
          possiblemove: [this.lastHit.move[0] + 1, this.lastHit.move[1]],
          id: 2,
          direction: 'vertical',
        });
      }
      if (
        this.lastHit.move[1] > 0 &&
        !this.lastHit.left &&
        this.lastHit.direction !== 'vertical'
      ) {
        choices.push({
          possiblemove: [this.lastHit.move[0], this.lastHit.move[1] - 1],
          id: 3,
          direction: 'horizontal',
        });
      }
      if (
        this.lastHit.move[1] < 9 &&
        !this.lastHit.right &&
        this.lastHit.direction !== 'vertical'
      ) {
        choices.push({
          possiblemove: [this.lastHit.move[0], this.lastHit.move[1] + 1],
          id: 4,
          direction: 'horizontal',
        });
      }
      if (choices.length === 0) return false;
      let randomDirection = Math.floor(Math.random() * choices.length);
      let choice = choices[randomDirection];
      if (choice.id === 1) this.lastHit.top = true;
      else if (choice.id === 2) this.lastHit.bottom = true;
      else if (choice.id === 3) this.lastHit.left = true;
      else if (choice.id === 4) this.lastHit.right = true;
      return {
        choice: choice.possiblemove,
        direction: this.lastHit.direction || choice.direction,
      };
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
    this.direction = null;
  }
}

export { Player, Computer, ComputerMove };
