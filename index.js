#!/usr/bin/env node

const mothership = require('./mothership');
const scoreboard = require('./scoreboard');
const constanses = require('./constanses');
let createBoard = require('./board');
let asteroid = require('./asteroids');
let spaceship = require('./spaceship-landing');
let readline = require('readline-sync');
let enemySpaceships = require('./enemy-spaceships');

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
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
    mothership.move(board, constanses.BOARD_SIZE);
    if (gameMode === 'Landing') {
      asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
      if (iteration % 2 === 0) {
        asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
      }
    } else {
      enemySpaceships.clearAsteroids(board);
      enemySpaceships.enemySpaceships(board, constanses.MAX_ENEMY_SPACESHIPS, constanses.BOARD_SIZE);
    }

    gameMode = enemySpaceships.changeGamemode(board);

    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
    console.log('Gamemode:', gameMode);
  }, 300);
};

main();
