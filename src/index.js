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
const startBtn = document.querySelector('#start');
const info = document.querySelector('#info');
const turn = document.querySelector('#game-turn');

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
let notDropped;

function getValidity (allBoardBlocks, isHorizontal, startIndex, ship) {
  let validStart = isHorizontal
    ? startIndex <= 100 - ship.length
      ? startIndex
      : 100 - ship.length
    : startIndex <= 100 - 10 * ship.length
    ? startIndex
    : startIndex - ship.length * 10 + 10;
  
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

  return { shipBlocks, valid, notTaken };
}



function addShipPiece (user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll("#ai-board div"); //gets all divs
  let randomBool = Math.random() < 0.5; // gets random bool 50/50 chance
  let isHorizontal = user === 'Player' ? angle === 0 : randomBool;
  let randomStartIndex = Math.floor(Math.random() * 100);

  let startIndex = startId ? startId : randomStartIndex;

  const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add("ship");
      shipBlock.classList.add("taken");
    });
  } else {
    if (user === 'AI') addShipPiece(user, ship, startId);
    if (user === 'Player') notDropped = true;
  }
}
ships.forEach(ship => addShipPiece('AI', ship));


let draggedShip;
const optionShips = Array.from(shipContainer.children);

optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart))

const allPlayerBlocks = document.querySelectorAll('#player-board div');
allPlayerBlocks.forEach(playerCell => {
  playerCell.addEventListener('dragover', dragOver);
  playerCell.addEventListener('drop', dropShip);
})

function dragStart (e) {
  notDropped = false;
  draggedShip = e.target;
}

function dragOver (e) {
  e.preventDefault();
  const ship = ships[draggedShip.id];
  highlightArea(e.target.id, ship);
}

function dropShip (e) {
  const startId = e.target.id;
  const ship = ships[draggedShip.id];
  addShipPiece('Player', ship, startId)
  if (!notDropped) {
    draggedShip.remove();
  }
}

//highlight

function highlightArea (startIndex, ship) {
  const allBoardBlocks = document.querySelectorAll('#player-board div');

  let isHorizontal = angle === 0;

  const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship);

  if (valid && notTaken) {
    shipBlocks.forEach(shipBlock => {
      shipBlock.classList.add('hover')
      setTimeout(() => shipBlock.classList.remove('hover'), 500)
    })
  }
}



let gameOver = false;
let PlayerTurn;

// start game

function startGame () {
  if (PlayerTurn === undefined) {
    if (shipContainer.children.length != 0) info.textContent = 'Place all your pieces' 
    else {
      const allBoardBlocks = document.querySelectorAll('#ai-board div'); 
      allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
      PlayerTurn = true;
      turn.textContent = 'Your go';
      info.textContent = 'Game started'
    }
  }
}

startBtn.addEventListener('click', startGame)

let playerHits = [];
let AIHits = [];
const playerSunkShips = [];
const AISunkShip = []; 

function handleClick (e) {
  if (!gameOver) {
    if (e.target.classList.contains('taken')) {
      e.target.classList.add('boom');
      info.textContent = 'You hit the AIs ship';
      let classes = Array.from(e.target.classList)

      classes.filter(className => className !== 'block');
      classes.filter(className => className !== 'boom');
      classes.filter(className => className !== 'taken');
      playerHits.push(...classes);
      checkScore('player', playerHits, playerSunkShips)
    }
    if (!e.target.classList.contains('taken')) {
      info.textContent = 'Missed hit!';
      e.target.classList.add('empty');
    }
    PlayerTurn = false;
    const allBoardBlocks = document.querySelectorAll('#ai-board div');
    allBoardBlocks.forEach(block => block.replaceWith(block.cloneNode(true))) //remove event listeners
    setTimeout(computerGo, 2000);
  }
}

//computers go

function computerGo () {
  if (!gameOver) {
    turn.textContent = 'Computers go!';
    info.textContent = 'Computer is attacking';

    setTimeout(() => {
      let randomGo = Math.floor(Math.random() * 100);

      const allBoardBlocks = document.querySelectorAll('#player-board div');
      
      if (allBoardBlocks[randomGo].classList.contains('taken') && allBoardBlocks[randomGo].classList.contains('boom')) {
        computerGo();
        return
      } else if (allBoardBlocks[randomGo].classList.contains('taken') && !allBoardBlocks[randomGo].classList.contains('boom')) {
        allBoardBlocks[randomGo].classList.add('boom');
        info.textContent = 'Computer hit your ship';
        let classes = Array.from(allBoardBlocks[randomGo].classList)

        classes.filter(className => className !== 'block');
        classes.filter(className => className !== 'boom');
        classes.filter(className => className !== 'taken');
        AIHits.push(...classes);
        checkScore('AI', AIHits, AISunkShip)
      } else {
        info.textContent = 'Nothing hit';
        allBoardBlocks[randomGo].classList.add('empty')
      }
    }, 2000)


    setTimeout(() => {
      PlayerTurn = true;
      turn.textContent = 'Players go!';
      info.textContent = 'Take your go';
      const allBoardBlocks = document.querySelectorAll('#ai-board div');
      allBoardBlocks.forEach(block => block.addEventListener('click', handleClick))
    }, 4000)
  }
}

function checkScore (user, hits, sunkShips) {

  function checkShip (name, length) {
    if (hits.filter(storedShipName => storedShipName === name).length === length) {
      if (user === 'player') {
        info.textContent = `You sunk the computer's ${name}`
        playerHits = hits.filter(storedShipName => storedShipName !== name)
      }
      if (user === 'AI') {
        info.textContent = `The computer sunk your ${name}`
        playerHits = hits.filter(storedShipName => storedShipName !== name)
      }
      sunkShips.push(name)
    }


  }

  checkShip('destroyer', 2)
  checkShip('submarine', 3)
  checkShip('cruiser', 3)
  checkShip('battleship', 4)
  checkShip('carrier', 5)

  if (playerSunkShips.length === 5) {
    info.textContent = 'You sunk all ships. You won';
    gameOver = true;
  }
  if (AISunkShip.length === 5) {
    info.textContent = 'The computer sunk all your ships. You lost! L';
    gameOver = true;
  }

}