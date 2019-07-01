const fiftyFifty = () => {
  return Math.floor(Math.random() * 2);
};

const clearAsteroids = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'X' || board[i][j] === 7) {
        board[i][j] = 0;
      }
    }
  }
};

const enemySpaceships = (board, MAX_ENEMY_SPACESHIPS, boardSize) => {
  let temp;
  let leftSpaceshipCount = 0;
  let rightSpaceshipCount = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'U') {
        tempArray.push(i);
        tempArray.push(j);
        leftSpaceshipCount++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === board[0].length - 1) {
      board[x][y] = 0;
    } else if (board[x][y + 1] === 'F') {
    } else {
      temp = board[x][y + 1];
      board[x][y + 1] = board[x][y];
      board[x][y] = temp;
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'F') {
        tempArray.push(i);
        tempArray.push(j);
        rightSpaceshipCount++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === 0) {
      board[x][y] = 0;
    } else {
      temp = board[x][y - 1];
      board[x][y - 1] = board[x][y];
      board[x][y] = temp;
    }
  }

  let spaceshipCount = leftSpaceshipCount + rightSpaceshipCount;

  if (spaceshipCount === 0) {
    for (let index = 0; index < 3; index++) {
      let i = 2 + Math.floor(Math.random() * (boardSize - 6));
      let j = Math.floor(Math.random() * (board[0].length - 1));
      fiftyFifty() === 0 ? board[i][j] = 'U' : board[i][j] = 'F';
      spaceshipCount++;
    }
  }
  while (spaceshipCount < MAX_ENEMY_SPACESHIPS) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    fiftyFifty() === 0 ? board[i][0] = 'U' : board[i][board[0].length - 1] = 'F';
    spaceshipCount++;
  }
};

const changeGamemode = (board) => {
  const LANDING_ROW = board.length - 3;
  let gameMode;
  let spaceshipCount = 0;
  for (let i = 0; i < board[LANDING_ROW].length; i++) {
    if (board[LANDING_ROW][i] === 'S') {
      spaceshipCount++;
    }
  }
  if (spaceshipCount > 0) {
    gameMode = 'Fly';
  } else {
    gameMode = 'Landing';
  }
  return gameMode;
};

module.exports = {
  clearAsteroids,
  enemySpaceships,
  changeGamemode
};
