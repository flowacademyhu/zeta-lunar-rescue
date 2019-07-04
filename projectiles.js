const chance = () => {
  return Math.floor(Math.random() * 20);
};

const enemyProjectiles = (board, game) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'U' || board[i][j] === 'F') {
        if (chance() === 0) board[i + 1][j] = 'P';
      }
    }
  }
  let temp;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'P') {
        tempArray.push(i);
        tempArray.push(j);
      }
    }
  }
  while (tempArray.length !== 0) {
    let j = tempArray.pop();
    let i = tempArray.pop();
    if (i === board.length - 3) {
      board[i][j] = 0;
    } else if (board[i + 1][j] === 'S') {
      board[i + 1][j] = 'B';
      board[i][j] = 0;
      game.died = 6;
      if (game.life !== 0) {
        game.life--;
      }
    } else if (board[i + 1][j] === 'U' || board[i + 1][j] === 'F') {
      board[i][j] = 0;
    } else {
      temp = board[i + 1][j];
      board[i + 1][j] = board[i][j];
      board[i][j] = temp;
    }
  }
};

module.exports = {
  enemyProjectiles
};
