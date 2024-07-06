import { Player, Computer } from '../player';

describe('Player', () => {
  const player = new Player();
  test('player has a board', () => {
    expect(player.board.getBoard()).toBeDefined();
  });
});

describe('Computer', () => {
  const computer = new Computer();
  test('computer has a board', () => {
    expect(computer.board.getBoard()).toBeDefined();
  });

  test('random coordinates returns correct coordinates', () => {
    const coordinates = computer.randomCoordinates();
    expect(coordinates[0]).toBeGreaterThanOrEqual(0);
    expect(coordinates[0]).toBeLessThan(10);
    expect(coordinates[1]).toBeGreaterThanOrEqual(0);
    expect(coordinates[1]).toBeLessThan(10);
  });
});
