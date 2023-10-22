const GameBoard = () => {
  const BOARD_SIZE = 10;
  const board = [];
  const attackedFields = new Map();
  const ships = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = new Array(10);
    board.push(row);
  }

  const getBoard = () => board;
  const getAttackedFields = () => attackedFields;
  const checkIfValidPlacement = (shipLength, [x, y], axis) => {
    if (axis === "x") {
      //checks if coordinate is in bounds of 10x10 board
      if (board[y].length - 1 < x + shipLength - 1) return false;
      for (let i = 0; i < shipLength; i++) {
        //checks if cell is already occupied by other ship
        if (board[y][x + i]) return false;
      }
      return true;
    } else {
      if (board.length - 1 < y + shipLength - 1) return false;
      for (let i = 0; i < shipLength; i++) {
        if (board[y + i][x]) return false;
      }
      return true;
    }
  };

  const placeShip = (ship, [x, y], axis) => {
    if (!checkIfValidPlacement(ship.length, [x, y], axis)) return;
    ships.push(ship);
    if (axis === "x") {
      for (let i = 0; i < ship.length; i++) {
        board[y][x + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[y + i][x] = ship;
      }
    }
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

  const generateRandomCoordinates = (shipLength, axis) => {
    const availableCells = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      for (let x = 0; x < BOARD_SIZE; x++) {
        if (checkIfValidPlacement(shipLength, [x, y], axis))
          availableCells.push([x, y]);
      }
    }
    const randomCoordinate =
      availableCells[Math.floor(Math.random() * availableCells.length - 1)];
    return randomCoordinate;
  };

  const placeShipAtRandomCoordinate = (ship) => {
    let axis = Math.random() > 0.5 ? "x" : "y";
    const randomCoordinate = generateRandomCoordinates(ship.length, axis);
    placeShip(ship, randomCoordinate, axis);
  };

  return {
    getBoard,
    checkIfValidPlacement,
    getAttackedFields,
    placeShip,
    receiveAttack,
    allShipsSunk,
    placeShipAtRandomCoordinate,
  };
};

export default GameBoard;
