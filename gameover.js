let readline = require('readline-sync');
let { topScores } = require('./scoreboard');

const gameOver = () => {
  let question = readline.keyIn('\nWhat would you like to do? \n [1] Restart \n [2] View Scoreboard \n [3] Quit');
  if (question === '1') {
    // kell majd egy restart fgv. bástyák
  } else if (question === '3') {
    process.exit();
  } else if (question === '2') {
    topScores(gameOver);
  } else {
    gameOver();
  }
};

module.exports = {
  gameOver: gameOver
};
