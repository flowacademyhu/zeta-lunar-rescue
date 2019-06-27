let stdin = process.stdin; // lekérjük a bemeneti folyamatot
stdin.setRawMode(true); // végtelen ciklus
stdin.resume();
stdin.setEncoding('utf-8'); // kódolás beállítása
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit(); // ezzel a paranccsal lép ki a programból. Fontosn, mert különben nincs kilépés!
  } else if (key1 === 'a') {
    // spaceship.spaceshipLeft();
  } else if (key1 === 'd') {
    // spaceship.spaceshipRight();
  }
});
let createBoard = require('./array.js');
let asteroid = require('./asteroids.js');

let board = createBoard.fill2DArray(createBoard.generate2d(20, 20));
let iteration = 0;

board[5][2] = 7;
board[7][5] = 7;
board[10][16] = 7;
board[6][2] = 0;
board[8][5] = 0;
board[11][16] = 0;

const main = () => {
  setInterval(function () {
    console.clear();
    iteration++;
    asteroid.asteroidLeft(board);
    asteroid.asteroidRight(board);
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
    /* if (iteration % 21 === 0) {
    } */
  }, 200);
};

main();
