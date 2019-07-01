const generate2d = (n) => {
  let arr = new Array(n);
  for (let i = 0; i < n; i++) {
    arr[i] = new Array(n);
  }
  return arr;
};

const fill2DArray = (tomb) => {
  for (let i = 0; i < tomb.length; i++) {
    for (let j = 0; j < tomb[i].length; j++) {
      tomb[i][j] = 0;
    }
  }
  return tomb;
};

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

const printMatrix = (arr) => {
  console.clear();
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 0) {
        process.stdout.write(' ' + ' ');
      } else {
        process.stdout.write(arr[i][j] + ' ');
      }
    }
    console.log();
  }
  console.log();
  console.log('Életeid: 85');
};

module.exports = {
  randomSorGenerator,
  generate2d,
  fill2DArray,
  printMatrix
};
