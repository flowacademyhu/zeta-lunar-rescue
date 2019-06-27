let stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');
stdin.on('data', (key1) => {
  if (key1 === 'q') {
    process.exit();
  } else if (key1 === 'a') {
    spaceShipLeft(board);
  } else if (key1 === 'd') {
    spaceShipRight(board);
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

const fill2Dboard = (tomb) => {
  for (let i = 0; i < tomb.length; i++) {
    for (let j = 0; j < tomb[i].length; j++) {
      tomb[i][j] = 0;
    }
  }
  return tomb;
};

let board = fill2Dboard(tomb);
let randomSzamok = [3, 6, 9];

const randomSorGenerator = () => {
  let m; let n; let k;
  m = 2 + Math.floor(Math.random() * 14);
  do {
    n = 2 + Math.floor(Math.random() * 14);
  } while (m === n);

  do {
    k = 2 + Math.floor(Math.random() * 14);
  } while (m === k || k === n);

  let arr = [];
  arr.push(m);
  arr.push(n);
  arr.push(k);
  return arr;
};

const matrixKiiratas = (arr) => {
  console.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      process.stdout.write(arr[i][j] + ' ');
    }
    console.log();
  }
  console.log();
  console.log('Életeid: 85');
};

board[0][6] = 'M';
board[0][7] = 'M';
board[0][8] = 'M';
board[0][9] = 'M';
board[0][10] = 'M';

const MCounter = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'M') {
        count++;
      }
    }
  }
  return count;
};

let MCount = MCounter(board);

const motherShipSearchI = (arr) => {
  let startI = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] && arr[i][j + MCount - 1] === 'M') {
        startI = i;
      }
    }
  }
  return startI;
};

let startI = motherShipSearchI(board);

const motherShipSearchJ = (arr) => {
  let startJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] && arr[i][j + MCount - 1] === 'M') {
        startJ = j + (Math.floor(MCount / 2));
      }
    }
  }
  return startJ;
};

let startJ = motherShipSearchJ(board);

board[startI][startJ] = 'S';

const spaceShipLeft = (arr) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'S') {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > startI) {
    if (indI === arr.length - 3) {
      arr[indI][indJ] = 'S';
    } else if (indJ === 0) {
      arr[indI][indJ] = 'S';
    } else {
      arr[indI][indJ - 1] = 'S';
      arr[indI][indJ] = 0;
    }
  }
};

const spaceShipRight = (arr) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'S') {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI > startI) {
    if (indI === arr.length - 3) {
      arr[indI][indJ] = 'S';
    } else if (indJ === arr[2].length - 1) {
      arr[indI][indJ] = 'S';
    } else {
      arr[indI][indJ + 1] = 'S';
      arr[indI][indJ] = 0;
    }
  }
};

const spaceShipLand = (arr) => {
  let indI = 0;
  let indJ = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'S') {
        indI = i;
        indJ = j;
      }
    }
  }
  if (indI === arr.length - 3) {
    arr[indI][indJ] = 'S';
  } else if (indI > startI) {
    arr[indI + 1][indJ] = 'S';
    arr[indI][indJ] = 0;
  } else if (indI === startI) {
    arr[indI + 1][indJ] = 'S';
    arr[indI][indJ] = 'M';
  }
};

let szamlalo = 0;

const main = () => {
  var interval = setInterval(function () {
    console.clear();
    szamlalo++;
    spaceShipLand(board);
    matrixKiiratas(board);
    console.log('Szamlalo:', szamlalo);
  }, 600);
};

main();
