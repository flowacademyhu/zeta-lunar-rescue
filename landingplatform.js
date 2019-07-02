const random = (boardSize) => {
  return Math.floor(Math.random() * 37);
};

const platform = (board) => {
  const platformRow = board[board.length - 2];
  platformRow[random()] = 'T';
  for (let j = 0; j < board.length - 4; j++) {
    if (platformRow[j] === 'T') {
      platformRow[j + 1] = 'T';
      platformRow[j + 2] = 'T';
      platformRow[j + 3] = 'T';
      board[board.length - 1][j + 1] = 'T';
      board[board.length - 1][j + 2] = 'T';
      break;
    }
  }
};

module.exports = {
  platform: platform
};
