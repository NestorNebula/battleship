import { Player } from './player';
import { Displayboard } from './displayboard';

export function Game() {
  const player = new Player();
  const computer = new Player();
  const display = Displayboard();

  player.board.placeShips();
  const playerFleet = player.board.getFleet();
  display.playerBoard(player.board.getBoard(), playerFleet);
  display.opponentBoard(computer.board.getBoard());
}
