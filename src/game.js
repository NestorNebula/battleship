import { Player } from './player';
import { Displayboard } from './displayboard';

export function Game() {
  const player = new Player();
  const computer = new Player();
  const display = Displayboard();

  player.board.placeShips();
  computer.board.placeShips();
  const playerFleet = player.board.getFleet();
  display.playerBoard(player.board.getBoard(), playerFleet);
  display.opponentBoard(computer.board.getBoard());

  const startGame = () => {
    waitMove();
  };

  const waitMove = () => {
    const oppsquares = document.querySelectorAll('.oppsquare');
    oppsquares.forEach((square) => {
      square.addEventListener('click', () => {
        const coordinates = square.id.split('-');
        const result = computer.board.receiveAttack(coordinates);
        display.opponentBoard(computer.board.getBoard());
        waitMove();
      });
    });
  };

  startGame();
}
