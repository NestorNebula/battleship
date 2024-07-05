import { Ship } from './ship';

export function Gameboard() {
  const createBoard = () => {
    const size = 10;
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row[j] = null;
      }
      board[i] = row;
    }
    return board;
  };

  const board = createBoard();

  const getBoard = () => board;

  const fleet = [
    {
      ship: new Ship(5),
      coordinates: [0, 0],
      direction: 'horizontal',
    },
    {
      ship: new Ship(4),
      coordinates: [1, 0],
      direction: 'horizontal',
    },
    {
      ship: new Ship(3),
      coordinates: [2, 0],
      direction: 'horizontal',
    },
    {
      ship: new Ship(3),
      coordinates: [3, 0],
      direction: 'horizontal',
    },
    {
      ship: new Ship(2),
      coordinates: [4, 0],
      direction: 'horizontal',
    },
  ];

  return { getBoard };
}
