const spaceShipLeft = (arr, startI) => {
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

const spaceShipRight = (arr, startI) => {
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

const spaceShipLand = (arr, startI) => {
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

// let szamlalo = 0;

/* const main = () => {
    var interval = setInterval(function () {
      console.clear();
      szamlalo++;
      spaceShipLand(board);
      matrixKiiratas(board);
      console.log('Szamlalo:', szamlalo);
    }, 600);
  };

  main(); */

module.exports = {
  MCounter,
  spaceShipLand,
  spaceShipLeft,
  spaceShipRight,
  motherShipSearchI,
  motherShipSearchJ
};
