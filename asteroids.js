const asteroidLeft = (board, boardSize, maxAsteroid) => {
  let temp;
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 7) {
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
      board[i][j] = 0;
    } else if (board[i][j + 1] === 'X') {
    } else {
      temp = board[i][j + 1];
      board[i][j + 1] = board[i][j];
      board[i][j] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][0] = 7;
    numberOfAsteroids++;
  }
};

const asteroidRight = (board, boardSize, maxAsteroid) => {
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 'X') {
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
      board[i][j] = 0;
    } else {
      temp = board[i][j - 1];
      board[i][j - 1] = board[i][j];
      board[i][j] = temp;
    }
  }
  while (numberOfAsteroids < maxAsteroid) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    board[i][board[0].length - 1] = 'X';
    numberOfAsteroids++;
  }
};

module.exports = {
  asteroidLeft,
  asteroidRight
};
