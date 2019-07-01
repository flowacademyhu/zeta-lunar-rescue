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
    if (indI === arr.length - 3) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === constanses.BACKGROUND) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else {
      arr[indI][indJ - 1] = constanses.SPACESHIP;
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
    if (indI === arr.length - 3) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else if (indJ === arr[2].length - 1) {
      arr[indI][indJ] = constanses.SPACESHIP;
    } else {
      arr[indI][indJ + 1] = constanses.SPACESHIP;
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
  if (indI === arr.length - 3) {
    arr[indI][indJ] = constanses.SPACESHIP;
  } else if (indI > startI) {
    arr[indI + 1][indJ] = constanses.SPACESHIP;
    arr[indI][indJ] = 0;
  } else if (indI === startI) {
    arr[indI + 1][indJ] = constanses.SPACESHIP;
    arr[indI][indJ] = constanses.MOTHERSHIP;
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
