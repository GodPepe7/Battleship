import Ship from "./Ship";
import GameBoard from "./GameBoard";

const mockHit = jest.fn();
jest.mock("./Ship", () => {
  return jest.fn().mockImplementation(() => {
    return { hit: mockHit, isSunk: () => true, length: 1 };
  });
});

describe("gameboard tests", () => {
  let gb;
  beforeEach(() => {
    gb = GameBoard();
  });

  test("check for valid placement", () => {
    const fakeShip = { length: 2 };
    gb.placeShip(fakeShip, [0, 3], "y");
    gb.placeShip(fakeShip, [3, 0], "x");
    expect(gb.checkIfValidPlacement(5, [1, 0], "x")).toBe(false);
    expect(gb.checkIfValidPlacement(5, [5, 0], "x")).toBe(true);
    expect(gb.checkIfValidPlacement(5, [1, 0], "y")).toBe(true);
    expect(gb.checkIfValidPlacement(5, [0, 1], "y")).toBe(false);
  });

  test("place ship in gameboard", () => {
    const fakeShip = { length: 2 };
    gb.placeShip(fakeShip, [0, 0], "y");
    const board = gb.getBoard();
    expect(board[0][0]).toEqual(fakeShip);
    expect(board[1][0]).toEqual(fakeShip);
  });

  test("receiveAttack calls hit on ship", () => {
    const fakeShip = Ship(1);
    gb.placeShip(fakeShip, [0, 0], "x");
    gb.receiveAttack(0, 0);
    // tests if hit method of Ship is called once
    expect(mockHit.mock.calls.length).toEqual(1);
  });

  test("all ships are sunk", () => {
    const fakeShip = Ship(1);
    gb.placeShip(fakeShip, [0, 0], "x");
    gb.receiveAttack(0, 0);
    expect(gb.allShipsSunk()).toBe(true);
  });
});
