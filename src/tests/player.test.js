import { Player } from '../player';

describe('Player', () => {
  const player = new Player();
  test('player has a board', () => {
    expect(player.board.getBoard()).toBeDefined();
  });
});
