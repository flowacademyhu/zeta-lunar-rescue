const fs = require('fs');
const { table, createStream } = require('table');

let config,
  stream;

config = {
  columnDefault: {
    width: 50
  },
  columnCount: 2,
  columns: {
    0: { width: 20
    },
    1: {
      width: 5
    }
  }
};

stream = createStream(config);

const generateArray = (n, m) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = ' ';
    }
  }
  return arr;
};

const save = (player, score) => {
  fs.appendFileSync('./scoreboard.txt', `${player} ${score} \n`);
  console.log('Player:', player);
  console.log('Score:', score, '\n');
  // console.log('=== Top 10 ===');
};

const topScores = (main, game, defaultGame, board, gameover) => {
  let matrix = [];
  let data = fs.readFileSync('./scoreboard.txt', 'utf8');
  const lines = data.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const parsedLine = lines[i].split(' ');
    if (parsedLine[0].length > 0 && (typeof parseInt(parsedLine[1])) !== 'NaN') {
      matrix.push([
        parsedLine[0],
        parseInt(parsedLine[1])
      ]);
    }
  }

  let n = matrix.length;
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (matrix[j][1] < matrix[j + 1][1]) {
        let temp = matrix[j][1];
        matrix[j][1] = matrix[j + 1][1];
        matrix[j + 1][1] = temp;

        let temp2 = matrix[j][0];
        matrix[j][0] = matrix[j + 1][0];
        matrix[j + 1][0] = temp2;
      }
    }
  }
  let top10 = generateArray(10, 2);
  const dislpayRowcount = matrix.length > 10 ? 10 : matrix.length;
  for (let i = 0; i < dislpayRowcount; i++) {
    top10[i][0] = matrix[i][0];
    top10[i][1] = matrix[i][1];
  }
  console.log('\n');
  console.log('  ========== TOP 10 =========');
  let i = 0;
  let interval = setInterval(() => {
    stream.write([top10[i][0], top10[i][1]]);
    if (i === 9) {
      clearInterval(interval);
      gameover(main, game, defaultGame, board);
    } else {
      i++;
    }
  }, 500);
};

module.exports = {
  save: save,
  topScores: topScores
};
