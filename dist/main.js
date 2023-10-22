/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GameLoop.js":
/*!*************************!*\
  !*** ./src/GameLoop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _model_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/Player */ \"./src/model/Player.js\");\n\nconst GameLoop = (() => {\n  const player = (0,_model_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const computer = (0,_model_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const checkIfValidPlacement = (shipLength, coords, axis) => {\n    return player.gameBoard.checkIfValidPlacement(shipLength, coords, axis);\n  };\n  const placeShip = (shipIndex, _ref, axis) => {\n    let [x, y] = _ref;\n    player.gameBoard.placeShip(player.ships[shipIndex], [x, y], axis);\n    computer.gameBoard.placeShipAtRandomCoordinate(computer.ships[shipIndex]);\n  };\n  const getShips = () => {\n    return player.ships.map(ship => ship.length);\n  };\n  const getPlayerShipPlacements = () => {\n    return player.gameBoard.getBoard();\n  };\n  const playTurn = (x, y) => {\n    if (!player.isValidAttack(x, y, computer.gameBoard)) return;\n    player.attackEnemy(x, y, computer.gameBoard);\n    computer.computerAttackEnemy(player.gameBoard);\n  };\n  const getBothAttackedFields = () => {\n    const playerAttackedFields = player.gameBoard.getAttackedFields();\n    const computerAttackedFields = computer.gameBoard.getAttackedFields();\n    return [playerAttackedFields, computerAttackedFields];\n  };\n  const checkForWinner = () => {\n    if (player.gameBoard.allShipsSunk()) return \"Computer\";else if (computer.gameBoard.allShipsSunk()) return \"Player\";\n    return;\n  };\n  return {\n    getShips,\n    getPlayerShipPlacements,\n    placeShip,\n    playTurn,\n    getBothAttackedFields,\n    checkForWinner,\n    checkIfValidPlacement\n  };\n})();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameLoop);\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/GameLoop.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _view_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/style.css */ \"./src/view/style.css\");\n/* harmony import */ var _view_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/View */ \"./src/view/View.js\");\n\n\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/index.js?");

/***/ }),

/***/ "./src/model/GameBoard.js":
/*!********************************!*\
  !*** ./src/model/GameBoard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst GameBoard = () => {\n  const BOARD_SIZE = 10;\n  const board = [];\n  const attackedFields = new Map();\n  const ships = [];\n  for (let i = 0; i < BOARD_SIZE; i++) {\n    const row = new Array(10);\n    board.push(row);\n  }\n  const getBoard = () => board;\n  const getAttackedFields = () => attackedFields;\n  const checkIfValidPlacement = (shipLength, _ref, axis) => {\n    let [x, y] = _ref;\n    if (axis === \"x\") {\n      //checks if coordinate is in bounds of 10x10 board\n      if (board[y].length - 1 < x + shipLength - 1) return false;\n      for (let i = 0; i < shipLength; i++) {\n        //checks if cell is already occupied by other ship\n        if (board[y][x + i]) return false;\n      }\n      return true;\n    } else {\n      if (board.length - 1 < y + shipLength - 1) return false;\n      for (let i = 0; i < shipLength; i++) {\n        if (board[y + i][x]) return false;\n      }\n      return true;\n    }\n  };\n  const placeShip = (ship, _ref2, axis) => {\n    let [x, y] = _ref2;\n    if (!checkIfValidPlacement(ship.length, [x, y], axis)) return;\n    ships.push(ship);\n    if (axis === \"x\") {\n      for (let i = 0; i < ship.length; i++) {\n        board[y][x + i] = ship;\n      }\n    } else {\n      for (let i = 0; i < ship.length; i++) {\n        board[y + i][x] = ship;\n      }\n    }\n  };\n  const receiveAttack = (x, y) => {\n    const attacked = board[y][x];\n    const mapCoords = y * 10 + x;\n    if (!attacked) {\n      attackedFields.set(mapCoords, false);\n    } else {\n      attacked.hit();\n      attackedFields.set(mapCoords, true);\n    }\n  };\n  const allShipsSunk = () => {\n    return ships.every(ship => ship.isSunk());\n  };\n  const generateRandomCoordinates = (shipLength, axis) => {\n    const availableCells = [];\n    for (let y = 0; y < BOARD_SIZE; y++) {\n      for (let x = 0; x < BOARD_SIZE; x++) {\n        if (checkIfValidPlacement(shipLength, [x, y], axis)) availableCells.push([x, y]);\n      }\n    }\n    const randomCoordinate = availableCells[Math.floor(Math.random() * availableCells.length - 1)];\n    return randomCoordinate;\n  };\n  const placeShipAtRandomCoordinate = ship => {\n    let axis = Math.random() > 0.5 ? \"x\" : \"y\";\n    const randomCoordinate = generateRandomCoordinates(ship.length, axis);\n    placeShip(ship, randomCoordinate, axis);\n  };\n  return {\n    getBoard,\n    checkIfValidPlacement,\n    getAttackedFields,\n    placeShip,\n    receiveAttack,\n    allShipsSunk,\n    placeShipAtRandomCoordinate\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/model/GameBoard.js?");

/***/ }),

