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




const submitBtn = document.querySelector('#submit');
const input = document.querySelector('#username');
const body = document.querySelector('body');
const board = document.querySelector('.board');

const posX1 = document.querySelector('#posX1')
const posX2 = document.querySelector('#posX2')
const posX3 = document.querySelector('#posX3')

const posY1 = document.querySelector('#posY1')
const posY2 = document.querySelector('#posY2')
const posY3 = document.querySelector('#posY3')

const direction1 = document.querySelector('#direction1');
const direction2 = document.querySelector('#direction1');
const direction3 = document.querySelector('#direction1');

const submitPos = document.querySelector('#submitPos');

const boatLength3 = new Ship(3, 0, false, direction1.value);
const boatLength4 = new Ship(4, 0, false, direction2.value);
const boatLength5 = new Ship(5, 0, false, direction3.value);

const playerBoard = document.querySelectorAll('.player-cell');

console.log(playerBoard);

/* submitBtn.addEventListener('click', (e) => {
  let player = new Player(input.value, gameBoard());
  console.log(player);
  body.innerHTML = ''
  e.preventDefault();
}); */

chooseShips()

function chooseShips(board) {
  submitPos.addEventListener('click', (e) => {
    placeShip(board, boatLength3, posY1.value, posX1.value, direction1.value);
    placeShip(board, boatLength4, posY2.value, posX2.value, direction2.value);
    placeShip(board, boatLength5, posY3.value, posX3.value, direction3.value);


    e.preventDefault();
  })
}

// console.log(gameLogic(gameBoard(), 'äasdad', gameBoard()));


//export {emptyShip, shipHit, hit, isSunk, gameBoard, placeShip, receiveAttack, areShips};