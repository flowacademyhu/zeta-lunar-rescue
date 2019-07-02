const fs = require('fs');

const save = (player, iteration) => {
  fs.appendFile('./scoreboard.txt', `${player} ${iteration} \n`, function (err) {
    if (err) {
      return console.log(err);
    }
    topScores();
  });
  console.log('Player:', player);
  console.log('Score:', iteration, '\n');
  console.log('=== Top 10 ===');
};

const topScores = () => {
  let matrix = [];
  fs.readFile('./scoreboard.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    } else {
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
          }
        }
      }
      const dislpayRowcount = matrix.length > 10 ? 10 : matrix.length;
      for (let i = 0; i < dislpayRowcount; i++) {
        console.log(matrix[i][0], matrix[i][1]);
      }
    }
    process.exit();
  });
};
// topScores();
module.exports = {
  save: save,
  topScores: topScores
};
