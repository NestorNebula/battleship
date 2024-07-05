import { Ship } from '../ship';

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(2);
  });
  test('increase hits correctly', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk returns true when ship Sunk', () => {
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
