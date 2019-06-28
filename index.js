const mothership = require('./mothership');
let createBoard = require('./array.js');
let asteroid = require('./asteroids.js');
let spaceship = require('./spaceship-landing.js');

const BOARD_SIZE = 40;
const MAX_ASTEROID = 8;
let board = createBoard.fill2DArray(createBoard.generate2d(BOARD_SIZE));
let iteration = 0;
let gameStart = false;

mothership.init(board);

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit();
  } else if (key1 === 's' && gameStart === false) {
    let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
    let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
    board[startI][startJ] = 'S';
    gameStart = true;
  } else if (key1 === 'a') {
    spaceship.spaceShipLeft(board, mothership.mothershipHeight);
  } else if (key1 === 'd') {
    spaceship.spaceShipRight(board, mothership.mothershipHeight);
  }
});

board[5][2] = 7;
board[7][5] = 7;
board[10][16] = 7;
board[6][2] = 'X';
board[8][5] = 'X';
board[11][16] = 'X';

const main = () => {
  setInterval(function () {
    console.clear();

    iteration++;
    spaceship.spaceShipLand(board, mothership.mothershipHeight);
    asteroid.asteroidLeft(board, BOARD_SIZE, MAX_ASTEROID);
    mothership.move(board, BOARD_SIZE);
    if (iteration % 2 === 0) {
      asteroid.asteroidRight(board);
    }
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
  }, 200);
};

main();
