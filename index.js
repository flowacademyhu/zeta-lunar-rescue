let stdin = process.stdin; // lekérjük a bemeneti folyamatot
stdin.setRawMode(true); // végtelen ciklus
stdin.resume();
stdin.setEncoding('utf-8'); // kódolás beállítása
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit(); // ezzel a paranccsal lép ki a programból. Fontosn, mert különben nincs kilépés!
  }
});
let tombmuv = require('./tomb.js');
let asteroids = require('./asteroids.js');
let asteroids2 = require('./asteroids2.js');

let tomb = tombmuv.generate2d(20, 20);
let array = tombmuv.fill2DArray(tomb);
let szamlalo = 0;
let randomSzamok = [3, 6, 9];

array[5][2] = 7;
array[7][5] = 7;
array[10][16] = 7;
array[6][2] = 'X';
array[8][5] = 'X';
array[11][16] = 'X';

const main = () => {
  var interval = setInterval(function () {
    console.clear();
    szamlalo++;
    // asteroids.asteroidLeft1(array, randomSzamok[0]);
    // asteroids.asteroidLeft1(array, randomSzamok[1]);
    // asteroids.asteroidLeft1(array, randomSzamok[2]);
    asteroids2.asteroidLeft1(array);
    asteroids2.asteroidRight(array);
    tombmuv.matrixKiiratas(array);
    console.log('Szamlalo:', szamlalo);
    if (szamlalo % 21 === 0) {
      randomSzamok = tombmuv.randomSorGenerator();
    }
  }, 200);
};

main();
