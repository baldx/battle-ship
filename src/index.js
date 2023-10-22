class Ship {
  constructor(length, hit = 0, sunk = false, direction = 'V') {
    this.length = length;
    this.hit = hit;
    this.sunk = sunk;
    this.direction = direction;
  }
}

class Board {
  constructor(x = 10, y = 10){
    this.x = x;
    this.y = y;
  }
}

function hit (ship) {
  ship.hit++;
  return ship;
}

function isSunk(ship) {
  if (ship.length === ship.hit) return ship.sunk = true;
  else return ship.sunk = false;
}

const emptyShip = new Ship()
const shipHit = new Ship();
shipHit.sunk = true;

function placeShip(ship) {
  let length2Ship = new Ship(2);
  let length3Ship = new Ship(3);
  let length4Ship = new Ship(4);


}

const gameBoard = () => {
  let board = [];
  let rowCol = new Board()

  for (let i = 0; i < rowCol.x; i++) {
    for (let j = 0; j < rowCol.y; j++) {
      board.push(j);

      board.forEach((element, index) => {
        board[index] = 0;
      })
    }
  }
  return board;
};

export {emptyShip, shipHit, hit, isSunk, gameBoard, placeShip};