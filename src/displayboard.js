export function Displayboard() {
  const playerBoard = (board, fleet) => {
    const domBoard = document.querySelector('.board');
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

  const opponentBoard = (board) => {
    const domBoard = document.querySelector('.oppboard');
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
        displaySquare(domSquare, square, 'opponent');
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
      if (boardType === 'player') {
        displayShipSquare(element, square, fleet);
      }
    } else if (boardType === 'player') {
      displayShipSquare(element, square, fleet);
    }
  };

  const displayShipSquare = (element, square, fleet) => {
    element.classList.add('shipsquare');
    if (fleet[square.ship].direction === 'horizontal') {
      element.classList.add('horizontal');
      if (
        fleet[square.ship].coordinates.toString() ===
        square.coordinates.toString()
      ) {
        element.classList.add('shiproot');
      }
    } else {
      element.classList.add('vertical');
      if (
        fleet[square.ship].coordinates.toString() ===
        square.coordinates.toString()
      ) {
        element.classList.add('vshiproot');
      }
    }
  };

  return { playerBoard, opponentBoard };
}
