export function Displayboard() {
  const playerBoard = (board, fleet, endgame = null) => {
    let domBoard;
    if (endgame) {
      domBoard = document.querySelector('.oppboardsquares');
    } else {
      domBoard = document.querySelector('.boardsquares');
    }
    domBoard.textContent = '';
    let rows = 0;
    board.forEach((row) => {
      let squares = 0;
      const domRow = document.createElement('div');
      domRow.classList.add('row');
      const rowNumber = document.createElement('div');
      rowNumber.classList.add('number');
      rowNumber.textContent = rows + 1;
      domRow.appendChild(rowNumber);
      row.forEach((square) => {
        const domSquare = document.createElement('button');
        domSquare.classList.add('square');
        domSquare.setAttribute('id', `${rows}-${squares}`);
        displaySquare(domSquare, square, 'player', fleet);
        domRow.appendChild(domSquare);
        squares += 1;
      });
      domBoard.appendChild(domRow);
      rows += 1;
    });
  };

  const opponentBoard = (board, fleet) => {
    const domBoard = document.querySelector('.oppboardsquares');
    domBoard.textContent = '';
    let rows = 0;
    board.forEach((row) => {
      let squares = 0;
      const domRow = document.createElement('div');
      domRow.classList.add('opprow');
      const rowNumber = document.createElement('div');
      rowNumber.classList.add('number');
      rowNumber.textContent = rows + 1;
      domRow.appendChild(rowNumber);
      row.forEach((square) => {
        const domSquare = document.createElement('button');
        domSquare.classList.add('oppsquare');
        domSquare.setAttribute('id', `${rows}-${squares}`);
        displaySquare(domSquare, square, 'opponent', fleet);
        domRow.appendChild(domSquare);
        squares += 1;
      });
      domBoard.appendChild(domRow);
      rows += 1;
    });
  };

  const displaySquare = (element, square, boardType, fleet) => {
    if (square.status === null && square.ship === null) {
      return;
    } else if (square.status === 'miss') {
      element.classList.add('missedsquare');
    } else if (square.status === 'hit') {
      element.classList.add('hitsquare');
      if (boardType === 'player' || fleet[square.ship].ship.isSunk() === true) {
        displayShipSquare(element, square, fleet);
      }
    } else if (boardType === 'player') {
      displayShipSquare(element, square, fleet);
    }
  };

  const displayShipSquare = (element, square, fleet) => {
    element.classList.add('shipsquare');
    const coordinates = fleet[square.ship].coordinates;
    if (fleet[square.ship].direction === 'horizontal') {
      element.classList.add('horizontal');
      if (
        coordinates[0][0] === square.coordinates[0] &&
        coordinates[0][1] === square.coordinates[1]
      ) {
        element.classList.add('horizontalroot');
      } else if (
        coordinates[coordinates.length - 1][0] === square.coordinates[0] &&
        coordinates[coordinates.length - 1][1] === square.coordinates[1]
      ) {
        element.classList.add('horizontaltail');
      }
    } else {
      element.classList.add('vertical');
      if (
        coordinates[0][0] === square.coordinates[0] &&
        coordinates[0][1] === square.coordinates[1]
      ) {
        element.classList.add('verticalroot');
      } else if (
        coordinates[coordinates.length - 1][0] === square.coordinates[0] &&
        coordinates[coordinates.length - 1][1] === square.coordinates[1]
      ) {
        element.classList.add('verticaltail');
      }
    }
  };

  const hideBoard = (actualBoard, nextBoard) => {
    actualBoard.classList.add('hidden');
    nextBoard.classList.remove('hidden');
  };

  return { playerBoard, opponentBoard, hideBoard };
}
