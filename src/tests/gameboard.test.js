import { Gameboard } from '../gameboard';

describe('Gameboard', () => {
  const gameboard = Gameboard();

  test('gameboard created correctly', () => {
    const board = gameboard.getBoard();
    expect(board[0][1]).toBeNull();
    expect(board[4][6]).toBeNull();
    expect(board[7][9]).toBeNull();
  });
});
