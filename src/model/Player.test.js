import Player from "./Player";

describe("player tests", () => {
  let player;
  beforeEach(() => {
    player = Player();
  });

  test("has 5 ships", () => {
    expect(player.ships.length).toBe(5);
  });

  test("ships of size 5, 4, 3, 3 and 2", () => {
    const [carrier, battleship, cruiser, submarine, destroyer] = player.ships;
    expect(carrier.length).toBe(5);
    expect(battleship.length).toBe(4);
    expect(cruiser.length).toBe(3);
    expect(submarine.length).toBe(3);
    expect(destroyer.length).toBe(2);
  });
});
