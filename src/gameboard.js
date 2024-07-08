import { Ship } from './ship';
import { Square } from './square';

export function Gameboard() {
  const createBoard = () => {
    const size = 10;
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row[j] = new Square([i, j]);
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
      isPlaced: false,
    },
    {
      ship: new Ship(4),
      coordinates: [1, 0],
      direction: 'horizontal',
      id: 1,
      isPlaced: false,
    },
    {
      ship: new Ship(3),
      coordinates: [2, 0],
      direction: 'horizontal',
      id: 2,
      isPlaced: false,
    },
    {
      ship: new Ship(3),
      coordinates: [3, 0],
      direction: 'horizontal',
      id: 3,
      isPlaced: false,
    },
    {
      ship: new Ship(2),
      coordinates: [4, 0],
      direction: 'horizontal',
      id: 4,
      isPlaced: false,
    },
  ];

  const getFleet = () => fleet;

  const placeShip = (col, row, direction) => {
    let shipId = 0;
    while (fleet[shipId].isPlaced === true) {
      if (shipId >= fleet.length) break;
      shipId += 1;
    }
    if (
      (direction === 'horizontal' &&
        col + fleet[shipId].ship.length > board.length) ||
      (direction === 'vertical' &&
        row + fleet[shipId].ship.length > board.length)
    ) {
      return false;
    }
    const shipCoordinates = [];
    for (let i = 0; i < fleet[shipId].ship.length; i++) {
      if (direction === 'horizontal') {
        shipCoordinates.push([row, col + i]);
      } else {
        shipCoordinates.push([row + i, col]);
      }
    }
    if (squaresEmpty(shipCoordinates)) {
      shipCoordinates.forEach((square) => {
        board[square[0]][square[1]].ship = shipId;
      });
      fleet[shipId].coordinates = [row, col];
      fleet[shipId].isPlaced = true;
      return true;
    } else {
      return false;
    }
  };

  const placeShips = () => {
    const board = getBoard();
    fleet.forEach((boat) => {
      const shipLength = boat.ship.length;
      const boatCoordinates = [];
      for (let i = 0; i < shipLength; i++) {
        if (boat.direction === 'horizontal') {
          boatCoordinates.push([boat.coordinates[0], boat.coordinates[1] + i]);
        } else {
          boatCoordinates.push([boat.coordinates[0] + i, boat.coordinates[1]]);
        }
      }
      if (squaresEmpty(boatCoordinates)) {
        boatCoordinates.forEach((square) => {
          board[square[0]][square[1]].ship = boat.id;
        });
      }
    });
  };

  const squaresEmpty = (coordinates) => {
    return coordinates.every(
      (square) => board[square[0]][square[1]].ship === null
    );
  };

  const receiveAttack = (coordinates) => {
    let square = board[coordinates[0]][coordinates[1]];
    if (square.status === 'hit' || square.status === 'miss') {
      return false;
    } else if (square.ship !== null) {
      const shipId = square.ship;
      board[coordinates[0]][coordinates[1]].status = 'hit';
      fleet[shipId].ship.hit();
      if (fleet[shipId].ship.isSunk() === true) {
        return 'sunk';
      } else {
        return 'hit';
      }
    } else {
      board[coordinates[0]][coordinates[1]].status = 'miss';
      return 'miss';
    }
  };

  const fleetSunk = () => {
    return fleet.every((ship) => ship.ship.isSunk() === true);
  };

  return {
    getBoard,
    getFleet,
    placeShip,
    placeShips,
    receiveAttack,
    fleetSunk,
  };
}
