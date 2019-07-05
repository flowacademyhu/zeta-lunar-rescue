let spaceship = require('./spaceship-landing');
let constanses = require('./constanses');
let spaceshipFly = require('./spaceship-fly-up');

const keyPress = (board, game) => {
  let stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf-8');
  stdin.on('data', (key1) => {
    if (key1 === constanses.QUIT) {
      game.gameEnd = true;
    } else if (key1 === constanses.START && game.gameStart === false) {
      let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
      let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
      board[startI][startJ] = constanses.SPACESHIP;
      game.gameStart = true;
    } else if (key1 === constanses.LEFT) {
      game.left = true;
    } else if (key1 === constanses.RIGHT) {
      game.right = true;
    } else if (key1 === constanses.SHOOT && game.gameMode === 'Fly') {
      let startShootI = spaceshipFly.spaceshipSearchI(board) - 1;
      let startShootJ = spaceshipFly.spaceshipSearchJ(board);
      if (startShootI >= 0) {
        board[startShootI][startShootJ] = constanses.GUN2;
      }
    } else if (key1 === constanses.UP) {
      if (game.gameMode === 'Landing' && game.slowCountdowner === 2) {
        game.slower = true;
      }
      if (game.gameMode === 'Fly') {
        game.faster = true;
      }
    }
  });
};

module.exports = {
  keyPress
};
