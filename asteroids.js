const asteroidLeft1 = (arr, m) => {
  let temp1 = 0;
  let temp2 = 0;
  let x = -1;
  for (let i = 0; i < arr[m].length; i++) {
    if (arr[m][i] === 7) {
      x = i;
    }
  }

  if (x === -1) {
    arr[m][0] = 7;
  } else if (x === 0) {
    arr[m][x] = 0;
    arr[m][x + 1] = 7;
  } else if (x === arr[m].length - 1) {
    arr[m][x] = 0;
  } else if (x > 0) {
    // temp = arr[x];
    arr[m][x] = 0;
    arr[m][x + 1] = 7;
  }
};

module.exports = {
  asteroidLeft1
};