/***/ "./src/model/Player.js":
/*!*****************************!*\
  !*** ./src/model/Player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/model/Ship.js\");\n/* harmony import */ var _GameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameBoard */ \"./src/model/GameBoard.js\");\n\n\nconst Player = () => {\n  const gameBoard = (0,_GameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  const ships = [];\n  ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(5));\n  ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(4));\n  ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3));\n  ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(3));\n  ships.push((0,_Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(2));\n  const attackEnemy = (x, y, enemyGameBoard) => {\n    enemyGameBoard.receiveAttack(x, y);\n  };\n  const computerAttackEnemy = enemyGameBoard => {\n    const attackedFields = enemyGameBoard.getAttackedFields();\n    const notAttacked = [];\n    for (let i = 0; i < 100; i++) {\n      if (!attackedFields.has(i)) notAttacked.push(i);\n    }\n    const randomIndex = Math.floor(Math.random() * notAttacked.length);\n    const attackCoordinate = notAttacked[randomIndex];\n    const attackY = Math.floor(attackCoordinate / 10);\n    const attackX = attackCoordinate - attackY * 10;\n    enemyGameBoard.receiveAttack(attackX, attackY);\n  };\n  const isValidAttack = (x, y, enemyGameBoard) => {\n    const attackedFields = enemyGameBoard.getAttackedFields();\n    const coords = y * 10 + x;\n    return !attackedFields.has(coords);\n  };\n  return {\n    gameBoard,\n    ships,\n    attackEnemy,\n    computerAttackEnemy,\n    isValidAttack\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/model/Player.js?");

/***/ }),

/***/ "./src/model/Ship.js":
/*!***************************!*\
  !*** ./src/model/Ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = len => {\n  let hits = 0;\n  const length = len;\n  const getHits = () => hits;\n  const hit = () => {\n    hits += 1;\n  };\n  const isSunk = () => length - hits <= 0;\n  return {\n    length,\n    hit,\n    isSunk,\n    getHits\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/model/Ship.js?");

/***/ }),

