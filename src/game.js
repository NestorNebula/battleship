import { Player } from './player';
import { Displayboard } from './displayboard';

export function Game() {
  const player = new Player();
  const computer = new Player();
  const display = Displayboard();

  player.board.placeShips();
  display.playerBoard(player.board.getBoard());
  display.opponentBoard(computer.board.getBoard());
}
