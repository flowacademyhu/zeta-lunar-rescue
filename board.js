const constanses = require('./constanses');
let term = require('terminal-kit').terminal;

const generateBoard = (n) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n);
  }
  return arr;
};

const fillBoard = (tomb) => {
  for (let i = 0; i < tomb.length; i++) {
    for (let j = 0; j < tomb[i].length; j++) {
      tomb[i][j] = constanses.BACKGROUND;
    }
  }
  return tomb;
};

const printMatrix = (arr) => {
  console.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === constanses.BACKGROUND) {
        term.bgBlack(' ' + ' ');
      } else if (arr[i][j] === constanses.SPACESHIP) {
        term.bgGreen(' ' + ' ');
      } else if (arr[i][j] === constanses.MOTHERSHIP) {
        term.bgYellow(' ' + ' ');
      } else if (arr[i][j] === constanses.ASTEROID_LEFT || arr[i][j] === constanses.ASTEROID_RIGHT) {
        term.bgColorRgb(210, 105, 30, '  ');
      } else if (arr[i][j] === 'U' || arr[i][j] === 'F') {
        term.bgBlue(' ' + ' ');
      } else if (arr[i][j] === constanses.EXPLOSION) {
        term.bgRed(' ' + ' ');
      } else if (arr[i][j] === 'C') {
        term.bgColorRgb(140, 13, 13, '  ');
      } else if (arr[i][j] === 'D') {
        term.bgColorRgb(66, 3, 3, '  ');
      } else if (arr[i][j] === 'P') {
        term.bgBlack();
        term.white('+' + ' ');
      } else if (arr[i][j] === 'T') {
        term.bgBrightMagenta(' ' + ' ');
      } else {
        process.stdout.write(arr[i][j] + ' ');
      }
    }
    console.log();
  }
  console.log();
  term.yellow('Life: 85');
  console.log();
};

module.exports = {
  generateBoard,
  fillBoard,
  printMatrix
};