/***/ "./src/view/View.js":
/*!**************************!*\
  !*** ./src/view/View.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../GameLoop */ \"./src/GameLoop.js\");\n\nconst View = (() => {\n  // creates the 10x10 grid on the gameboard div\n  const playerDiv = document.querySelector(\".player-gameboard\");\n  const computerDiv = document.querySelector(\".computer-gameboard\");\n  const playerGameBoards = [playerDiv, computerDiv];\n  const gameBoardDivs = document.querySelectorAll(\".gameboard\");\n  gameBoardDivs.forEach(div => {\n    const fragment = document.createDocumentFragment();\n    for (let i = 0; i < 100; i++) {\n      const cell = document.createElement(\"div\");\n      cell.className = \"cell\";\n      cell.dataset.index = i;\n      fragment.append(cell);\n    }\n    div.append(fragment);\n  });\n  let placedCounter = 0;\n  const ships = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getShips();\n  let axis = \"x\";\n  const getCoordinateFromCell = cell => {\n    const cellIndex = cell.dataset.index;\n    const yCoordinate = Math.floor(cellIndex / 10);\n    const xCoordinate = cellIndex - yCoordinate * 10;\n    return [xCoordinate, yCoordinate];\n  };\n  const getCellsThatShipWouldOccupy = (shipLength, shipIndex) => {\n    shipIndex = parseInt(shipIndex);\n    const cells = [];\n    for (let i = 0; i < shipLength; i++) {\n      const nextOffSet = axis === \"x\" ? 1 : 10;\n      const indexCoordinate = shipIndex + i * nextOffSet;\n      const cell = gameBoardDivs[0].querySelector(`[data-index=\"${indexCoordinate}\"]`);\n      if (cell) cells.push(cell);\n    }\n    return cells;\n  };\n  const highlightCells = currentCell => {\n    const currentShip = ships[placedCounter];\n    const coordinates = getCoordinateFromCell(currentCell);\n    const isValid = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].checkIfValidPlacement(currentShip, coordinates, axis);\n    if (isValid) {\n      const cells = getCellsThatShipWouldOccupy(currentShip, currentCell.dataset.index);\n      cells.forEach(cell => {\n        cell.classList.toggle(\"valid\", true);\n      });\n    } else {\n      currentCell.classList.toggle(\"invalid\", true);\n    }\n  };\n  const unHighlightCells = currentCell => {\n    const currentShip = ships[placedCounter];\n    const cells = getCellsThatShipWouldOccupy(currentShip, currentCell.dataset.index);\n    cells.forEach(cell => {\n      cell.classList.toggle(\"valid\", false);\n      cell.classList.toggle(\"invalid\", false);\n    });\n  };\n  const changeAxis = e => {\n    if (e.code === \"ShiftLeft\") {\n      const cell = gameBoardDivs[0].querySelector(\".valid, .invalid\");\n      unHighlightCells(cell);\n      axis = axis === \"x\" ? \"y\" : \"x\";\n      highlightCells(cell);\n    }\n  };\n  const mouseOverHandler = e => {\n    gameBoardDivs[0].focus();\n    let currentCell = e.target.closest(\".cell\");\n    if (placedCounter === ships.length || !currentCell) return;\n    highlightCells(currentCell);\n    gameBoardDivs[0].addEventListener(\"keydown\", changeAxis);\n  };\n  gameBoardDivs[0].addEventListener(\"mouseover\", mouseOverHandler);\n  const mouseOutHandler = e => {\n    if (placedCounter === ships.length) return;\n    let currentCell = e.target.closest(\".cell\");\n    if (!currentCell) return;\n    const currentShip = ships[placedCounter];\n    const coordinates = getCoordinateFromCell(currentCell);\n    const isValid = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].checkIfValidPlacement(currentShip, coordinates, axis);\n    unHighlightCells(currentCell);\n    gameBoardDivs[0].removeEventListener(\"keydown\", changeAxis);\n  };\n  gameBoardDivs[0].addEventListener(\"mouseout\", mouseOutHandler);\n  const updateShipPlacementsOnBoard = () => {\n    const shipPlacements = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getPlayerShipPlacements();\n    shipPlacements.forEach((row, yCoordinate) => {\n      for (let xCoordinate = 0; xCoordinate < row.length; xCoordinate++) {\n        if (!row[xCoordinate]) continue;\n        const indexCoordinate = yCoordinate * 10 + xCoordinate;\n        const placementBoardCell = gameBoardDivs[0].querySelector(`[data-index=\"${indexCoordinate}\"]`);\n        const gameBoardCell = gameBoardDivs[1].querySelector(`[data-index=\"${indexCoordinate}\"]`);\n        placementBoardCell.classList.add(\"placed\");\n        gameBoardCell.classList.add(\"placed\");\n      }\n    });\n  };\n  const placeShip = e => {\n    const currentCell = e.target.closest(\".cell\");\n    const isNotValid = currentCell.classList.contains(\"invalid\");\n    if (!currentCell) return;\n    if (isNotValid) return;\n    const coordinates = getCoordinateFromCell(currentCell);\n    _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].placeShip(placedCounter, coordinates, axis);\n    unHighlightCells(currentCell);\n    placedCounter++;\n    updateShipPlacementsOnBoard();\n    if (placedCounter === 5) {\n      //clean up\n      gameBoardDivs[0].removeEventListener(\"click\", placeShip);\n      gameBoardDivs[0].removeEventListener(\"mouseover\", mouseOverHandler);\n      gameBoardDivs[0].removeEventListener(\"mouseout\", mouseOutHandler);\n      document.querySelector(\".play-screen\").style.display = \"flex\";\n      document.querySelector(\".placement-screen\").style.display = \"none\";\n    }\n  };\n  gameBoardDivs[0].addEventListener(\"click\", placeShip);\n  const updateGameBoard = () => {\n    const attackedFields = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getBothAttackedFields();\n    attackedFields.forEach((currentAttackedField, index) => {\n      const currentGameBoardDiv = playerGameBoards[index];\n      currentAttackedField.forEach((isHit, coordinates) => {\n        const cell = currentGameBoardDiv.querySelector(`[data-index=\"${coordinates}\"]`);\n        if (isHit) cell.style.backgroundColor = \"green\";else cell.style.backgroundColor = \"red\";\n      });\n    });\n  };\n\n  // attack enemy on click\n  const attackEnemy = e => {\n    const cell = e.target;\n    if (!cell) return;\n    const coordinateY = Math.floor(cell.dataset.index / 10);\n    const coordinateX = cell.dataset.index - coordinateY * 10;\n    _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].playTurn(coordinateX, coordinateY);\n    updateGameBoard();\n  };\n  playerGameBoards[1].addEventListener(\"click\", attackEnemy);\n  const checkForGameOver = () => {\n    const winner = _GameLoop__WEBPACK_IMPORTED_MODULE_0__[\"default\"].checkForWinner();\n    if (winner) {\n      playerGameBoards.forEach(gameBoardDiv => {\n        gameBoardDiv.removeEventListener(\"click\", attackEnemy);\n        gameBoardDiv.removeEventListener(\"click\", checkForGameOver);\n      });\n      alert(`Game Over! Winner is ${winner}`);\n    }\n  };\n  playerGameBoards[1].addEventListener(\"click\", checkForGameOver);\n})();\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/view/View.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/view/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/view/style.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    background-color: rgb(42, 102, 255);\n}\n\n.main {\n    width: 100vw;\n    height: 100vh;\n    padding: 25px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.placement-container {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n}\n\n.gameboard {\n    flex: 1;\n    aspect-ratio: 1 / 1;\n    min-width: 400px;\n    display: grid;\n    gap: 1px;\n    grid-template-rows: repeat(10, 1fr);\n    grid-template-columns: repeat(10, 1fr);\n}\n\n.boards-container {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 50px;\n    justify-content: center;\n    align-items: center;\n}\n\n.play-screen {\n    display: none;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 25px;\n}\n\n.board {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    gap: 10px;\n}\n\n.cell {\n    border: 1px solid white;\n}\n\n.computer-gameboard > .cell:hover {\n    background-color: rgba(255, 255, 255, 0.576);\n    cursor: pointer;\n}\n\n.cell.placed {\n    background-color: rgba(29, 232, 29, 0.881)\n}\n\n.cell.valid {\n    cursor: pointer;\n    background-color: rgba(81, 225, 81, 0.576)\n}\n\n.cell.invalid {\n    cursor: pointer;\n    background-color: rgba(225, 81, 81, 0.576)\n}\n\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/view/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/view/style.css":
/*!****************************!*\
  !*** ./src/view/style.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/view/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://webpack-babel-jest-template/./src/view/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://webpack-babel-jest-template/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;