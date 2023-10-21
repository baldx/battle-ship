import {emptyShip, shipHit, hit, isSunk} from "./index.js";

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