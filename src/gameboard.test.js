import gameboard from "./gameboard";
import ship from "./ship";

const mockHit = jest.fn();
jest.mock("./ship", () => {
  return jest.fn().mockImplementation(() => {
    return { hit: mockHit };
  });
});

describe("gameboard tests", () => {
  let gb;
  beforeEach(() => {
    gb = gameboard();
  });

  test("place ship in gameboard", () => {
    const newShip = { dummy: "dummy" };
    gb.placeShip(newShip, 0, 0);
    const board = gb.getBoard();
    expect(board[0][0]).toEqual(newShip);
  });

  test("receiveAttack calls hit on ship", () => {
    const fakeShip = ship(3);
    gb.placeShip(fakeShip, 0, 0);
    gb.receiveAttack(0, 0);
    expect(mockHit.mock.calls.length).toEqual(1);
  });
});
