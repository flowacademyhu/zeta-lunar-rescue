let readline = require('readline-sync');
let { topScores } = require('./scoreboard');
let { keyPress } = require('./keypress');
let mothership = require('./mothership');
let { platform, clearPlatform } = require('./landingplatform');

const restart = (main, game, defaultGame) => {
  const keys = Object.keys(game);
  for (let i = 0; i < keys.length; i++) {
    game[keys[i]] = defaultGame[keys[i]];
  }
  main();
};

const gameOver = (main, game, defaultGame, board) => {
  let question = readline.keyIn('\nWhat would you like to do? \n [1] Restart \n [2] View Scoreboard \n [3] Quit');
  if (question === '1') {
    restart(main, game, defaultGame);
    keyPress(board, game);
    mothership.clearMothership(board);
    mothership.init(board);
    clearPlatform(board);
    platform(board);
  } else if (question === '3') {
    process.exit();
  } else if (question === '2') {
    topScores(main, game, defaultGame, board, gameOver);
  } else {
    gameOver(main, game, defaultGame, board);
  }
};

module.exports = {
  gameOver: gameOver
};
