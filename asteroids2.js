const asteroidLeft1 = (arr) => {
  let numberOfAsteroids = 0;
  let segedArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 7) {
        segedArray.push(i);
        segedArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (segedArray.length !== 0) {
    let y = segedArray.pop();
    let x = segedArray.pop();
    if (y === arr[0].length - 1) {
      arr[x][y] = 0;
    } else {
      arr[x][y + 1] = arr[x][y];
      arr[x][y] = 0;
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
  let segedArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 'X') { // átirtam
        segedArray.push(i);
        segedArray.push(j);
        numberOfAsteroids++;
      }
    }
  }
  while (segedArray.length !== 0) {
    let y = segedArray.pop();
    let x = segedArray.pop();
    if (y === 0) { // átirtam
      arr[x][y] = 0;
    } else {
      arr[x][y + 1] = arr[x][y];
      arr[x][y] = 0;
    }
  }
  while (numberOfAsteroids < 5) {
    let i = 2 + Math.floor(Math.random() * 14);
    arr[i][0] = 'X'; // átirtam
    numberOfAsteroids++;
  }
};

module.exports = {
  asteroidLeft1,
  asteroidRight
};
