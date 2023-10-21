import {emptyShip, shipHit, hit} from "./index.js";

it('object has been called', () => {
    expect(emptyShip).toEqual({ length: undefined, hit: 0, sunk: false })
})

it('ship has sunken', () => {
    expect(shipHit).toEqual({ length: undefined, hit: 0, sunk: true })
})

it('ship has been hit', () => {
    expect(hit(emptyShip)).toEqual({ length: undefined, hit: 1, sunk: false })
})