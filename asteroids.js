const asteroidLeft = (arr) => {
  let temp;
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 7) {
        tempArray.push(i);
        tempArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === arr[0].length - 1) {
      arr[x][y] = 0;
    } else if (arr[x][y + 1] === 'X') {
    } else {
      temp = arr[x][y + 1];
      arr[x][y + 1] = arr[x][y];
      arr[x][y] = temp;
    }
  }
  while (numberOfAsteroids < 5) {
    let i = 2 + Math.floor(Math.random() * 14);
    arr[i][0] = 7;
    numberOfAsteroids++;
  }
};

const asteroidRight = (arr) => {
  let numberOfAsteroids = 0;
  let tempArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'X') {
        tempArray.push(i);
        tempArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (tempArray.length !== 0) {
    let temp;
    let y = tempArray.pop();
    let x = tempArray.pop();
    if (y === 0) {
      arr[x][y] = 0;
    } else {
      temp = arr[x][y - 1];
      arr[x][y - 1] = arr[x][y];
      arr[x][y] = temp;
    }
  }
  while (numberOfAsteroids < 5) {
    let i = 2 + Math.floor(Math.random() * 14);
    arr[i][arr[0].length - 1] = 'X';
    numberOfAsteroids++;
  }
};

module.exports = {
  asteroidLeft,
  asteroidRight
};
