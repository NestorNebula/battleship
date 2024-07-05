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

  describe('isSunk', () => {
    const sunkTestGameboard = Gameboard();
    sunkTestGameboard.placeShips();

    sunkTestGameboard.receiveAttack([0, 0]);
    sunkTestGameboard.receiveAttack([0, 1]);
    sunkTestGameboard.receiveAttack([0, 2]);
    sunkTestGameboard.receiveAttack([0, 3]);
    sunkTestGameboard.receiveAttack([0, 4]);

    test('return false if not all ships are sunk', () => {
      expect(sunkTestGameboard.fleetSunk()).toBeFalsy();
    });

    test('return true if all ships are sunk', () => {
      sunkTestGameboard.receiveAttack([1, 0]);
      sunkTestGameboard.receiveAttack([1, 1]);
      sunkTestGameboard.receiveAttack([1, 2]);
      sunkTestGameboard.receiveAttack([1, 3]);

      sunkTestGameboard.receiveAttack([2, 0]);
      sunkTestGameboard.receiveAttack([2, 1]);
      sunkTestGameboard.receiveAttack([2, 2]);

      sunkTestGameboard.receiveAttack([3, 0]);
      sunkTestGameboard.receiveAttack([3, 1]);
      sunkTestGameboard.receiveAttack([3, 2]);

      sunkTestGameboard.receiveAttack([4, 0]);
      sunkTestGameboard.receiveAttack([4, 1]);
      expect(sunkTestGameboard.fleetSunk()).toBeTruthy();
    });
  });
});
