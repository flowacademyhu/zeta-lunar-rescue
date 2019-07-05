#!/usr/bin/env node

const mothership = require('./mothership');
const scoreboard = require('./scoreboard');
const constanses = require('./constanses');
const { gameOver } = require('./gameover');
let createBoard = require('./board');
let asteroid = require('./asteroids');
let spaceship = require('./spaceship-landing');
let spaceshipFly = require('./spaceship-fly-up');
let readline = require('readline-sync');
let enemySpaceships = require('./enemy-spaceships');
let projectiles = require('./projectiles');
let { platform } = require('./landingplatform');
let { keyPress } = require('./keypress');

let game = {
  iteration: 0,
  gameEnd: false,
  gameStart: false,
  left: false,
  right: false,
  slower: false,
  faster: false,
  gameMode: 'Landing',
  life: 5,
  score: 0,
  timeInterval: 700,
  died: 0,
  countDowner: 4,
  slowCountdowner: 2
};

let defaultGame = Object.assign({}, game);

let board = createBoard.fillBoard(createBoard.generateBoard(constanses.BOARD_SIZE));
let player = readline.question('What is your name?');

mothership.init(board);
platform(board);
asteroid.asteroidInit(board);
keyPress(board, game);

const main = () => {
  if (game.gameEnd === true) {
    scoreboard.save(player, game.score);
    process.exit();
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
    } else if (game.slower === true) {
      game.slowCountdowner = 0;
    }
    asteroid.asteroidLeft(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID, game);
    if (game.iteration % 2 === 0) {
      asteroid.asteroidRight(board, constanses.BOARD_SIZE, constanses.MAX_ASTEROID, game);
    }
  } else if (game.gameMode === 'Fly') {
    enemySpaceships.clearAsteroids(board);
    if (game.faster === true) {
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
    } else if (game.faster === false) {
      spaceshipFly.spaceShipFly(board, finishTarget1, finishTarget2, finishTarget3, spaceship.MCounter(board), game);
    }
    enemySpaceships.enemySpaceships(board, constanses.MAX_ENEMY_SPACESHIPS, constanses.BOARD_SIZE, game);
    projectiles.enemyProjectiles(board, game);
  }
  if (game.slowCountdowner < 2) {
    game.slowCountdowner++;
  }
  game.slower = false;
  game.faster = false;
  enemySpaceships.changeGamemode(board, game);
  createBoard.printMatrix(board);
  // console.log('iteration:', game.iteration);
  console.log('score: ', game.score);
  console.log('life: ', game.life);
  // console.log('Time Interval: ', game.timeInterval);
  // console.log('Gamemode:', game.gameMode);
  let time = 1000;
  const timer = () => {
    if (time > 0) {
      time -= game.timeInterval;
      setTimeout(timer, time);
    } else if (game.life > 0) {
      main();
    } else if (game.life === 0) {
      game.countDowner--;
      if (game.countDowner > 0) {
        main();
      } else {
        console.log('\n==== GAME OVER ====\n');
        scoreboard.save(player, game.score);
        gameOver(main, game, defaultGame, board);
      }
    }
  };
  timer();
};

main();
