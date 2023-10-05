const Gameboard = () => {
  const board = [];
  const attackedFields = new Map();
  const ships = [];
  for (let i = 0; i < 10; i++) {
    const row = new Array(10);
    board.push(row);
  }
  const getBoard = () => board;
  const getAttackedFields = () => attackedFields;
  const placeShip = (ship, x, y) => {
    ships.push(ship);
    board[y][x] = ship;
  };
  const receiveAttack = (x, y) => {
    const attacked = board[y][x];
    const mapCoords = x * 10 + y;
    if (!attacked) board[y][x] = attackedFields.set(mapCoords, false);
    else {
      attacked.hit();
      attackedFields.set(mapCoords, true);
    }
  };
  const allShipsSunk = () => {
    ships.forEach((ship) => {
      if (!ship.isSunk()) return false;
    });
    return true;
  };
  return {
    getBoard,
    getAttackedFields,
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
};

export default Gameboard;
