const constanses = require('./constanses');

const asteroidLeft = (board, boardSize, maxAsteroid, game) => {
  let temp;
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.ASTEROID_LEFT) {
        tempArray.push(i);
        tempArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let j = tempArray.pop();
    let i = tempArray.pop();
    if (j === board[0].length - 1) {
      board[i][j] = constanses.BACKGROUND;
    } else if (board[i][j + 1] === constanses.ASTEROID_RIGHT) {
    } else if (board[i][j + 1] === constanses.SPACESHIP) {
      board[i][j] = constanses.BACKGROUND;
      board[i][j + 1] = constanses.EXPLOSION;
      game.died = 6;
      if (game.life !== 0) {
        game.life--;
      }
    } else {
      temp = board[i][j + 1];
      board[i][j + 1] = board[i][j];
      board[i][j] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][0] = constanses.ASTEROID_LEFT;
    numberOfAsteroids++;
  }
};

const asteroidRight = (board, boardSize, maxAsteroid, game) => {
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.ASTEROID_RIGHT) {
        tempArray.push(i);
        tempArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let temp;
    let j = tempArray.pop();
    let i = tempArray.pop();
    if (j === 0) {
      board[i][j] = constanses.BACKGROUND;
    } else if (board[i][j - 1] === constanses.SPACESHIP) {
      board[i][j] = constanses.BACKGROUND;
      board[i][j - 1] = constanses.EXPLOSION;
      game.died = 6;
      if (game.life !== 0) {
        game.life--;
      }
    } else {
      temp = board[i][j - 1];
      board[i][j - 1] = board[i][j];
      board[i][j] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][board[0].length - 1] = constanses.ASTEROID_RIGHT;
    numberOfAsteroids++;
  }
};

const clearEnemySpanceships = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'F' || board[i][j] === 'U' || board[i][j] === constanses.GUN) {
        board[i][j] = constanses.BACKGROUND;
      }
    }
  }
};

module.exports = {
  asteroidLeft,
  asteroidRight,
  clearEnemySpanceships
};
