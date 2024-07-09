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

/***/ "./src/displayboard.js":
/*!*****************************!*\
  !*** ./src/displayboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Displayboard: () => (/* binding */ Displayboard)\n/* harmony export */ });\nfunction Displayboard() {\n  const playerBoard = function (board, fleet) {\n    let endgame = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n    let domBoard;\n    if (endgame) {\n      domBoard = document.querySelector('.oppboardsquares');\n    } else {\n      domBoard = document.querySelector('.boardsquares');\n    }\n    domBoard.textContent = '';\n    let rows = 0;\n    board.forEach(row => {\n      let squares = 0;\n      const domRow = document.createElement('div');\n      domRow.classList.add('row');\n      const rowNumber = document.createElement('div');\n      rowNumber.classList.add('number');\n      rowNumber.textContent = rows + 1;\n      domRow.appendChild(rowNumber);\n      row.forEach(square => {\n        const domSquare = document.createElement('button');\n        domSquare.classList.add('square');\n        domSquare.setAttribute('id', `${rows}-${squares}`);\n        displaySquare(domSquare, square, 'player', fleet);\n        domRow.appendChild(domSquare);\n        squares += 1;\n      });\n      domBoard.appendChild(domRow);\n      rows += 1;\n    });\n  };\n  const opponentBoard = (board, fleet) => {\n    const domBoard = document.querySelector('.oppboardsquares');\n    domBoard.textContent = '';\n    let rows = 0;\n    board.forEach(row => {\n      let squares = 0;\n      const domRow = document.createElement('div');\n      domRow.classList.add('opprow');\n      const rowNumber = document.createElement('div');\n      rowNumber.classList.add('number');\n      rowNumber.textContent = rows + 1;\n      domRow.appendChild(rowNumber);\n      row.forEach(square => {\n        const domSquare = document.createElement('button');\n        domSquare.classList.add('oppsquare');\n        domSquare.setAttribute('id', `${rows}-${squares}`);\n        displaySquare(domSquare, square, 'opponent', fleet);\n        domRow.appendChild(domSquare);\n        squares += 1;\n      });\n      domBoard.appendChild(domRow);\n      rows += 1;\n    });\n  };\n  const displaySquare = (element, square, boardType, fleet) => {\n    if (square.status === null && square.ship === null) {\n      return;\n    } else if (square.status === 'miss') {\n      element.classList.add('missedsquare');\n    } else if (square.status === 'hit') {\n      element.classList.add('hitsquare');\n      if (boardType === 'player' || fleet[square.ship].ship.isSunk() === true) {\n        displayShipSquare(element, square, fleet);\n      }\n    } else if (boardType === 'player') {\n      displayShipSquare(element, square, fleet);\n    }\n  };\n  const displayShipSquare = (element, square, fleet) => {\n    element.classList.add('shipsquare');\n    const coordinates = fleet[square.ship].coordinates;\n    if (fleet[square.ship].direction === 'horizontal') {\n      element.classList.add('horizontal');\n      if (coordinates[0][0] === square.coordinates[0] && coordinates[0][1] === square.coordinates[1]) {\n        element.classList.add('horizontalroot');\n      } else if (coordinates[coordinates.length - 1][0] === square.coordinates[0] && coordinates[coordinates.length - 1][1] === square.coordinates[1]) {\n        element.classList.add('horizontaltail');\n      }\n    } else {\n      element.classList.add('vertical');\n      if (coordinates[0][0] === square.coordinates[0] && coordinates[0][1] === square.coordinates[1]) {\n        element.classList.add('verticalroot');\n      } else if (coordinates[coordinates.length - 1][0] === square.coordinates[0] && coordinates[coordinates.length - 1][1] === square.coordinates[1]) {\n        element.classList.add('verticaltail');\n      }\n    }\n  };\n  const hideBoard = (actualBoard, nextBoard) => {\n    actualBoard.classList.add('hidden');\n    nextBoard.classList.remove('hidden');\n  };\n  return {\n    playerBoard,\n    opponentBoard,\n    hideBoard\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/displayboard.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Game: () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _displayboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./displayboard */ \"./src/displayboard.js\");\n/* harmony import */ var _node_modules_dropdown_clicked_hovered__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/dropdown-clicked-hovered */ \"./node_modules/dropdown-clicked-hovered/dropdown.js\");\n\n\n\nfunction Game() {\n  const player = new _player__WEBPACK_IMPORTED_MODULE_0__.Player();\n  const computer = new _player__WEBPACK_IMPORTED_MODULE_0__.Computer();\n  const display = (0,_displayboard__WEBPACK_IMPORTED_MODULE_1__.Displayboard)();\n  const playerFleet = player.board.getFleet();\n  const computerFleet = computer.board.getFleet();\n  display.playerBoard(player.board.getBoard(), playerFleet);\n  display.opponentBoard(computer.board.getBoard(), computerFleet);\n  const playerSection = document.querySelector('.player');\n  const computerSection = document.querySelector('.opp');\n  display.hideBoard(computerSection, playerSection);\n  const helpButton = document.querySelector('.help');\n  const helpContent = document.querySelector('.helpcontent');\n  (0,_node_modules_dropdown_clicked_hovered__WEBPACK_IMPORTED_MODULE_2__.click)(helpButton, helpContent);\n  const getShipRoot = () => {\n    const btn = document.querySelector('#formbtn');\n    btn.addEventListener('click', () => {\n      const col = document.querySelector('#col');\n      const row = document.querySelector('#row');\n      const direction = document.querySelector('#direction');\n      const result = player.board.placeShip(Number(col.value), Number(row.value), direction.value);\n      if (result === true) {\n        display.playerBoard(player.board.getBoard(), playerFleet);\n        const text = document.querySelector('.pregametext');\n        text.textContent = 'Choose your ';\n        let id = Number(text.id);\n        switch (id) {\n          case 1:\n            const random = document.querySelector('#random');\n            random.classList.add('hidden');\n            text.textContent += 'Second Ship (Size: 4)';\n            break;\n          case 2:\n            text.textContent += 'Third Ship (Size: 3)';\n            break;\n          case 3:\n            text.textContent += 'Fourth Ship (Size: 3)';\n            break;\n          case 4:\n            text.textContent += 'Fifth Ship (Size: 2)';\n            break;\n          default:\n            text.textContent += 'First Ship (Size: 5)';\n        }\n        text.textContent += ' root coordinates and direction!';\n        text.id = id += 1;\n        if (id > 5) {\n          computer.board.placeShipsRandomly();\n          startGame();\n        }\n      }\n    });\n  };\n  const getRandomPosition = () => {\n    const randomBtn = document.querySelector('#random');\n    randomBtn.addEventListener('click', () => {\n      player.board.placeShipsRandomly();\n      display.playerBoard(player.board.getBoard(), playerFleet);\n      computer.board.placeShipsRandomly();\n      startGame();\n    });\n  };\n  const startGame = () => {\n    const pregame = document.querySelector('.pregame');\n    pregame.classList.add('hidden');\n    helpContent.textContent = \"Click on one of your opponent square to attack it. If an O appears, it means that you've hit one of his ship. If an X appears, it means that you didn't hit any ship.\";\n    display.hideBoard(playerSection, computerSection);\n    waitMove();\n  };\n  const waitMove = () => {\n    const oppsquares = document.querySelectorAll('.oppsquare');\n    oppsquares.forEach(square => {\n      square.addEventListener('click', () => {\n        const coordinates = square.id.split('-');\n        const result = computer.board.receiveAttack(coordinates);\n        if (result === false) {\n          return false;\n        }\n        displAttackResult(result);\n        display.opponentBoard(computer.board.getBoard(), computerFleet);\n        if (computer.board.fleetSunk() === true) {\n          endGame('Player');\n        } else {\n          display.hideBoard(computerSection, playerSection);\n          setTimeout(() => {\n            manageComputerTurn();\n            if (player.board.fleetSunk() === true) {\n              endGame('Computer');\n            } else {\n              setTimeout(() => {\n                display.hideBoard(playerSection, computerSection);\n                waitMove();\n              }, 1000);\n            }\n          }, 1000);\n        }\n      });\n    });\n  };\n  const displAttackResult = attackresult => {\n    const result = document.querySelector('.result');\n    if (attackresult === 'hit') {\n      result.textContent = 'Hit !';\n      return;\n    }\n    if (attackresult === 'miss') {\n      result.textContent = 'Missed !';\n      return;\n    }\n    if (attackresult === 'sunk') {\n      result.textContent = 'Ship sunk!';\n    }\n  };\n  const manageComputerTurn = () => {\n    let tries = 0;\n    while (true) {\n      let coordinates = undefined;\n      if (tries < 100) {\n        coordinates = computer.chooseSquare();\n      } else {\n        computer.lastHit = null;\n        coordinates = computer.randomCoordinates();\n      }\n      const result = player.board.receiveAttack(coordinates);\n      if (result !== false) {\n        if (result === 'hit') {\n          computer.lastHit = coordinates;\n        } else if (result === 'sunk') {\n          computer.lastHit = null;\n        }\n        displAttackResult(result);\n        display.playerBoard(player.board.getBoard(), player.board.getFleet());\n        break;\n      }\n      tries += 1;\n    }\n  };\n  const endGame = winner => {\n    const result = document.querySelector('.result');\n    result.textContent = `The game is over! ${winner} wins !`;\n    winner === 'Player' ? playerSection.classList.remove('hidden') : computerSection.classList.remove('hidden');\n    display.playerBoard(computer.board.getBoard(), computerFleet, 'endgame');\n    playerSection.classList.add('endgame');\n    computerSection.classList.add('endgame');\n  };\n  getShipRoot();\n  getRandomPosition();\n}\n\n//# sourceURL=webpack://battleship/./src/game.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Gameboard: () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\n/* harmony import */ var _square__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./square */ \"./src/square.js\");\n\n\nfunction Gameboard() {\n  const createBoard = () => {\n    const size = 10;\n    const board = [];\n    for (let i = 0; i < size; i++) {\n      const row = [];\n      for (let j = 0; j < size; j++) {\n        row[j] = new _square__WEBPACK_IMPORTED_MODULE_1__.Square([i, j]);\n      }\n      board[i] = row;\n    }\n    return board;\n  };\n  const board = createBoard();\n  const getBoard = () => board;\n  const fleet = [{\n    ship: new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(5),\n    coordinates: [],\n    direction: 'horizontal',\n    id: 0,\n    isPlaced: false\n  }, {\n    ship: new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(4),\n    coordinates: [],\n    direction: 'horizontal',\n    id: 1,\n    isPlaced: false\n  }, {\n    ship: new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3),\n    coordinates: [],\n    direction: 'horizontal',\n    id: 2,\n    isPlaced: false\n  }, {\n    ship: new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(3),\n    coordinates: [],\n    direction: 'horizontal',\n    id: 3,\n    isPlaced: false\n  }, {\n    ship: new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(2),\n    coordinates: [],\n    direction: 'horizontal',\n    id: 4,\n    isPlaced: false\n  }];\n  const getFleet = () => fleet;\n  const placeShip = (col, row, direction) => {\n    let shipId = 0;\n    while (fleet[shipId].isPlaced === true) {\n      if (shipId >= fleet.length) break;\n      shipId += 1;\n    }\n    if (direction === 'horizontal' && col + fleet[shipId].ship.length > board.length || direction === 'vertical' && row + fleet[shipId].ship.length > board.length) {\n      return false;\n    }\n    const shipCoordinates = [];\n    for (let i = 0; i < fleet[shipId].ship.length; i++) {\n      if (direction === 'horizontal') {\n        fleet[shipId].direction = 'horizontal';\n        shipCoordinates.push([row, col + i]);\n      } else {\n        fleet[shipId].direction = 'vertical';\n        shipCoordinates.push([row + i, col]);\n      }\n    }\n    if (squaresEmpty(shipCoordinates)) {\n      shipCoordinates.forEach(square => {\n        board[square[0]][square[1]].ship = shipId;\n        fleet[shipId].coordinates.push(square);\n      });\n      fleet[shipId].isPlaced = true;\n      return true;\n    } else {\n      return false;\n    }\n  };\n  const placeShipsRandomly = () => {\n    for (let i = 0; i < fleet.length; i++) {\n      let direction = 'horizontal';\n      const random = Math.round(Math.random());\n      if (random === 1) direction = 'vertical';\n      const result = placeShip(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), direction);\n      if (result !== true) i -= 1;\n    }\n  };\n  const squaresEmpty = coordinates => {\n    return coordinates.every(square => board[square[0]][square[1]].ship === null);\n  };\n  const receiveAttack = coordinates => {\n    let square = board[coordinates[0]][coordinates[1]];\n    if (square.status === 'hit' || square.status === 'miss') {\n      return false;\n    } else if (square.ship !== null) {\n      const shipId = square.ship;\n      board[coordinates[0]][coordinates[1]].status = 'hit';\n      fleet[shipId].ship.hit();\n      if (fleet[shipId].ship.isSunk() === true) {\n        return 'sunk';\n      } else {\n        return 'hit';\n      }\n    } else {\n      board[coordinates[0]][coordinates[1]].status = 'miss';\n      return 'miss';\n    }\n  };\n  const fleetSunk = () => {\n    return fleet.every(ship => ship.ship.isSunk() === true);\n  };\n  return {\n    getBoard,\n    getFleet,\n    placeShip,\n    placeShipsRandomly,\n    receiveAttack,\n    fleetSunk\n  };\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n(0,_game__WEBPACK_IMPORTED_MODULE_1__.Game)();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Computer: () => (/* binding */ Computer),\n/* harmony export */   Player: () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\nclass Player {\n  constructor() {\n    this.board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();\n  }\n}\nclass Computer extends Player {\n  constructor() {\n    super();\n    this.lastHit = null;\n  }\n  randomCoordinates() {\n    const a = Math.floor(Math.random() * 10);\n    const b = Math.floor(Math.random() * 10);\n    return [a, b];\n  }\n  chooseSquare() {\n    while (true) {\n      if (this.lastHit === null) {\n        return this.randomCoordinates();\n      }\n      let choices = [];\n      if (this.lastHit[0] > 0) {\n        choices.push([this.lastHit[0] - 1, this.lastHit[1]]);\n      }\n      if (this.lastHit[0] < 9) {\n        choices.push([this.lastHit[0] + 1, this.lastHit[1]]);\n      }\n      if (this.lastHit[1] > 0) {\n        choices.push([this.lastHit[0], this.lastHit[1] - 1]);\n      }\n      if (this.lastHit[1] < 9) {\n        choices.push([this.lastHit[0], this.lastHit[1] + 1]);\n      }\n      let randomDirection = Math.floor(Math.random() * choices.length);\n      let choice = choices[randomDirection];\n      return choice;\n    }\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Ship: () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n  }\n  hit() {\n    this.hits += 1;\n  }\n  isSunk() {\n    if (this.hits >= this.length) return true;\n    return false;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ }),

/***/ "./src/square.js":
/*!***********************!*\
  !*** ./src/square.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Square: () => (/* binding */ Square)\n/* harmony export */ });\nclass Square {\n  constructor(coordinates) {\n    this.status = null;\n    this.ship = null;\n    this.coordinates = coordinates;\n  }\n}\n\n//# sourceURL=webpack://battleship/./src/square.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/modern-normalize/modern-normalize.css":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/modern-normalize/modern-normalize.css ***!
  \**************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/*! modern-normalize v2.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n\n/*\nDocument\n========\n*/\n\n/**\nUse a better box model (opinionated).\n*/\n\n*,\n::before,\n::after {\n\tbox-sizing: border-box;\n}\n\nhtml {\n\t/* Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3) */\n\tfont-family:\n\t\tsystem-ui,\n\t\t'Segoe UI',\n\t\tRoboto,\n\t\tHelvetica,\n\t\tArial,\n\t\tsans-serif,\n\t\t'Apple Color Emoji',\n\t\t'Segoe UI Emoji';\n\tline-height: 1.15; /* 1. Correct the line height in all browsers. */\n\t-webkit-text-size-adjust: 100%; /* 2. Prevent adjustments of font size after orientation changes in iOS. */\n\t-moz-tab-size: 4; /* 3. Use a more readable tab size (opinionated). */\n\ttab-size: 4; /* 3 */\n}\n\n/*\nSections\n========\n*/\n\nbody {\n\tmargin: 0; /* Remove the margin in all browsers. */\n}\n\n/*\nGrouping content\n================\n*/\n\n/**\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n*/\n\nhr {\n\theight: 0; /* 1 */\n\tcolor: inherit; /* 2 */\n}\n\n/*\nText-level semantics\n====================\n*/\n\n/**\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr[title] {\n\ttext-decoration: underline dotted;\n}\n\n/**\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n\tfont-weight: bolder;\n}\n\n/**\n1. Improve consistency of default fonts in all browsers. (https://github.com/sindresorhus/modern-normalize/issues/3)\n2. Correct the odd 'em' font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n\tfont-family:\n\t\tui-monospace,\n\t\tSFMono-Regular,\n\t\tConsolas,\n\t\t'Liberation Mono',\n\t\tMenlo,\n\t\tmonospace; /* 1 */\n\tfont-size: 1em; /* 2 */\n}\n\n/**\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n\tfont-size: 80%;\n}\n\n/**\nPrevent 'sub' and 'sup' elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n\tfont-size: 75%;\n\tline-height: 0;\n\tposition: relative;\n\tvertical-align: baseline;\n}\n\nsub {\n\tbottom: -0.25em;\n}\n\nsup {\n\ttop: -0.5em;\n}\n\n/*\nTabular data\n============\n*/\n\n/**\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n*/\n\ntable {\n\ttext-indent: 0; /* 1 */\n\tborder-color: inherit; /* 2 */\n}\n\n/*\nForms\n=====\n*/\n\n/**\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n\tfont-family: inherit; /* 1 */\n\tfont-size: 100%; /* 1 */\n\tline-height: 1.15; /* 1 */\n\tmargin: 0; /* 2 */\n}\n\n/**\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n\ttext-transform: none;\n}\n\n/**\nCorrect the inability to style clickable types in iOS and Safari.\n*/\n\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n\t-webkit-appearance: button;\n}\n\n/**\nRemove the inner border and padding in Firefox.\n*/\n\n::-moz-focus-inner {\n\tborder-style: none;\n\tpadding: 0;\n}\n\n/**\nRestore the focus styles unset by the previous rule.\n*/\n\n:-moz-focusring {\n\toutline: 1px dotted ButtonText;\n}\n\n/**\nRemove the additional ':invalid' styles in Firefox.\nSee: https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737\n*/\n\n:-moz-ui-invalid {\n\tbox-shadow: none;\n}\n\n/**\nRemove the padding so developers are not caught out when they zero out 'fieldset' elements in all browsers.\n*/\n\nlegend {\n\tpadding: 0;\n}\n\n/**\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n\tvertical-align: baseline;\n}\n\n/**\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n\theight: auto;\n}\n\n/**\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n\t-webkit-appearance: textfield; /* 1 */\n\toutline-offset: -2px; /* 2 */\n}\n\n/**\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n\t-webkit-appearance: none;\n}\n\n/**\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to 'inherit' in Safari.\n*/\n\n::-webkit-file-upload-button {\n\t-webkit-appearance: button; /* 1 */\n\tfont: inherit; /* 2 */\n}\n\n/*\nInteractive\n===========\n*/\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n\tdisplay: list-item;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./node_modules/modern-normalize/modern-normalize.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_modern_normalize_modern_normalize_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!../node_modules/modern-normalize/modern-normalize.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/modern-normalize/modern-normalize.css\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3__);\n// Imports\n\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Grenze_Gotisch/GrenzeGotisch-VariableFont_wght.ttf */ \"./src/fonts/Grenze_Gotisch/GrenzeGotisch-VariableFont_wght.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Raleway/Raleway-VariableFont_wght.ttf */ \"./src/fonts/Raleway/Raleway-VariableFont_wght.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf */ \"./src/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_node_modules_modern_normalize_modern_normalize_css__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_1___);\nvar ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_3___default()(___CSS_LOADER_URL_IMPORT_2___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `@font-face {\n  font-family: 'Grenze';\n  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___});\n}\n\n@font-face {\n  font-family: 'Raleway';\n  src: url(${___CSS_LOADER_URL_REPLACEMENT_1___});\n}\n\n@font-face {\n  font-family: 'Comfortaa';\n  src: url(${___CSS_LOADER_URL_REPLACEMENT_2___});\n}\n\n:root {\n  font-size: 62.5%;\n  --squaresize: 5rem;\n  --shipborder: 2px solid #0e7490;\n}\n\nbody {\n  padding: 1rem;\n  display: grid;\n  background-color: #1e1b4b;\n  color: white;\n  /* background-color: #e0f2fe; */\n  font-family: 'Raleway', system-ui, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',\n    sans-serif;\n  font-weight: 500;\n}\n\nheader {\n  justify-self: center;\n  font-size: 5rem;\n  margin: 1rem;\n  font-family: 'Grenze', system-ui, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',\n    sans-serif;\n}\n\n.helpsection {\n  position: absolute;\n  top: 3rem;\n  right: 5%;\n  padding: 1rem;\n  border-radius: 5px;\n  max-width: 33ch;\n  line-height: 1.5rem;\n  background-color: aliceblue;\n  color: black;\n}\n\n.help {\n  padding: 0.5rem 0;\n  font-size: 1.5rem;\n  background-color: inherit;\n  outline: none;\n  border: none;\n}\n\n.help:hover {\n  cursor: pointer;\n  text-decoration: underline;\n}\n\n.helpcontent.hidden {\n  max-width: 0;\n}\n\n.pregame {\n  display: grid;\n  justify-self: center;\n  font-size: 1.5rem;\n}\n\nform {\n  border: 3px solid #0e7490;\n  background-color: #eff6ff;\n  color: black;\n  border-radius: 5px;\n  padding: 1.5rem 5rem;\n  margin: 1.5rem;\n  justify-self: center;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem 2rem;\n  align-items: center;\n  min-width: 45vw;\n}\n\n.pregametext {\n  margin: 1.5rem;\n}\n\nselect {\n  padding: 0.5rem;\n  border: 1px snow;\n  outline: 1px solid lightblue;\n}\n\n#direction {\n  grid-column: 2 / 4;\n}\n\n.pregametext,\n#formbtn {\n  grid-column: 1 / 4;\n}\n\n#formbtn,\n#random {\n  position: relative;\n  padding: 1.5rem;\n  outline: none;\n  background-color: #2564ebc6;\n  color: white;\n  border: none;\n  border-radius: 7.5px;\n  justify-self: center;\n}\n\n#formbtn:active,\n#random:active {\n  top: 2px;\n}\n\n#random {\n  margin: 1rem;\n}\n\n.result {\n  justify-self: center;\n  font-size: 2.5rem;\n  padding: 1rem;\n}\n\n.boards {\n  justify-self: center;\n  padding: 2rem;\n  display: flex;\n  text-align: center;\n}\n\nsection {\n  position: absolute;\n  left: 30vw;\n  transition: all 0.5s;\n}\n\n.boardtitle,\n.opptitle {\n  font-size: 1.5rem;\n}\n\n.board,\n.oppboard {\n  padding: 1rem;\n  display: grid;\n}\n\n.letters {\n  font-size: 1.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.letter {\n  place-content: center end;\n}\n.number {\n  display: grid;\n  font-size: 1.5rem;\n  height: var(--squaresize);\n  align-content: center;\n}\n\n.letters,\n.row,\n.opprow {\n  display: grid;\n  grid-template-columns: repeat(11, 1fr);\n}\n\n.square,\n.oppsquare {\n  height: var(--squaresize);\n  width: var(--squaresize);\n  background-color: #f8fafc;\n  border: 0.5px solid #0c4a6e;\n  padding: 0;\n  box-shadow: 0px 0px 1px black;\n  font-family: 'Comfortaa', system-ui, -apple-system, BlinkMacSystemFont,\n    'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',\n    sans-serif;\n  font-weight: 300;\n  font-size: calc(var(--squaresize) - 1rem);\n}\n\n.shipsquare {\n  background-color: #e2e8f0;\n  border: none;\n}\n\n.horizontal {\n  border-top: var(--shipborder);\n  border-bottom: var(--shipborder);\n}\n\n.vertical {\n  border-left: var(--shipborder);\n  border-right: var(--shipborder);\n}\n\n.horizontalroot {\n  border-left: var(--shipborder);\n}\n\n.verticalroot {\n  border-top: var(--shipborder);\n}\n\n.horizontaltail {\n  border-right: var(--shipborder);\n}\n\n.verticaltail {\n  border-bottom: var(--shipborder);\n}\n.missedsquare::after {\n  position: relative;\n  top: 10%;\n  content: 'X';\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.player.endgame {\n  left: 7vw;\n}\n\n.opp.endgame {\n  left: 50vw;\n}\n\n.hitsquare::after {\n  position: relative;\n  top: 10%;\n  content: 'O';\n  color: #ef4444;\n}\n\nbutton:hover {\n  cursor: pointer;\n}\n\n.hidden {\n  visibility: hidden;\n  max-height: 0;\n  opacity: 0;\n}\n\n@media (max-width: 1200px) {\n  section {\n    left: 25vw;\n  }\n\n  .player.endgame {\n    left: 3vw;\n  }\n}\n\n@media (max-width: 1100px) {\n  body {\n    --squaresize: 4.5rem;\n  }\n\n  section {\n    left: 20vw;\n  }\n\n  .player.endgame {\n    left: 20vw;\n  }\n\n  .opp.endgame {\n    left: 20vw;\n    top: max(60vh, 70vw);\n  }\n}\n\n@media (max-width: 800px) {\n  body {\n    --squaresize: 2.5rem;\n  }\n\n  section {\n    left: 15vw;\n  }\n\n  .player.endgame {\n    left: 15vw;\n  }\n\n  .opp.endgame {\n    left: 15vw;\n    top: max(75vh, 90vw);\n  }\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./node_modules/dropdown-clicked-hovered/dropdown.js":
