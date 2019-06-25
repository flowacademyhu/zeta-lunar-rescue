let stdin = process.stdin; // lekérjük a bemeneti folyamatot
stdin.setRawMode(true); // végtelen ciklus
stdin.resume();
stdin.setEncoding('utf-8'); // kódolás beállítása
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit(); // ezzel a paranccsal lép ki a programból. Fontosn, mert különben nincs kilépés!
  }
});

const generate2d = (n, m) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(m);
  }
  return arr;
};

let tomb = generate2d(20, 20);

const fill2DArray = (tomb) => {
  for (let i = 0; i < tomb.length; i++) {
    for (let j = 0; j < tomb[i].length; j++) {
      tomb[i][j] = 0;
    }
  }
  return tomb;
};

let array = fill2DArray(tomb);

let m = 13;
let n = -1;

const asteroidLeft1 = (arr) => {
  let temp1 = 0;
  let temp2 = 0;
  // if (n > 20) return ;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      temp1 = arr[m][n - 1];
      temp2 = arr[m][n];
      if (n < 20 && n > -1) { // hogy ne lógjon ki a mátrixból!
        arr[m][n] = 7;
      } /* else {
        arr[m][n] = '';
      } */
      if (n === 21) {
        arr[m][n] = '';
      }
      if (n > 1 && n < 20) {
        arr[m][n - 1] = 7; // hogy ne lógjon ki a mátrixból!
      } /* else {
        arr[m][n - 1] = '6';
      } */
      process.stdout.write(arr[i][j] + ' ');
      arr[m][n - 1] = temp1;
      arr[m][n] = temp2;
    }
    console.log();
  }
};

const main = () => {
  console.clear();
  asteroidLeft1(array);
  console.log('');
  console.log('Életeid: 85');
  n++;
  let time = 1000;
  const timer = () => {
    if (time > 0) {
      time -= 800;
      setTimeout(timer, time);
    } else {
      main();
    }
  };
  timer();
};

main();
