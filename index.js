#!/usr/bin/env node

const mothership = require('./mothership');
const scoreboard = require('./scoreboard');
const constanses = require('./constanses');
let createBoard = require('./board');
let asteroid = require('./asteroids');
let spaceship = require('./spaceship-landing');
let spaceshipFly = require('./spaceship-fly-up');
let readline = require('readline-sync');
let enemySpaceships = require('./enemy-spaceships');
let projectiles = require('./projectiles');
let { platform } = require('./landingplatform');

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
let iteration = 0;
let gameEnd = false;
let gameStart = false;
let player = readline.question('What is your name?');
let gameMode = 'Landing';
let life = 4;

mothership.init(board);
platform(board);

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === constanses.QUIT) {
    gameEnd = true;
  } else if (key1 === constanses.START && gameStart === false) {
    let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
    let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
    board[startI][startJ] = constanses.SPACESHIP;
    gameStart = true;
  } else if (key1 === constanses.LEFT) {
    spaceship.spaceShipLeft(board, mothership.mothershipHeight);
  } else if (key1 === constanses.RIGHT) {
    spaceship.spaceShipRight(board, mothership.mothershipHeight);
  } else if (key1 === constanses.SHOOT && gameMode === 'Fly') {
    let startShootI = spaceshipFly.spaceshipSearchI(board) - 1;
    let startShootJ = spaceshipFly.spaceshipSearchJ(board);
    if (startShootI >= 0) {
      board[startShootI][startShootJ] = constanses.GUN2;
    }
  }
});

board[15][12] = constanses.ASTEROID_LEFT;
board[17][15] = constanses.ASTEROID_LEFT;
board[10][16] = constanses.ASTEROID_LEFT;
board[6][2] = constanses.ASTEROID_RIGHT;
board[18][15] = constanses.ASTEROID_RIGHT;
board[21][25] = constanses.ASTEROID_RIGHT;

const main = () => {
  let interval = setInterval(function () {
    if (gameEnd === true) {
      clearInterval(interval);
      scoreboard.save(player, iteration);
    }
    console.clear();
    iteration++;
    spaceship.clearExplosions(board);
    spaceship.explosions2(board);
    spaceship.explosions(board);
    spaceshipFly.spaceshipGun(board);
    mothership.move(board, constanses.BOARD_SIZE);
    let finishTarget1 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
    let finishTarget2 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) - 1;
    let finishTarget3 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) + 1;
    if (gameMode === 'Landing') {
      spaceship.spaceShipLand(board, mothership.mothershipHeight);
      asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
      if (iteration % 2 === 0) {
        asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
      }
    } else {
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board));
      spaceshipFly.spaceshipGun(board);
      enemySpaceships.clearAsteroids(board);
      enemySpaceships.enemySpaceships(board, constanses.MAX_ENEMY_SPACESHIPS, constanses.BOARD_SIZE);
      projectiles.enemyProjectiles(board);
    }

    gameMode = enemySpaceships.changeGamemode(board);
    createBoard.printMatrix(board);
    console.log('iteration:', iteration);
    // console.log('Gamemode:', gameMode);
  }, 300);
};

main();
