const mothership = require('./mothership');
let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit();
  }
});
let createBoard = require('./array.js');
let asteroid = require('./asteroids.js');


let board = createBoard.fill2DArray(createBoard.generate2d(20, 20));
let iteration = 0;

board[5][2] = 7;
board[7][5] = 7;
board[10][16] = 7;
board[6][2] = 'X';
board[8][5] = 'X';
board[11][16] = 'X';

mothership.init(board);


const main = () => {
  setInterval(function () {
    console.clear();

    iteration++;
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
