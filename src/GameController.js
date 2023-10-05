import Player from "./Player";

const GameController = (() => {
  const player = Player();
  const computer = Player();

  const checkIfUniqueCoord = (shipCoords, currentCoords) => {
    shipCoords.forEach((coordinate) => {
      if (
        coordinate[0] === currentCoords[0] &&
        coordinate[1] === currentCoords[1]
      )
        return false;
    });
    return true;
  };

  const generateValidCoordinate = (shipPlacements) => {
    const x = Math.floor(Math.random() * 9);
    const y = Math.floor(Math.random() * 9);
    return [x, y];
  };

  const generateInBoundShipCoords = (size, shipPlacements) => {
    const shipCoords = [];
    const startCoords = generateValidCoordinate(shipPlacements);
    const isHorizontal = Math.random() < 0.5;
    for (let i = 0; i < size; i++) {
      let currentCoords = [];
      if (isHorizontal) currentCoords.push(startCoords[0] + i, startCoords[1]);
      else currentCoords.push(startCoords[0], startCoords[1] + i);
      if (currentCoords[0] > 9 || currentCoords[1] > 9) {
        currentCoords = isHorizontal
          ? [currentCoords[0] - i, currentCoords[1]]
          : [currentCoords[0], currentCoords[1] - i];
      }
      if (!checkIfUniqueCoord(shipCoords, currentCoords)) {
        i = i - 1;
      } else {
        shipCoords.push(currentCoords);
      }
    }
    return shipCoords;
  };

  const generateComputerPlacements = () => {
    const computerShips = computer.ships;
    const shipPlacements = [];
    computerShips.forEach((ship) => {
      const shipCoords = generateInBoundShipCoords(ship.length, shipPlacements);
      shipPlacements.push(shipCoords);
    });
    return shipPlacements;
  };

  const placeShips = (player, shipPlacements) => {
    const playerShips = player.ships;
    const playerBoard = player.board;
    playerShips.forEach((ship, index) => {
      shipPlacements[index].forEach((shipPosition) => {
        const [x, y] = shipPosition;
        playerBoard.placeShip(ship, x, y);
      });
    });
  };

  const setUpGame = () => {
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
    const cpuShipPlacements = generateComputerPlacements();
    placeShips(player, shipPlacements);
    placeShips(computer, cpuShipPlacements);
  };

  const generateRandomAttack = () => {
    const cpuGameboard = computer.gameboard;
    const attackedFields = cpuGameboard.getAttackedFields();
    let unique = false;
    let x, y;
    do {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
      const mapCoords = x * 10 + y;
      if (!attackedFields.has(mapCoords)) unique = true;
    } while (!unique);
    return [x, y];
  };

  const makeTurn = (x, y) => {
    player.board.receiveAttack(x, y);
    const [cpuX, cpuY] = generateRandomAttack();
    computer.board.receiveAttack(cpuX, cpuY);
  };
  return { setUpGame };
})();
