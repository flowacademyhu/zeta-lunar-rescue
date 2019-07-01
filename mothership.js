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
  for (let i = 0; i < 5; i++) {
    mothershipRow[i] = 'M';
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
  if (mothershipRow[boardSize - 1] === 'M') {
    mothershipDirection = 'left';
  }
  if (mothershipRow[0] === 'M') {
    mothershipDirection = 'right';
  }
};

module.exports = {
  move: move,
  init: fillMothership,
  mothershipHeight
};
