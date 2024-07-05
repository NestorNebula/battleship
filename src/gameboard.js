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

  return { getBoard };
}
