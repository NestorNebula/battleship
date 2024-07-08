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

  test('place ships on random coordinates', () => {
    const randomGameboard = Gameboard();
    const randomFleet = randomGameboard.getFleet();
    gameboard.placeShipsRandomly();
    expect(randomFleet[4].isPlaced).toBeTruthy();
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
    const fleet = sunkTestGameboard.getFleet();

    test('return false if not all ships are sunk', () => {
      fleet[0].ship.hit();
      fleet[0].ship.hit();
      fleet[0].ship.hit();
      fleet[0].ship.hit();
      fleet[0].ship.hit();
      expect(sunkTestGameboard.fleetSunk()).toBeFalsy();
    });

    test('return true if all ships are sunk', () => {
      fleet[1].ship.hit();
      fleet[1].ship.hit();
      fleet[1].ship.hit();
      fleet[1].ship.hit();
      fleet[2].ship.hit();
      fleet[2].ship.hit();
      fleet[2].ship.hit();
      fleet[3].ship.hit();
      fleet[3].ship.hit();
      fleet[3].ship.hit();
      fleet[4].ship.hit();
      fleet[4].ship.hit();
      expect(sunkTestGameboard.fleetSunk()).toBeTruthy();
    });
  });
});
