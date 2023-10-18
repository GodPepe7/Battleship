import Player from "./model/Player";

const GameLoop = (() => {
  const player = Player();
  const computer = Player();
  const shipPlacements = [
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 5],
      [0, 6],
      [0, 7],
    ],
    [
      [6, 6],
      [6, 7],
    ],
  ];

  shipPlacements.forEach((shipCoords, index) => {
    computer.gameBoard.placeShip(computer.ships[index], shipCoords);
    player.gameBoard.placeShip(player.ships[index], shipCoords);
  });

  const getPlayerShipPlacements = () => {
    return shipPlacements;
  };

  const attackAndReturnAttackedFields = (x, y) => {
    player.attackEnemy(x, y, computer.gameBoard);
    computer.computerAttackEnemy(player.gameBoard);
    const playerAttackedFields = player.gameBoard.getAttackedFields();
    const computerAttackedFields = computer.gameBoard.getAttackedFields();
    return [playerAttackedFields, computerAttackedFields];
  };

  return { getPlayerShipPlacements, attackAndReturnAttackedFields };
})();

export default GameLoop;
