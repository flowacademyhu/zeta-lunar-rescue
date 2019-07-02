const constanses = require('./constanses');
let expl = false;

const MCounter = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === constanses.MOTHERSHIP) {
        count++;
      }
    }
  }
  return count;
};

const motherShipSearchI = (arr, MCount) => {
  let startI = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] && arr[i][j + MCount - 1] === constanses.MOTHERSHIP) {
        startI = i;
      }
    }
  }
  return startI;
};

const motherShipSearchJ = (arr, MCount) => {
  let startJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] && arr[i][j + MCount - 1] === constanses.MOTHERSHIP) {
        startJ = j + (Math.floor(MCount / 2));
      }
    }
  }
  return startJ;
};

const spaceShipLeft = (arr, startI) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === constanses.SPACESHIP) {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > startI) {
    if (arr[indI + 1][indJ] === constanses.LANDING_TARGET) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === 0) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (arr[indI][indJ - 1] === constanses.BACKGROUND) {
      arr[indI][indJ - 1] = constanses.SPACESHIP;
      arr[indI][indJ] = constanses.BACKGROUND;
    } else if (arr[indI][indJ - 1] !== constanses.BACKGROUND) {
      arr[indI][indJ - 1] = constanses.EXPLOSION;
      arr[indI][indJ] = constanses.BACKGROUND;
    }
  }
};

const spaceShipRight = (arr, startI) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === constanses.SPACESHIP) {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > startI) {
    if (arr[indI + 1][indJ] === constanses.LANDING_TARGET) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === arr[2].length - 1) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (arr[indI][indJ + 1] === constanses.BACKGROUND) {
      arr[indI][indJ + 1] = constanses.SPACESHIP;
      arr[indI][indJ] = constanses.BACKGROUND;
    } else if (arr[indI][indJ + 1] !== constanses.BACKGROUND) {
      arr[indI][indJ + 1] = constanses.EXPLOSION;
      arr[indI][indJ] = constanses.BACKGROUND;
    }
  }
};

const spaceShipLand = (arr, startI) => {
  let indI = -1;
  let indJ = -1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === constanses.SPACESHIP) {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > startI) {
    if (arr[indI + 1][indJ] === constanses.LANDING_TARGET) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indI < arr.length - 2 && arr[indI + 1][indJ] === constanses.BACKGROUND) {
      arr[indI + 1][indJ] = constanses.SPACESHIP;
      arr[indI][indJ] = constanses.BACKGROUND;
    } else if (indI === arr.length - 2 || arr[indI + 1][indJ] !== constanses.BACKGROUND) {
      arr[indI + 1][indJ] = constanses.EXPLOSION;
      arr[indI][indJ] = constanses.BACKGROUND;
    }
  } else if (indI === startI) {
    arr[indI + 1][indJ] = constanses.SPACESHIP;
    arr[indI][indJ] = constanses.MOTHERSHIP;
  }
};

const explosions = (board) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === constanses.EXPLOSION) {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI < board.length - 1 && indI > 0 && indJ < board[2].length - 1 && indJ > 0 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ - 1] = constanses.EXPLOSION;
    board[indI - 1][indJ + 1] = constanses.EXPLOSION;
    board[indI + 1][indJ - 1] = constanses.EXPLOSION;
    board[indI + 1][indJ + 1] = constanses.EXPLOSION;
    expl = true;
    // life--;
  } else if (indI === board.length - 1 && indJ > 0 && indJ < board[2].length - 1 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ - 1] = constanses.EXPLOSION;
    board[indI - 1][indJ + 1] = constanses.EXPLOSION;
    expl = true;
  } else if (indI === 0 && indJ > 0 && indJ < board[2].length - 1 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI + 1][indJ - 1] = constanses.EXPLOSION;
    board[indI + 1][indJ + 1] = constanses.EXPLOSION;
    expl = true;
  } else if (indJ === board[2].length - 1 && indI < board.length - 1 && indI > 0 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ - 1] = constanses.EXPLOSION;
    board[indI + 1][indJ - 1] = constanses.EXPLOSION;
    expl = true;
  } else if (indJ === 0 && indI < board.length - 1 && indI > 0 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ + 1] = constanses.EXPLOSION;
    board[indI + 1][indJ + 1] = constanses.EXPLOSION;
    expl = true;
  } else if (indI === board.length - 1 && indJ === 0 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ + 1] = constanses.EXPLOSION;
    expl = true;
  } else if (indI === board.length - 1 && indJ === board[2].length - 1 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI - 1][indJ - 1] = constanses.EXPLOSION;
    expl = true;
    /*   } else if (indI === 0 && indJ === 0 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI + 1][indJ + 1] = constanses.EXPLOSION;
    expl = true; */
  } else if (indI === 0 && indJ === board[2].length - 1 && expl === false) {
    board[indI][indJ] = constanses.BACKGROUND;
    board[indI + 1][indJ - 1] = constanses.EXPLOSION;
    expl = true;
  }
  return expl;
};

module.exports = {
  MCounter,
  spaceShipLand,
  spaceShipLeft,
  spaceShipRight,
  motherShipSearchI,
  motherShipSearchJ,
  explosions
};
