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

module.exports = {
  save: save
};
