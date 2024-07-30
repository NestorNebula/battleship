import { Player, Computer, ComputerMove } from './player';
import { Displayboard } from './displayboard';
import { click } from '../node_modules/dropdown-clicked-hovered';

export function Game() {
  const player = new Player();
  const computer = new Computer();
  const display = Displayboard();
  const playerFleet = player.board.getFleet();
  const computerFleet = computer.board.getFleet();
  display.playerBoard(player.board.getBoard(), playerFleet);
  display.opponentBoard(computer.board.getBoard(), computerFleet);
  const playerSection = document.querySelector('.player');
  const computerSection = document.querySelector('.opp');
  display.hideBoard(computerSection, playerSection);

  const helpButton = document.querySelector('.help');
  const helpContent = document.querySelector('.helpcontent');

  click(helpButton, helpContent);

  const getShipRoot = () => {
    const btn = document.querySelector('#formbtn');
    btn.addEventListener('click', () => {
      const col = document.querySelector('#col');
      const row = document.querySelector('#row');
      const direction = document.querySelector('#direction');
      const result = player.board.placeShip(
        Number(col.value),
        Number(row.value),
        direction.value
      );
      if (result === true) {
        display.playerBoard(player.board.getBoard(), playerFleet);
        const text = document.querySelector('.pregametext');
        text.textContent = 'Choose your ';
        let id = Number(text.id);
        switch (id) {
          case 1:
            const random = document.querySelector('#random');
            random.classList.add('hidden');
            text.textContent += 'Second Ship (Size: 4)';
            break;
          case 2:
            text.textContent += 'Third Ship (Size: 3)';
            break;
          case 3:
            text.textContent += 'Fourth Ship (Size: 3)';
            break;
          case 4:
            text.textContent += 'Fifth Ship (Size: 2)';
            break;
          default:
            text.textContent += 'First Ship (Size: 5)';
        }
        text.textContent += ' root coordinates and direction!';
        text.id = id += 1;
        if (id > 5) {
          computer.board.placeShipsRandomly();
          startGame();
        }
      }
    });
  };

  const getRandomPosition = () => {
    const randomBtn = document.querySelector('#random');
    randomBtn.addEventListener('click', () => {
      player.board.placeShipsRandomly();
      display.playerBoard(player.board.getBoard(), playerFleet);
      computer.board.placeShipsRandomly();
      startGame();
    });
  };

  const startGame = () => {
    const pregame = document.querySelector('.pregame');
    pregame.classList.add('hidden');
    helpContent.textContent =
      "Click on one of your opponent square to attack it. If an O appears, it means that you've hit one of his ship. If an X appears, it means that you didn't hit any ship.";
    display.hideBoard(playerSection, computerSection);
    waitMove();
  };

  const waitMove = () => {
    const oppsquares = document.querySelectorAll('.oppsquare');
    oppsquares.forEach((square) => {
      square.addEventListener('click', () => {
        const coordinates = square.id.split('-');
        const result = computer.board.receiveAttack(coordinates);
        if (result === false) {
          return false;
        }
        displAttackResult(result);
        display.opponentBoard(computer.board.getBoard(), computerFleet);
        if (computer.board.fleetSunk() === true) {
          endGame('Player');
        } else {
          display.hideBoard(computerSection, playerSection);
          setTimeout(() => {
            manageComputerTurn();
            if (player.board.fleetSunk() === true) {
              endGame('Computer');
            } else {
              setTimeout(() => {
                display.hideBoard(playerSection, computerSection);
                waitMove();
              }, 1000);
            }
          }, 1000);
        }
      });
    });
  };

  const displAttackResult = (attackresult) => {
    const result = document.querySelector('.result');
    if (attackresult === 'hit') {
      result.textContent = 'Hit !';
      return;
    }
    if (attackresult === 'miss') {
      result.textContent = 'Missed !';
      return;
    }
    if (attackresult === 'sunk') {
      result.textContent = 'Ship sunk!';
    }
  };

  const manageComputerTurn = () => {
    while (true) {
      let coordinates = null;
      coordinates = computer.chooseSquare();
      if (coordinates) {
        const result = player.board.receiveAttack(coordinates.choice);
        if (result !== false) {
          if (result.details === 'hit') {
            const move = new ComputerMove(coordinates.choice);
            if (computer.lastHit) {
              move.previous = computer.lastHit;
              move.direction = coordinates.direction;
            }
            if (computer.hitships.length !== 0) {
              if (computer.hitships.every((ship) => ship.id !== result.id)) {
                computer.hitships.push({ id: result.id, lastMove: move });
              } else {
                computer.hitships.forEach((ship) =>
                  ship.id === result.id ? (ship.lastMove = move) : null
                );
              }
            } else {
              computer.hitships.push({ id: result.id, lastMove: move });
            }
            computer.lastHit = move;
          } else if (result.details === 'sunk') {
            const filteredShips = computer.hitships.filter(
              (ship) => ship.id !== result.id
            );
            computer.hitships = filteredShips;
            if (computer.hitships.length !== 0) {
              computer.hitships[0].lastMove.direction = null;
              computer.lastHit = computer.hitships[0].lastMove;
            } else {
              computer.lastHit = null;
            }
          }
          displAttackResult(result.details);
          display.playerBoard(player.board.getBoard(), player.board.getFleet());
          break;
        }
      } else {
        if (computer.lastHit) {
          if (computer.lastHit.previous) {
            computer.lastHit = computer.lastHit.previous;
          } else {
            computer.lastHit = null;
          }
        }
      }
    }
  };

  const endGame = (winner) => {
    const result = document.querySelector('.result');
    result.textContent = `The game is over! ${winner} wins !`;
    winner === 'Player'
      ? playerSection.classList.remove('hidden')
      : computerSection.classList.remove('hidden');
    display.playerBoard(computer.board.getBoard(), computerFleet, 'endgame');
    playerSection.classList.add('endgame');
    computerSection.classList.add('endgame');
  };

  getShipRoot();
  getRandomPosition();
}
