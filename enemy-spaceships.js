const constanses = require('./constanses');
const { clearMothership, init } = require('./mothership');
const { asteroidInit } = require('./asteroids');

const fiftyFifty = () => {
  return Math.floor(Math.random() * 2);
};

const clearAsteroids = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.ASTEROID_LEFT || board[i][j] === constanses.ASTEROID_RIGHT) {
        board[i][j] = 0;
      }
    }
  }
};

const enemySpaceships = (board, MAX_ENEMY_SPACESHIPS, boardSize, game) => {
  let temp;
  let leftSpaceshipCount = 0;
  let rightSpaceshipCount = 0;
  let tempArray = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.ENEMY_SPACESHIP_LEFT) {
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
    } else if (board[i][j + 1] === constanses.ENEMY_SPACESHIP_RIGHT) {
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

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.ENEMY_SPACESHIP_RIGHT) {
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

  let spaceshipCount = leftSpaceshipCount + rightSpaceshipCount;

  if (spaceshipCount === 0) {
    for (let index = 0; index < 3; index++) {
      let i = 2 + Math.floor(Math.random() * (boardSize - 6));
      let j = Math.floor(Math.random() * (board[0].length - 1));
      fiftyFifty() === 0 ? board[i][j] = constanses.ENEMY_SPACESHIP_LEFT : board[i][j] = constanses.ENEMY_SPACESHIP_RIGHT;
      spaceshipCount++;
    }
  }
  while (spaceshipCount < MAX_ENEMY_SPACESHIPS) {
    let i = 2 + Math.floor(Math.random() * (boardSize - 6));
    fiftyFifty() === 0 ? board[i][0] = constanses.ENEMY_SPACESHIP_LEFT : board[i][board[0].length - 1] = constanses.ENEMY_SPACESHIP_RIGHT;
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
  if (spaceshipCount > 2 && indI !== -1) { // Ha a length - 3. sorban az iterációk száma > 2, és van Spaceship
    game.gameMode = 'Fly';
  } else if (spaceshipCount > 2 && indI === -1 && game.died === 0 && game.life > 0) {
    game.gameStart = false;
    game.gameMode = 'Landing';
    clearMothership(board);
    init(board);
    spaceshipCount = 0;
    asteroidInit(board);
  } else if (spaceshipCount >= 0 && spaceshipCount <= 2 && indI === -1 && game.died === 0 && game.life > 0) {
    game.gameStart = false;
    game.gameMode = 'Landing';
    spaceshipCount = 0;
  }
};

module.exports = {
  clearAsteroids,
  enemySpaceships,
  changeGamemode
};
