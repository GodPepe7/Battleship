const GameBoard = () => {
  const board = [];
  const attackedFields = new Map();
  const ships = [];
  for (let i = 0; i < 10; i++) {
    const row = new Array(10);
    board.push(row);
  }

  const getBoard = () => board;
  const getAttackedFields = () => attackedFields;
  const placeShip = (ship, coordinates) => {
    ships.push(ship);
    coordinates.forEach(([x, y]) => {
      board[y][x] = ship;
    });
  };

  const receiveAttack = (x, y) => {
    const attacked = board[y][x];
    const mapCoords = y * 10 + x;
    if (!attacked) {
      attackedFields.set(mapCoords, false);
    } else {
      attacked.hit();
      attackedFields.set(mapCoords, true);
    }
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    getBoard,
    getAttackedFields,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export default GameBoard;
