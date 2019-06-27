const mothership = require('./mothership');
let createBoard = require('./array.js');
let asteroid = require('./asteroids.js');
let spaceship = require('./spaceship-landing.js');

let board = createBoard.fill2DArray(createBoard.generate2d(20, 20));
let iteration = 0;

mothership.init(board);

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
    spaceship.spaceShipLand(board, startI);
    asteroid.asteroidLeft(board);
    mothership.move(board);
    if (iteration % 2 === 0) {
      asteroid.asteroidRight(board);
    }
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
  }, 200);
};

main();
