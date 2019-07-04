const constanses = require('./constanses');

let mothershipDirection = 'right';
let mothershipHeight = 0;

const mothershipLeft = (mothershipRow) => {
  if (mothershipDirection === 'left') {
    mothershipRow.shift();
    mothershipRow.push(0);
  }
};

const fillMothership = (board) => {
  const mothershipRow = board[mothershipHeight];
  for (let i = 1; i < 6; i++) {
    mothershipRow[i] = constanses.MOTHERSHIP;
  }
};

const mothershipRight = (mothershipRow) => {
  if (mothershipDirection === 'right') {
    mothershipRow.unshift(0);
    mothershipRow.pop();
  }
};

const move = (board, boardSize) => {
  const mothershipRow = board[mothershipHeight];
  if (mothershipDirection === 'right') {
    mothershipRight(mothershipRow);
  } else {
    mothershipLeft(mothershipRow);
  }
  if (mothershipRow[boardSize - 1] === constanses.MOTHERSHIP) {
    mothershipDirection = 'left';
  }
  if (mothershipRow[0] === constanses.MOTHERSHIP) {
    mothershipDirection = 'right';
  }
};

const clearMothership = (board) => {
  const mothershipRow = board[mothershipHeight];
  for (let i = 0; i < mothershipRow.length; i++) {
    if (mothershipRow[i] === constanses.MOTHERSHIP) {
      mothershipRow[i] = constanses.BACKGROUND;
    }
  }
};

module.exports = {
  move: move,
  init: fillMothership,
  mothershipHeight,
  clearMothership
};
