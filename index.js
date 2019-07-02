const mothership = require('./mothership');
let createBoard = require('./array.js');
let asteroid = require('./asteroids.js');
let spaceship = require('./spaceship-landing.js');
let { platform } = require('./landingplatform');

const BOARD_SIZE = 50;
const MAX_ASTEROID = 8;
let board = createBoard.fill2DArray(createBoard.generate2d(BOARD_SIZE));
let iteration = 0;

mothership.init(board);
platform(board);
let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
board[startI][startJ] = 'S';

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit();
  } else if (key1 === 'a') {
    spaceship.spaceShipLeft(board, startI);
  } else if (key1 === 'd') {
    spaceship.spaceShipRight(board, startI);
  }
});

board[15][12] = 7;
board[17][15] = 7;
board[10][16] = 7;
board[6][2] = 'X';
board[18][15] = 'X';
board[21][25] = 'X';

const main = () => {
  setInterval(function () {
    console.clear();

    iteration++;
    spaceship.spaceShipLand(board, startI);
    asteroid.asteroidLeft(board, BOARD_SIZE, MAX_ASTEROID);
    mothership.move(board, BOARD_SIZE);
    if (iteration % 2 === 0) {
      asteroid.asteroidRight(board, BOARD_SIZE, MAX_ASTEROID);
    }
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
  }, 200);
};

main();
