import {emptyShip, shipHit, hit, isSunk, gameBoard} from "./index.js";

it('object has been called', () => {
    expect(emptyShip).toEqual({ length: undefined, hit: 0, sunk: false })
})

it('ship has sunken', () => {
    expect(shipHit).toEqual({ length: undefined, hit: 0, sunk: true })
})

it('ship has been hit', () => {
    expect(hit(emptyShip)).toEqual({ length: undefined, hit: 1, sunk: false })
})

it('ship is not sunken', () => {
    const ship = {length: 3, hit: 2, sunk: false}
    expect(isSunk(ship)).toBe(false);
})

it('ship sunk', () => {
    const ship = {length: 3, hit: 3, sunk: true}
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
    const ship = emptyShip;
    emptyShip.length = 2;
    expect(gameBoard(emptyShip)).toBe(
        [
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // [3]
        0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // [13]
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
    const ship = emptyShip;
    emptyShip.length = 3;
    expect(gameBoard(emptyShip)).toBe(
        [
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, // [6, 7, 8]
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