const constanses = require('./constanses');

const spaceShipFly = (board, finishTarget1, finishTarget2, finishTarget3, mothershipCount) => {
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
  } else if (indI === 1 && indJ !== finishTarget1 && indJ !== finishTarget2 && indJ !== finishTarget3 && mothershipCount % 2 !== 0) {
    board[indI - 1][indJ] = constanses.EXPLOSION;
    board[indI][indJ] = constanses.BACKGROUND;
  } else if (indI === 1 && indJ !== finishTarget1 && indJ !== finishTarget2 && mothershipCount % 2 === 0) {
    board[indI - 1][indJ] = constanses.EXPLOSION;
    board[indI][indJ] = constanses.BACKGROUND;
  } else if (indI === 1 && (indJ === finishTarget1 || indJ === finishTarget2 || indJ === finishTarget3) && mothershipCount % 2 !== 0) {
    board[indI][indJ] = constanses.BACKGROUND;
  } else if (indI === 1 && (indJ === finishTarget1 || indJ === finishTarget2) && mothershipCount % 2 === 0) {
    board[indI][indJ] = constanses.BACKGROUND;
  }
};

module.exports = {
  spaceShipFly
};
