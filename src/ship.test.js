import Ship from "./Ship";

describe("ship tests", () => {
  let newShip;
  beforeEach(() => {
    newShip = Ship(3);
  });

  test("ship length", () => {
    expect(newShip.length).toBe(3);
  });

  test("ship hit", () => {
    expect(newShip.getHits()).toBe(0);
    newShip.hit();
    expect(newShip.getHits()).toBe(1);
  });

  test("ship sunk", () => {
    expect(newShip.isSunk()).toBe(false);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });
});
