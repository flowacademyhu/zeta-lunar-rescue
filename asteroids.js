const constanses = require('./constanses');

const asteroidLeft = (board, boardSize, maxAsteroid) => {
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
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === board[0].length - 1) {
      board[x][y] = constanses.BACKGROUND;
    } else if (board[x][y + 1] === constanses.ASTEROID_RIGHT) {
    } else {
      temp = board[x][y + 1];
      board[x][y + 1] = board[x][y];
      board[x][y] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][0] = constanses.ASTEROID_LEFT;
    numberOfAsteroids++;
  }
};

const asteroidRight = (board, boardSize, maxAsteroid) => {
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
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === 0) {
      board[x][y] = constanses.BACKGROUND;
    } else {
      temp = board[x][y - 1];
      board[x][y - 1] = board[x][y];
      board[x][y] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][board[0].length - 1] = constanses.ASTEROID_RIGHT;
    numberOfAsteroids++;
  }
};

module.exports = {
  asteroidLeft,
  asteroidRight
};
