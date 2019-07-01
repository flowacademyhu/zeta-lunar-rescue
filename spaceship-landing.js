const constanses = require('./constanses');

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
    if (indI + 1 === constanses.LANDING_TARGET) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === 0) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (arr[indI][indJ - 1] !== constanses.ASTEROID_LEFT && arr[indI][indJ - 1] !== constanses.ASTEROID_RIGHT) {
      arr[indI][indJ - 1] = constanses.SPACESHIP;
      arr[indI][indJ] = constanses.BACKGROUND;
    } else if (arr[indI][indJ - 1] === constanses.ASTEROID_LEFT || arr[indI][indJ - 1] === constanses.ASTEROID_RIGHT) {
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
    if (indI + 1 === constanses.LANDING_TARGET) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === arr[2].length - 1) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (arr[indI][indJ + 1] !== constanses.ASTEROID_LEFT && arr[indI][indJ + 1] !== constanses.ASTEROID_RIGHT) {
      arr[indI][indJ + 1] = constanses.SPACESHIP;
      arr[indI][indJ] = constanses.BACKGROUND;
    } else if (arr[indI][indJ + 1] === constanses.ASTEROID_LEFT || arr[indI][indJ + 1] === constanses.ASTEROID_RIGHT) {
      arr[indI][indJ + 1] = 'B';
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
  if (indI + 1 === constanses.LANDING_TARGET) {
    arr[indI][indJ] = constanses.SPACESHIP;
  } else if (indI > startI && indI < arr.length - 2 && arr[indI + 1][indJ] !== constanses.ASTEROID_LEFT && arr[indI + 1][indJ] !== constanses.ASTEROID_RIGHT && arr[indI + 1][indJ] !== constanses.LANDING_TARGET) {
    arr[indI + 1][indJ] = constanses.SPACESHIP;
    arr[indI][indJ] = constanses.BACKGROUND;
  } else if (indI > startI && (arr[indI + 1][indJ] === constanses.ASTEROID_LEFT || arr[indI + 1][indJ] === constanses.ASTEROID_RIGHT || indI === arr.length - 2)) {
    arr[indI + 1][indJ] = constanses.EXPLOSION;
    arr[indI][indJ] = constanses.BACKGROUND;
  } else if (indI === startI) {
    arr[indI + 1][indJ] = constanses.SPACESHIP;
    arr[indI][indJ] = constanses.MOTHERSHIP;
  } else if (indI + 1 === arr.length - 1) {
    arr[indI][indJ] = constanses.EXPLOSION;
  }
};

module.exports = {
  MCounter,
  spaceShipLand,
  spaceShipLeft,
  spaceShipRight,
  motherShipSearchI,
  motherShipSearchJ
};
