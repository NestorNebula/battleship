import { Player, Computer } from './player';
import { Displayboard } from './displayboard';

export function Game() {
  const player = new Player();
  const computer = new Computer();
  const display = Displayboard();

  const playerFleet = player.board.getFleet();
  display.playerBoard(player.board.getBoard(), playerFleet);
  display.opponentBoard(computer.board.getBoard());

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
      startGame();
    });
  };

  const startGame = () => {
    waitMove();
  };

  const waitMove = () => {
    const oppsquares = document.querySelectorAll('.oppsquare');
    oppsquares.forEach((square) => {
      square.addEventListener('click', () => {
        const coordinates = square.id.split('-');
        const result = computer.board.receiveAttack(coordinates);
        displAttackResult(result);
        display.opponentBoard(computer.board.getBoard());
        if (computer.board.fleetSunk() === true) {
          endGame('You');
        } else {
          manageComputerTurn();
          if (player.board.fleetSunk() === true) {
            endGame('Computer');
          } else {
            waitMove();
          }
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
      const coordinates = computer.randomCoordinates();
      const result = player.board.receiveAttack(coordinates);
      if (result !== false) {
        displAttackResult(result);
        display.playerBoard(player.board.getBoard(), player.board.getFleet());
        break;
      }
    }
  };

  const endGame = (winner) => {
    const result = document.querySelector('.result');
    result.textContent = `The game is over! ${winner} wins !`;
  };

  getShipRoot();
  getRandomPosition();
}
