import { Ship } from '../ship';

describe('Ship', () => {
  const ship = new Ship();
  test('increase hits correctly', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });
});
