import { Gameboard } from '../gameboard';

describe('Gameboard', () => {
  const gameboard = Gameboard();

  test('gameboard created correctly', () => {
    const board = gameboard.getBoard();
    expect(board[0][1]).toBeNull();
    expect(board[4][6]).toBeNull();
    expect(board[7][9]).toBeNull();
  });

  test('place ships on correct coordinates', () => {
    const board = gameboard.getBoard();
    gameboard.placeShips();
    expect(board[0][4]).toBe(0);
    expect(board[1][3]).toBe(1);
    expect(board[2][2]).toBe(2);
    expect(board[3][1]).toBe(3);
    expect(board[4][0]).toBe(4);
  });

  describe('receiveAttack', () => {
    test('return hit if the attack hits a ship', () => {
      expect(gameboard.receiveAttack([0, 1])).toMatch('hit');
    });

    test("return miss if the attack didn't hit a ship", () => {
      expect(gameboard.receiveAttack([8, 9])).toMatch('miss');
    });

    test('return false if the square was already tried', () => {
      expect(gameboard.receiveAttack([8, 9])).toBeFalsy();
    });
  });
});
