let tombmuv = require('./tomb.js');

const asteroidLeft1 = (arr) => {
  let segedArray = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 7) {
        segedArray.push(i);
        segedArray.push(j);
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
};

let tomb = [[7, 0, 7, 0, 0], [0, 7, 0, 0, 0], [0, 0, 0, 7, 0], [0, 0, 0, 0, 7], [0, 0, 0, 0, 0]];
tombmuv.matrixKiiratas(tomb);
asteroidLeft1(tomb);
tombmuv.matrixKiiratas(tomb);

module.exports = {
  asteroidLeft1
};
