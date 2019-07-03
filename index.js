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
  slower: false,
  gameMode: 'Landing',
  life: 3,
  score: 0,
  timeInterval: 700,
  died: 0
};

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
let player = readline.question('What is your name?');
// let iteration = 0;
// let gameEnd = false;
// let gameStart = false;
// let slower = false;
// let gameMode = 'Landing';
// let life = 4;

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
    spaceship.spaceShipLeft(board, mothership.mothershipHeight, game);
  } else if (key1 === constanses.RIGHT) {
    spaceship.spaceShipRight(board, mothership.mothershipHeight, game);
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
      let finishTarget1 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
      let finishTarget2 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) - 1;
      let finishTarget3 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) + 1;
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, game);
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
    clearInterval();
    scoreboard.save(player, game.iteration);
  }
  console.clear();
  game.iteration++;
  spaceship.clearExplosions(board);
  spaceship.explosions2(board);
  spaceship.explosions(board);
  spaceshipFly.spaceshipGun(board);
  mothership.move(board, constanses.BOARD_SIZE);
  let finishTarget1 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board));
  let finishTarget2 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) - 1;
  let finishTarget3 = spaceship.motherShipSearchJ(board, spaceship.MCounter(board)) + 1;
  if (game.gameMode === 'Landing') {
    asteroid.clearEnemySpanceships(board);
    if (game.slower === true && game.iteration % 2 === 0) {
      spaceship.spaceShipLand(board, mothership.mothershipHeight, game);
      game.slower = false;
    } else if (game.slower === false && game.iteration % 1 === 0) {
      spaceship.spaceShipLand(board, mothership.mothershipHeight, game);
    }
    asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    if (game.iteration % 2 === 0) {
      asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID);
    }
  } else {
    spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
    spaceshipFly.spaceshipGun(board);
    enemySpaceships.clearAsteroids(board);
    enemySpaceships.enemySpaceships(board, constanses.MAX_ENEMY_SPACESHIPS, constanses.BOARD_SIZE);
    projectiles.enemyProjectiles(board, game);
  }

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
    } else {
      main();
    }
  };
  timer();
};

main();
