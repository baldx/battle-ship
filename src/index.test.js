import { experiments } from "webpack";
import {emptyShip, shipHit, hit, isSunk, gameBoard, placeShip, receiveAttack} from "./index.js";

class Ship {
    constructor(length, hit = 0, sunk = false, direction = 'V') {
      this.length = length;
      this.hit = hit;
      this.sunk = sunk;
      this.direction = direction;
    }
  }

it('object has been called', () => {
    expect(emptyShip).toEqual({ length: undefined, hit: 0, sunk: false, direction: 'V' })
})

it('ship has sunken', () => {
    expect(shipHit).toEqual({ length: undefined, hit: 0, sunk: true, direction: 'V' })
})

it('ship has been hit', () => {
    expect(hit(emptyShip)).toEqual({ length: undefined, hit: 1, sunk: false, direction: 'V' })
})

it('ship is not sunken', () => {
    const ship = {length: 3, hit: 2, sunk: false}
    expect(isSunk(ship)).toBe(false);
})

it('ship sunk', () => {
    const ship = {length: 3, hit: 3, sunk: true, }
    expect(isSunk(ship)).toBe(true);
})

it('creates 10x10 game board', () => {
    expect(gameBoard()).toStrictEqual(
        [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
})

it('places ship on the game board vertically', () => {
    const board = gameBoard();
    const newShip = new Ship(2, 0, false, 'V');
    expect(placeShip(board, newShip, 0, 3, 'V')).toStrictEqual(
        [
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
})

it('places ship on the game board horizontally', () => {
    const board = gameBoard();
    const newShip = new Ship(3, 0, false, 'H');
    expect(placeShip(board, newShip, 0, 6, 'H')).toEqual(
        [
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
})

it('attacks a ship', () => {
    const board = gameBoard();
    const ship = new Ship(3, 0, false, 'H');
    placeShip(board, ship, 0, 6, 'H');
    let  { board: updatedBoard, newShip } = receiveAttack(board, 0, 7)
    expect(updatedBoard).toEqual([
        0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0
      ]);
});