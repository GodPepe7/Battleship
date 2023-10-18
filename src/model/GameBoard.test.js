import Ship from "./Ship";
import GameBoard from "./GameBoard";

const mockHit = jest.fn();
jest.mock("./Ship", () => {
  return jest.fn().mockImplementation(() => {
    return { hit: mockHit, isSunk: () => true };
  });
});

describe("gameboard tests", () => {
  let gb;
  beforeEach(() => {
    gb = GameBoard();
  });

  test("place ship in gameboard", () => {
    const newShip = { dummy: "dummy" };
    gb.placeShip(newShip, [
      [0, 0],
      [0, 1],
    ]);
    const board = gb.getBoard();
    expect(board[0][0]).toEqual(newShip);
    expect(board[1][0]).toEqual(newShip);
  });

  test("receiveAttack calls hit on ship", () => {
    const fakeShip = Ship(3);
    gb.placeShip(fakeShip, [[0, 0]]);
    gb.receiveAttack(0, 0);
    expect(mockHit.mock.calls.length).toEqual(1);
  });

  test("all ships are sunk", () => {
    const fakeShip = Ship(1);
    gb.placeShip(fakeShip, [[0, 0]]);
    gb.receiveAttack(0, 0);
    expect(gb.allShipsSunk()).toBe(true);
  });

  test("all ships are sunk", () => {
    const fakeShip = Ship(1);
    gb.placeShip(fakeShip, [[0, 0]]);
    gb.receiveAttack(0, 0);
    expect(gb.allShipsSunk()).toBe(true);
  });
});
