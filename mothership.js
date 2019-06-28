let mothershipDirection = 'right';

const mshipLeft = (mothershipRow) => {
  if (mothershipDirection === 'left') {
    mothershipRow.shift();
    mothershipRow.push(0);
  }
};

const fillMothership = (board) => {
  const mothershipRow = board[0];
  for (let i = 0; i <= 5; i++) {
    mothershipRow[i] = 'M';
  }
};

const mshipRight = (mothershipRow) => {
  if (mothershipDirection === 'right') {
    mothershipRow.unshift(0);
    mothershipRow.pop();
  }
};

const move = (board, boards) => {
  const mothershipRow = board[0];
  if (mothershipDirection === 'right') {
    mshipRight(mothershipRow);
  } else {
    mshipLeft(mothershipRow);
  }
  if (mothershipRow[boards - 1] === 'M') {
    mothershipDirection = 'left';
  }
  if (mothershipRow[0] === 'M') {
    mothershipDirection = 'right';
  }
};

module.exports = {
  move: move,
  init: fillMothership
};
