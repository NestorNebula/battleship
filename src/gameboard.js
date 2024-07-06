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
      id: 0,
    },
    {
      ship: new Ship(4),
      coordinates: [1, 0],
      direction: 'horizontal',
      id: 1,
    },
    {
      ship: new Ship(3),
      coordinates: [2, 0],
      direction: 'horizontal',
      id: 2,
    },
    {
      ship: new Ship(3),
      coordinates: [3, 0],
      direction: 'horizontal',
      id: 3,
    },
    {
      ship: new Ship(2),
      coordinates: [4, 0],
      direction: 'horizontal',
      id: 4,
    },
  ];

  const placeShips = () => {
    const board = getBoard();
    fleet.forEach((boat) => {
      const shipLength = boat.ship.length;
      const boatCoordinates = [];
      for (let i = 0; i < shipLength; i++) {
        if (boat.direction === 'horizontal') {
          boatCoordinates.push([boat.coordinates[0], boat.coordinates[1] + i]);
        } else {
          boatCoordinates.push([boat.coordinates[0], boat.coordinates[1] + i]);
        }
      }
      if (squaresEmpty(boatCoordinates)) {
        boatCoordinates.forEach((square) => {
          board[square[0]][square[1]] = boat.id;
        });
      }
    });
  };

  const squaresEmpty = (coordinates) => {
    return coordinates.every((square) => board[square[0]][square[1]] === null);
  };

  const receiveAttack = (coordinates) => {
    let square = board[coordinates[0]][coordinates[1]];
    if (square === 'O' || square === 'X') {
      return false;
    } else if (square !== null) {
      const shipId = square;
      board[coordinates[0]][coordinates[1]] = 'O';
      fleet[shipId].ship.hit();
      if (fleet[shipId].ship.isSunk() === true) {
        return 'sunk';
      } else {
        return 'hit';
      }
    } else {
      board[coordinates[0]][coordinates[1]] = 'X';
      return 'miss';
    }
  };

  const fleetSunk = () => {
    return fleet.every((ship) => ship.ship.isSunk() === true);
  };

  return { getBoard, placeShips, receiveAttack, fleetSunk };
}
