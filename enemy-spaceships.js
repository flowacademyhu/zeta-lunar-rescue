const constanses = require('./constanses');

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
    let j = tempArray.pop();
    let i = tempArray.pop();
    if (j === board[0].length - 1) {
      board[i][j] = 0;
    } else if (board[i][j + 1] === 'F') {
    } else {
      temp = board[i][j + 1];
      board[i][j + 1] = board[i][j];
      board[i][j] = temp;
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
    let j = tempArray.pop();
    let i = tempArray.pop();
    if (j === 0) {
      board[i][j] = 0;
    } else {
      temp = board[i][j - 1];
      board[i][j - 1] = board[i][j];
      board[i][j] = temp;
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

let spaceshipCount = 0;

const changeGamemode = (board, game) => {
  let indI = -1;
  const LANDING_ROW = board.length - 3;
  if (game.died > 0) {
    game.died--;
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.SPACESHIP) {
        indI = i;
      }
    }
  }
  if (indI === LANDING_ROW) {
    spaceshipCount++;
  }
  if (spaceshipCount > 1 && indI !== -1) {
    game.gameMode = 'Fly';
  } else if (spaceshipCount > 1 && indI === -1 && game.died === 0 && game.life > 0) {
    game.gameStart = false;
    game.gameMode = 'Landing';
    spaceshipCount = 0;
    board[15][12] = constanses.ASTEROID_LEFT;
    board[17][15] = constanses.ASTEROID_LEFT;
    board[10][16] = constanses.ASTEROID_LEFT;
    board[6][2] = constanses.ASTEROID_RIGHT;
    board[18][15] = constanses.ASTEROID_RIGHT;
    board[21][25] = constanses.ASTEROID_RIGHT;
  } else if (spaceshipCount >= 0 && indI === -1 && game.died === 0 && game.life > 0) {
    game.gameStart = false;
    game.gameMode = 'Landing';
    spaceshipCount = 0;
  } /* else if (game.life > 0) {
    gameOver()
  } */
};

module.exports = {
  clearAsteroids,
  enemySpaceships,
  changeGamemode
};
