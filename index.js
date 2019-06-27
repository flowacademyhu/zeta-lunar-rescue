let stdin = process.stdin; // lekérjük a bemeneti folyamatot
stdin.setRawMode(true); // végtelen ciklus
stdin.resume();
stdin.setEncoding('utf-8'); // kódolás beállítása
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit(); // ezzel a paranccsal lép ki a programból. Fontosn, mert különben nincs kilépés!
  }
});
let createBoard = require('./array.js');
let asteroids2 = require('./asteroids.js');

let board = createBoard.fill2DArray(createBoard.generate2d(20, 20));
let iteration = 0;

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
    asteroids2.asteroidLeft(board);
    asteroids2.asteroidRight(board);
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
    /* if (iteration % 21 === 0) {
    } */
  }, 200);
};

main();
