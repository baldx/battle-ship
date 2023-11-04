import DOMStuff from "./DOM.js";

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
      const cell = board.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
      if (cell) cell.classList.add('ship'); 
      else return 'Invalid position'
    }
  } else if (direction === 'V' && row + ship.length <= x) {
    for (let i = 0; i < ship.length; i++) {
      const cell = board.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
      if (cell) cell.classList.add('ship'); 
      else return 'Invalid position';
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
  else if (board[index] === 2 || board[index] === 3) return 'Already attacked'

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
    this.enemyBoard = enemyBoard
  }
}

class AIPlayer {
  constructor(name = 'AI', enemyBoard) {
    this.name = name;
    this.enemyBoard = enemyBoard;
  }
}

function generateAttackCol () {
  let col = Math.floor(Math.random() * 11);
  return col;
}

function generateAttackRow () {
  let row = Math.floor(Math.random() * 11);
  return row;
}

function gameLogic (playerBoard, playerName, AIBoard) {

  let isRunning = true;

  const playerTest = new Player(playerName, AIBoard);
  const playerAI = new AIPlayer('AI', playerBoard);

  // playerTest.AIBoard = receiveAttack(playerBoard, 2, 2)
  // playerTest.AIBoard = receiveAttack(playerBoard, 3, 3)
  // playerAI.playerBoard = receiveAttack(AIBoard, 4, 4)


  while (isRunning) {
    for (let index in playerBoard) {
      if (index === 1) return playerBoard;
      else isRunning === false;
    } 
    
    for (let index in AIBoard) {
      if (index === '1') return AIBoard;
      else isRunning === false;
    } 
  }
}

//export {emptyShip, shipHit, hit, isSunk, gameBoard, placeShip, receiveAttack, areShips};





/*DOM move to DOM.js later*/

const flipBtn = document.querySelector('#flip');
const shipContainer = document.querySelector('.ships-container');


let angle = 0;

flipBtn.addEventListener('click', () => {
  const ships = Array.from(shipContainer.children);
  angle = angle === 0 ? 90 : 0;
  ships.forEach(ship => ship.style.transform = `rotate(${angle}deg)`)
})

const createCell = (() => {
  const playerBoard = document.querySelector('#player-board');
  const AIBoard = document.querySelector('#ai-board');
  const width = 10;

  for (let i = 0; i < width * width; i++) {
      const cell = document.createElement('div');
      cell.classList.add('player-cell');
      cell.id = i;
      playerBoard.appendChild(cell)
    }

  for (let i = 0; i < width * width; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = i;
      AIBoard.appendChild(cell)
    }
})();

class Boat {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}

const destroyer = new Boat('destroyer', 2);
const submarine = new Boat('submarine', 3);
const cruiser = new Boat('cruiser', 3);
const battleship = new Boat('battleship', 4);
const carrier = new Boat('carrier', 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];

function addShipPiece (ship) {
  const allBoardBlocks = document.querySelectorAll("#ai-board div"); //gets all divs
  let randomBool = Math.random() < 0.5; // gets random bool 50/50 chance
  let isHorizontal = randomBool;
  let randomStartIndex = Math.floor(Math.random() * 100);

  let validStart = isHorizontal
    ? randomStartIndex <= 100 - ship.length
      ? randomStartIndex
      : 100 - ship.length
    : randomStartIndex <= 100 - 10 * ship.length
    ? randomStartIndex
    : randomStartIndex - ship.length * 10 + 10;

  let shipBlocks = [];

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(validStart) + i * 10]);
    }
  }

  let valid;

  if (isHorizontal) {
    shipBlocks.every((_shipBlock, index) => {
      valid = shipBlocks[0].id % 10 !== 10 - (shipBlocks.length - (index + 1));
    });
  } else {
    shipBlocks.every((_shipBlock, index) => {
      valid = shipBlocks[0].id < 90 + (10 * index + 1);
    });
  }

  const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'))

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("ship");
      shipBlock.classList.add("taken");
    });
  } else {
    addShipPiece(ship);
  }
}


ships.forEach(ship => addShipPiece(ship));