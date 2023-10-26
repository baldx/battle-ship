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

function placeShip(board, ship, row, col, direction) {
  const { x, y } = new Board();

  if (direction === 'H' && col + ship.length <= y) {
    for (let i = 0; i < ship.length; i++) {
      const index = (row * y) + col + i;
      board[index] = 1;
    }
  } else if (direction === 'V' && row + ship.length <= x) {
    for (let i = 0; i < ship.length; i++) {
      const index = (row + i) * y + col;
      board[index] = 1;
    }
  }
  else return 'Invalid placement';

  return board;
}

function receiveAttack (board, row, col, ship) {
  const { x, y } = new Board();
  
  let index = (row * y) + col;
  if (board[index] === 1) {
    board[index] = 2;
  } else if (board[index] === 0) board[index] = 3;

  const newShip = new Ship(ship)

  if (row >= 0 && row < x && col < y && col >= 0) {
    let shipIndex = (row * y) + col - (newShip.length - 1);

    if (newShip.direction === 'H' && shipIndex >= 0 && shipIndex < board.length) {
      newShip.hit++;

      if (newShip.hit === newShip.length) newShip.sunk = true;

    } else if (newShip.direction === 'V' && shipIndex >= 0 && shipIndex < board.length) {
      newShip.hit++;
  
      if (newShip.hit === newShip.length) newShip.sunk = true;
    }
    
    return { board, newShip };
  } 
  
  return {board, newShip: null}
}

function areShips (board) {
  for (let cell of board) {
    if (cell === 1) return true;
  }
  return false;
}

class Player {
  constructor(name, enemyBoard) {
    this.name = name;
    this.enemyBoard = enemyBoard;
  }
}

function attack(row, col) {
  if (this.enemyBoard) {
    const result = this.enemyBoard.receiveAttack(gameBoard(), row, col);
    return result;
  } else 'Game not started'
}

class ComputerPlayer extends Player {
  constructor(name, enemyBoard) {
    super(name, enemyBoard);
  }
}

function makeRandomAttack () {
  if (this.enemyBoard) {
    const row = Math.floor(Math.random() * this.enemyBoard.length);
    const col = Math.floor(Math.random() * this.enemyBoard[0].length);
    const result = this.enemyBoard.receiveAttack(row, col);
    return result;
  } else 'Game not started noob'
}

const humanPlayerBoard = gameBoard();
const AIBoard = gameBoard();

const humanPlayer = new Player("bombaclat", AIBoard);
const AIPlayer = new ComputerPlayer('Bimbiclot', humanPlayer);

const humanResult = humanPlayer.attack(0, 0);
console.log(`Human player attacked: ${humanResult}`);

const computerResult = AIPlayer.makeRandomAttack();
console.log(`Computer player attacked: ${computerResult}`);


// export {emptyShip, shipHit, hit, isSunk, gameBoard, placeShip, receiveAttack, areShips};