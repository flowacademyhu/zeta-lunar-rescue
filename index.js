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

let game = {
  iteration: 0,
  gameEnd: false,
  gameStart: false,
  left: false,
  right: false,
  slower: false,
  faster: false,
  gameMode: 'Landing',
  life: 1,
  score: 0,
  timeInterval: 700,
  died: 0
};

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
let player = readline.question('What is your name?');

mothership.init(board);
platform(board);

let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === constanses.QUIT) {
    game.gameEnd = true;
  } else if (key1 === constanses.START && game.gameStart === false) {
    let startI = spaceship.motherShipSearchI(board, spaceship.MCounter(board));
    let startJ = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
    board[startI][startJ] = constanses.SPACESHIP;
    game.gameStart = true;
  } else if (key1 === constanses.LEFT) {
    game.left = true;
  } else if (key1 === constanses.RIGHT) {
    game.right = true;
  } else if (key1 === constanses.SHOOT && game.gameMode === 'Fly') {
    let startShootI = spaceshipFly.spaceshipSearchI(board) - 1;
    let startShootJ = spaceshipFly.spaceshipSearchJ(board);
    if (startShootI >= 0) {
      board[startShootI][startShootJ] = constanses.GUN2;
    }
  } else if (key1 === constanses.UP) {
    if (game.gameMode === 'Landing') {
      game.slower = true;
    }
    if (game.gameMode === 'Fly') {
      game.faster = true;
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
  if (game.gameEnd === true) {
    clearTimeout();
    scoreboard.save(player, game.iteration);
  }
  console.clear();
  game.iteration++;
  spaceship.clearExplosions(board);
  spaceship.explosions2(board);
  spaceship.explosions(board);
  mothership.move(board, constanses.BOARD_SIZE);
  let finishTarget1 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
  let finishTarget2 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) - 1;
  let finishTarget3 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) + 1;
  if (game.left === true) {
    spaceship.spaceShipLeft(board, mothership.mothershipHeight, game);
    game.left = false;
  }
  if (game.right === true) {
    spaceship.spaceShipRight(board, mothership.mothershipHeight, game);
    game.right = false;
  }
  spaceshipFly.spaceshipGun(board);
  spaceshipFly.spaceshipGun(board);
  if (game.gameMode === 'Landing') {
    asteroid.clearEnemySpanceships(board);
    if (game.slower === false) {
      spaceship.spaceShipLand(board, mothership.mothershipHeight, game);
    } else if (game.slower === true && game.iteration % 2 === 0) {
      spaceship.spaceShipLand(board, mothership.mothershipHeight, game);
    }
    asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    if (game.iteration % 2 === 0) {
      asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    }
  } else if (game.gameMode === 'Fly') {
    enemySpaceships.clearAsteroids(board);
    if (game.faster === true) {
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
    } else if (game.faster === false) {
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
    }
    enemySpaceships.enemySpaceships(board, constanses.MAX_ENEMY_SPACESHIPS, constanses.BOARD_SIZE);
    projectiles.enemyProjectiles(board, game);
  }
  game.slower = false;
  game.faster = false;
  enemySpaceships.changeGamemode(board, game);
  createBoard.printMatrix(board);
  // console.log('iteration:', game.iteration);
  // console.log('score: ', game.score);
  console.log('life: ', game.life);
  console.log('Time Interval: ', game.timeInterval);
  // console.log('Gamemode:', game.gameMode);
  let time = 1000;
  const timer = () => {
    if (time > 0) {
      time -= game.timeInterval;
      setTimeout(timer, time);
    } else if (game.life > 0) {
      main();
    } else if (game.life === 0) {
      console.clear();
      console.log('game over');
      // time = 0;
    }
  };
  timer();
};

main();
