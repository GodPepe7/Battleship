import GameLoop from "../GameLoop";

const View = (() => {
  // creates the 10x10 grid on the gameboard div
  const playerDiv = document.querySelector(".player-gameboard");
  const computerDiv = document.querySelector(".computer-gameboard");
  const playerGameBoards = [playerDiv, computerDiv];
  const gameBoardDivs = document.querySelectorAll(".gameboard");
  gameBoardDivs.forEach((div) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      fragment.append(cell);
    }
    div.append(fragment);
  });

  let placedCounter = 0;
  const ships = GameLoop.getShips();
  let axis = "x";

  const getCoordinateFromCell = (cell) => {
    const cellIndex = cell.dataset.index;
    const yCoordinate = Math.floor(cellIndex / 10);
    const xCoordinate = cellIndex - yCoordinate * 10;
    return [xCoordinate, yCoordinate];
  };

  const getCellsThatShipWouldOccupy = (shipLength, shipIndex) => {
    shipIndex = parseInt(shipIndex);
    const cells = [];
    for (let i = 0; i < shipLength; i++) {
      const nextOffSet = axis === "x" ? 1 : 10;
      const indexCoordinate = shipIndex + i * nextOffSet;
      const cell = gameBoardDivs[0].querySelector(
        `[data-index="${indexCoordinate}"]`
      );
      if (cell) cells.push(cell);
    }
    return cells;
  };

  const highlightCells = (currentCell) => {
    const currentShip = ships[placedCounter];
    const coordinates = getCoordinateFromCell(currentCell);
    const isValid = GameLoop.checkIfValidPlacement(
      currentShip,
      coordinates,
      axis
    );
    if (isValid) {
      const cells = getCellsThatShipWouldOccupy(
        currentShip,
        currentCell.dataset.index
      );
      cells.forEach((cell) => {
        cell.classList.toggle("valid", true);
      });
    } else {
      currentCell.classList.toggle("invalid", true);
    }
  };

  const unHighlightCells = (currentCell) => {
    const currentShip = ships[placedCounter];
    const cells = getCellsThatShipWouldOccupy(
      currentShip,
      currentCell.dataset.index
    );
    cells.forEach((cell) => {
      cell.classList.toggle("valid", false);
      cell.classList.toggle("invalid", false);
    });
  };

  const changeAxis = (e) => {
    if (e.code === "ShiftLeft") {
      const cell = gameBoardDivs[0].querySelector(".valid, .invalid");
      unHighlightCells(cell);
      axis = axis === "x" ? "y" : "x";
      highlightCells(cell);
    }
  };

  const mouseOverHandler = (e) => {
    gameBoardDivs[0].focus();
    let currentCell = e.target.closest(".cell");
    if (placedCounter === ships.length || !currentCell) return;
    highlightCells(currentCell);
    gameBoardDivs[0].addEventListener("keydown", changeAxis);
  };
  gameBoardDivs[0].addEventListener("mouseover", mouseOverHandler);

  const mouseOutHandler = (e) => {
    if (placedCounter === ships.length) return;
    let currentCell = e.target.closest(".cell");
    if (!currentCell) return;
    const currentShip = ships[placedCounter];
    const coordinates = getCoordinateFromCell(currentCell);
    const isValid = GameLoop.checkIfValidPlacement(
      currentShip,
      coordinates,
      axis
    );
    unHighlightCells(currentCell);
    gameBoardDivs[0].removeEventListener("keydown", changeAxis);
  };
  gameBoardDivs[0].addEventListener("mouseout", mouseOutHandler);

  const updateShipPlacementsOnBoard = () => {
    const shipPlacements = GameLoop.getPlayerShipPlacements();
    shipPlacements.forEach((row, yCoordinate) => {
      for (let xCoordinate = 0; xCoordinate < row.length; xCoordinate++) {
        if (!row[xCoordinate]) continue;
        const indexCoordinate = yCoordinate * 10 + xCoordinate;
        const placementBoardCell = gameBoardDivs[0].querySelector(
          `[data-index="${indexCoordinate}"]`
        );
        const gameBoardCell = gameBoardDivs[1].querySelector(
          `[data-index="${indexCoordinate}"]`
        );
        placementBoardCell.classList.add("placed");
        gameBoardCell.classList.add("placed");
      }
    });
  };

  const placeShip = (e) => {
    const currentCell = e.target.closest(".cell");
    const isNotValid = currentCell.classList.contains("invalid");
    if (!currentCell) return;
    if (isNotValid) return;
    const coordinates = getCoordinateFromCell(currentCell);
    GameLoop.placeShip(placedCounter, coordinates, axis);
    unHighlightCells(currentCell);
    placedCounter++;
    updateShipPlacementsOnBoard();
    if (placedCounter === 5) {
      //clean up
      gameBoardDivs[0].removeEventListener("click", placeShip);
      gameBoardDivs[0].removeEventListener("mouseover", mouseOverHandler);
      gameBoardDivs[0].removeEventListener("mouseout", mouseOutHandler);
      document.querySelector(".play-screen").style.display = "flex";
      document.querySelector(".placement-screen").style.display = "none";
    }
  };
  gameBoardDivs[0].addEventListener("click", placeShip);

  const updateGameBoard = () => {
    const attackedFields = GameLoop.getBothAttackedFields();
    attackedFields.forEach((currentAttackedField, index) => {
      const currentGameBoardDiv = playerGameBoards[index];
      currentAttackedField.forEach((isHit, coordinates) => {
        const cell = currentGameBoardDiv.querySelector(
          `[data-index="${coordinates}"]`
        );
        if (isHit) cell.style.backgroundColor = "green";
        else cell.style.backgroundColor = "red";
      });
    });
  };

  // attack enemy on click
  const attackEnemy = (e) => {
    const cell = e.target;
    if (!cell) return;
    const coordinateY = Math.floor(cell.dataset.index / 10);
    const coordinateX = cell.dataset.index - coordinateY * 10;
    GameLoop.playTurn(coordinateX, coordinateY);
    updateGameBoard();
  };
  playerGameBoards[1].addEventListener("click", attackEnemy);

  const checkForGameOver = () => {
    const winner = GameLoop.checkForWinner();
    if (winner) {
      playerGameBoards.forEach((gameBoardDiv) => {
        gameBoardDiv.removeEventListener("click", attackEnemy);
        gameBoardDiv.removeEventListener("click", checkForGameOver);
      });
      alert(`Game Over! Winner is ${winner}`);
    }
  };
  playerGameBoards[1].addEventListener("click", checkForGameOver);
})();
