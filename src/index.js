class Ship {
  constructor(length, hit = 0, sunk = false) {
    this.length = length;
    this.hit = hit;
    this.sunk = sunk;
  }
}

function hit (ship) {
  ship.hit++;
  return ship;
}

const emptyShip = new Ship()
const shipHit = new Ship();
shipHit.sunk = true;


export {emptyShip, shipHit, hit};