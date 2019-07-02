const fs = require('fs');

const save = (player, iteration) => {
  fs.appendFile('./scoreboard.txt', `${player} ${iteration} \n`, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
    process.exit();
  });
  console.log(player);
  console.log(iteration);
};

const topScores = () => {
  let matrix = [];
  let num = [];
  fs.readFile('./scoreboard.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    } else {
      const lines = data.split('\n');
      for (let i = 0; i < lines.length; i++) {
        matrix = (lines[i].split(' '));
        // console.log(matrix);
        // for (let i = 0; i < matrix.length; i++) {
        // for (let j = 0; j < matrix[i].length; j++) {
        // num = parseInt(matrix[i][1]);
        // process.stdout.write(matrix[i][j]);
      }
      // console.log();
    }
    return matrix;
  });
};

module.exports = {
  save: save,
  topScores: topScores
};