/*!***********************************************************!*\
  !*** ./node_modules/dropdown-clicked-hovered/dropdown.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   click: () => (/* binding */ click),\n/* harmony export */   hover: () => (/* binding */ hover)\n/* harmony export */ });\nconst click = (button, content) => {\n  button.addEventListener(\"click\", () => {\n    content.classList.contains(\"hidden\")\n      ? content.classList.remove(\"hidden\")\n      : content.classList.add(\"hidden\");\n  });\n};\n\nconst hover = (button, content) => {\n  button.addEventListener(\"mouseover\", () => {\n    content.classList.remove(\"hidden\");\n  });\n  button.addEventListener(\"mouseout\", () => {\n    content.classList.add(\"hidden\");\n  });\n  content.addEventListener(\"mouseover\", () => {\n    content.classList.remove(\"hidden\");\n  });\n  content.addEventListener(\"mouseout\", () => {\n    content.classList.add(\"hidden\");\n  });\n};\n\n\n\n\n//# sourceURL=webpack://battleship/./node_modules/dropdown-clicked-hovered/dropdown.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleship/./src/styles.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf":
/*!*************************************************************!*\
  !*** ./src/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"7b8c952927af2b0deacd.ttf\";\n\n//# sourceURL=webpack://battleship/./src/fonts/Comfortaa/Comfortaa-VariableFont_wght.ttf?");

/***/ }),

/***/ "./src/fonts/Grenze_Gotisch/GrenzeGotisch-VariableFont_wght.ttf":
/*!**********************************************************************!*\
  !*** ./src/fonts/Grenze_Gotisch/GrenzeGotisch-VariableFont_wght.ttf ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"4342f0a8f3e257b7540b.ttf\";\n\n//# sourceURL=webpack://battleship/./src/fonts/Grenze_Gotisch/GrenzeGotisch-VariableFont_wght.ttf?");

/***/ }),

/***/ "./src/fonts/Raleway/Raleway-VariableFont_wght.ttf":
/*!*********************************************************!*\
  !*** ./src/fonts/Raleway/Raleway-VariableFont_wght.ttf ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"d8040b0cc740dda7550a.ttf\";\n\n//# sourceURL=webpack://battleship/./src/fonts/Raleway/Raleway-VariableFont_wght.ttf?");

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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