const View = (() => {
  // creates the 10x10 grid on the gameboard div
  const gameboardDivs = document.querySelectorAll(".gameboard");
  gameboardDivs.forEach((div) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      fragment.append(cell);
    }
    div.append(fragment);
  });
})();
