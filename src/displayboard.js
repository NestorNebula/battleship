export function Displayboard() {
  const playerBoard = (board) => {
    const domBoard = document.querySelector('.board');
    let rows = 0;
    board.forEach((row) => {
      let squares = 0;
      const domRow = document.createElement('div');
      domRow.classList.add('row');
      row.forEach((square) => {
        const domSquare = document.createElement('button');
        domSquare.classList.add('square');
        domSquare.setAttribute('id', `${rows}-${squares}`);
        displaySquare(domSquare, square, 'player');
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

  const displaySquare = (element, square, boardType) => {
    if (square === null) {
      return;
    } else if (square === 'X') {
      element.classList.add('missedsquare');
    } else if (square === 'O') {
      element.classList.add('hitsquare');
      if (boardType === 'player') {
        element.classList.add('shipsquare');
      }
    } else if (boardType === 'player') {
      element.classList.add('shipsquare');
    }
  };

  return { playerBoard, opponentBoard };
}
