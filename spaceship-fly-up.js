const constanses = require('./constanses');
const { clearPlatform, platform } = require('./landingplatform');
// const { clearMothership, init } = require('./mothership');

const spaceShipFly = (board, finishTarget1, finishTarget2, finishTarget3, mothershipCount, game) => {
  let indI = -1;
  let indJ = -1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.SPACESHIP) {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > 1 && board[indI - 1][indJ] === constanses.BACKGROUND) {
    board[indI - 1][indJ] = constanses.SPACESHIP;
    board[indI][indJ] = constanses.BACKGROUND;
  } else if (indI > 1 && board[indI - 1][indJ] !== constanses.BACKGROUND) {
    board[indI - 1][indJ] = constanses.EXPLOSION;
    board[indI][indJ] = constanses.BACKGROUND;
    game.died = 6;
    if (game.life !== 0) {
      game.life--;
    }
  } else if (indI === 1 && indJ !== finishTarget1 && indJ !== finishTarget2 && indJ !== finishTarget3 && mothershipCount % 2 !== 0) {
    board[indI - 1][indJ] = constanses.EXPLOSION;
    board[indI][indJ] = constanses.BACKGROUND;
    game.died = 6;
    if (game.life !== 0) {
      game.life--;
    }
  } else if (indI === 1 && indJ !== finishTarget1 && indJ !== finishTarget2 && mothershipCount % 2 === 0) {
    board[indI - 1][indJ] = constanses.EXPLOSION;
    board[indI][indJ] = constanses.BACKGROUND;
    game.died = 6;
    if (game.life !== 0) {
      game.life--;
    }
  } else if (indI === 1 && (indJ === finishTarget1 || indJ === finishTarget2 || indJ === finishTarget3) && mothershipCount % 2 !== 0) {
    board[indI][indJ] = constanses.BACKGROUND;
    game.died = 6;
    game.score += 100;
    clearPlatform(board);
    platform(board);
    if (game.timeInterval < 900) {
      game.timeInterval = game.timeInterval + 50;
    }
  } else if (indI === 1 && (indJ === finishTarget1 || indJ === finishTarget2) && mothershipCount % 2 === 0) {
    board[indI][indJ] = constanses.BACKGROUND;
    game.died = 6;
    game.score += 100;
    clearPlatform(board);
    platform(board);
    if (game.timeInterval < 900) {
      game.timeInterval = game.timeInterval + 50;
    }
  }
};

const spaceshipSearchI = (board) => {
  let startI = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.SPACESHIP) {
        startI = i;
      }
    }
  }
  return startI;
};

const spaceshipSearchJ = (board) => {
  let startJ = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.SPACESHIP) {
        startJ = j;
      }
    }
  }
  return startJ;
};

const spaceshipGun = (board) => {
  let indI = -1;
  let indJ = -1;
  let ind = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.GUN2) {
        ind.push(i);
        ind.push(j);
      }
    }
  }
  while (ind.length !== 0) {
    indJ = ind.pop();
    indI = ind.pop();
    if (indI > 0 && board[indI - 1][indJ] === constanses.BACKGROUND) {
      board[indI][indJ] = constanses.BACKGROUND;
      board[indI - 1][indJ] = constanses.GUN2;
    } else if (indI > 0 && board[indI - 1][indJ] === constanses.MOTHERSHIP) {
      board[indI][indJ] = constanses.BACKGROUND;
    } else if (indI > 0 && board[indI - 1][indJ] !== constanses.BACKGROUND && board[indI - 1][indJ] !== constanses.MOTHERSHIP) {
      board[indI][indJ] = constanses.BACKGROUND;
      board[indI - 1][indJ] = constanses.EXPLOSION;
    } else if (indI === 0) {
      board[indI][indJ] = constanses.BACKGROUND;
    }
  }
};

const lifeLoss = (game) => {
  game.died = 6;
  if (game.life !== 0) {
    game.life--;
  }
};

module.exports = {
  spaceShipFly,
  spaceshipSearchI,
  spaceshipSearchJ,
  spaceshipGun,
  lifeLoss
};
