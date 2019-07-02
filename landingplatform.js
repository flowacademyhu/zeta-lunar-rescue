const random = (boardLength) => {
  return Math.floor(Math.random() * (boardLength - 3));
};

const platform = (board) => {
  let a = random(board.length);
  let b = random(board.length);
  while (Math.abs(a - b) < 5) {
    b = random(board.length);
  }
  const platformRow = board[board.length - 2];
  platformRow[a] = 'T';
  platformRow[a + 1] = 'T';
  platformRow[a + 2] = 'T';
  platformRow[a + 3] = 'T';
  board[board.length - 1][a + 1] = 'T';
  board[board.length - 1][a + 2] = 'T';

  platformRow[b] = 'T';
  platformRow[b + 1] = 'T';
  platformRow[b + 2] = 'T';
  platformRow[b + 3] = 'T';
  board[board.length - 1][b + 1] = 'T';
  board[board.length - 1][b + 2] = 'T';
};

module.exports = {
  platform: platform
};
