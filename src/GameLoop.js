import Player from "./model/Player";

const GameLoop = (() => {
  const player = Player();
  const computer = Player();

  const checkIfValidPlacement = (shipLength, coords, axis) => {
    return player.gameBoard.checkIfValidPlacement(shipLength, coords, axis);
  };

  const placeShip = (shipIndex, [x, y], axis) => {
    player.gameBoard.placeShip(player.ships[shipIndex], [x, y], axis);
    computer.gameBoard.placeShipAtRandomCoordinate(computer.ships[shipIndex]);
  };

  const getShips = () => {
    return player.ships.map((ship) => ship.length);
  };

  const getPlayerShipPlacements = () => {
    return player.gameBoard.getBoard();
  };

  const playTurn = (x, y) => {
    if (!player.isValidAttack(x, y, computer.gameBoard)) return;
    player.attackEnemy(x, y, computer.gameBoard);
    computer.computerAttackEnemy(player.gameBoard);
  };

  const getBothAttackedFields = () => {
    const playerAttackedFields = player.gameBoard.getAttackedFields();
    const computerAttackedFields = computer.gameBoard.getAttackedFields();
    return [playerAttackedFields, computerAttackedFields];
  };

  const checkForWinner = () => {
    if (player.gameBoard.allShipsSunk()) return "Computer";
    else if (computer.gameBoard.allShipsSunk()) return "Player";
    return;
  };

  return {
    getShips,
    getPlayerShipPlacements,
    placeShip,
    playTurn,
    getBothAttackedFields,
    checkForWinner,
    checkIfValidPlacement,
  };
})();

export default GameLoop;
