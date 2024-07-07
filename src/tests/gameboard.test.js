import { Gameboard } from '../gameboard';

describe('Gameboard', () => {
  const gameboard = Gameboard();

  test('gameboard created correctly', () => {
    const board = gameboard.getBoard();
    expect(board[0][1].status).toBeNull();
    expect(board[4][6].ship).toBeNull();
    expect(board[7][9].status).toBeNull();
  });

  test('getFleet returns ships informations', () => {
    const fleet = gameboard.getFleet();
    expect(fleet[0].id).toBe(0);
    expect(fleet[3].direction).toMatch('horizontal');
  });

  test('place ship on correct coordinates', () => {
    const board = gameboard.getBoard();
    gameboard.placeShip(1, 0, 'vertical');
    gameboard.placeShip(3, 9, 'horizontal');
    expect(board[1][1].ship).toBe(0);
    expect(board[9][3].ship).toBe(1);
  });

  test('place ships on correct coordinates', () => {
    const board = gameboard.getBoard();
    gameboard.placeShips();
    expect(board[0][4].ship).toBe(0);
    expect(board[1][3].ship).toBe(1);
    expect(board[2][2].ship).toBe(2);
    expect(board[3][1].ship).toBe(3);
    expect(board[4][0].ship).toBe(4);
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
