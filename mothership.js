let mothershipDirection = 'right';

const mothershipLeft = (mothershipRow) => {
  if (mothershipDirection === 'left') {
    mothershipRow.shift();
    mothershipRow.push(0);
  }
};

const fillMothership = (board) => {
  const mothershipRow = board[0];
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

const move = (board) => {
  const mothershipRow = board[0];
  if (mothershipDirection === 'right') {
    mothershipRight(mothershipRow);
  } else {
    mothershipLeft(mothershipRow);
  }
  if (mothershipRow[19] === 'M') {
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
