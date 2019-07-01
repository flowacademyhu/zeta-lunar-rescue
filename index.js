const mothership = require('./mothership');
const scoreboard = require('./scoreboard.js');
let createBoard = require('./board');
let asteroid = require('./asteroids.js');
let spaceship = require('./spaceship-landing.js');
let readline = require('readline-sync');
let enemySpaceships = require('./enemy-spaceships');

const BOARD_SIZE = 40;
const MAX_ASTEROID = 8;
const MAX_ENEMY_SPACESHIPS = 6;

let board = createBoard.fillBoard(createBoard.generateBoard(BOARD_SIZE));
let iteration = 0;
let gameStart = false;
let player = readline.question('What is your name?');
let gameMode = 'Landing';

mothership.init(board);

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    scoreboard.save(player, iteration);
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

board[15][12] = 7;
board[17][15] = 7;
board[10][16] = 7;
board[6][2] = 'X';
board[18][15] = 'X';
board[21][25] = 'X';
// board[37][0] = '4';

const main = () => {
  setInterval(function () {
    console.clear();

    iteration++;
    spaceship.spaceShipLand(board, mothership.mothershipHeight);
    mothership.move(board, BOARD_SIZE);
    if (gameMode === 'Landing') {
      asteroid.asteroidLeft(board, BOARD_SIZE, MAX_ASTEROID);
      if (iteration % 2 === 0) {
        asteroid.asteroidRight(board, BOARD_SIZE, MAX_ASTEROID);
      }
    } else {
      enemySpaceships.clearAsteroids(board);
      enemySpaceships.enemySpaceships(board, MAX_ENEMY_SPACESHIPS, BOARD_SIZE);
    }

    gameMode = enemySpaceships.changeGamemode(board);

    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
    console.log('Gamemode:', gameMode);
  }, 300);
};

main();
