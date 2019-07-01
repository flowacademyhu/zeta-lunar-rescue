const mothership = require('./lib/mothership');
const scoreboard = require('./lib/scoreboard');
const constanses = require('./lib/constanses');
let createBoard = require('./lib/board');
let asteroid = require('./lib/asteroids');
let spaceship = require('./lib/spaceship-landing');
let readline = require('readline-sync');

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
let iteration = 0;
let gameStart = false;
let player = readline.question('What is your name?');

mothership.init(board);

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === constanses.QUIT) {
    scoreboard.save(player, iteration);
  } else if (key1 === constanses.START && gameStart === false) {
    let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
    let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
    board[startI][startJ] = constanses.SPACESHIP;
    gameStart = true;
  } else if (key1 === constanses.LEFT) {
    spaceship.spaceShipLeft(board, mothership.mothershipHeight);
  } else if (key1 === constanses.RIGHT) {
    spaceship.spaceShipRight(board, mothership.mothershipHeight);
  }
});

board[15][12] = constanses.ASTEROID_LEFT;
board[17][15] = constanses.ASTEROID_LEFT;
board[10][16] = constanses.ASTEROID_LEFT;
board[6][2] = constanses.ASTEROID_RIGHT;
board[18][15] = constanses.ASTEROID_RIGHT;
board[21][25] = constanses.ASTEROID_RIGHT;

const main = () => {
  setInterval(function () {
    console.clear();

    iteration++;
    spaceship.spaceShipLand(board, mothership.mothershipHeight);
    asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    mothership.move(board, constanses.BOARD_SIZE);
    if (iteration % 2 === 0) {
      asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    }
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
  }, 500);
};

main();
