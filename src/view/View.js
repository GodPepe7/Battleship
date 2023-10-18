import GameLoop from "../GameLoop";

const View = (() => {
  // creates the 10x10 grid on the gameboard div
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

  // displays the players' ships on the gameBoardDivs
  const placements = GameLoop.getPlayerShipPlacements();
  placements.forEach((ship) => {
    ship.forEach((coordinate) => {
      const index = coordinate[1] * 10 + coordinate[0];
      const cell = gameBoardDivs[0].querySelector(`[data-index="${index}"]`);
      cell.style.backgroundColor = "rgba(92, 180, 121, 0.57)";
    });
  });

  const updateGameBoard = (attackedFields) => {
    attackedFields.forEach((currentAttackedField, index) => {
      const currentGameBoardDiv = gameBoardDivs[index];
      currentAttackedField.forEach((isHit, coordinates) => {
        console.log(coordinates);
        const cell = currentGameBoardDiv.querySelector(
          `[data-index="${coordinates}"]`
        );
        console.log(isHit);
        if (isHit) cell.style.backgroundColor = "green";
        else cell.style.backgroundColor = "red";
      });
    });
  };

  // attack enemy on click
  const attackEnemy = (e) => {
    const cell = e.target;
    const coordinateY = Math.floor(cell.dataset.index / 10);
    const coordinateX = cell.dataset.index - coordinateY * 10;
    const attackedFields = GameLoop.attackAndReturnAttackedFields(
      coordinateX,
      coordinateY
    );
    updateGameBoard(attackedFields);
  };
  gameBoardDivs[1].addEventListener("click", attackEnemy);
})();
