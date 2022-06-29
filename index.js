import { checkingEndGame } from './checkingEndGame.js';

const ticTacToeBtn = document.getElementById('tic-tac-toe-btn');
const startGameBtn = document.getElementById('start-game-btn');
const startScreen = document.getElementById('start-screen');
const selectBoardSizeScreen = document.getElementById(
  'select-board-size-screen'
);
const selectBoardSize = document.getElementById('select-board-size');
const gameBoardScreen = document.getElementById('game-board-screen');
const gameBoard = document.getElementById('game-board');
const circles = document.querySelectorAll('.circle');
const gameOverScreen = document.getElementById('game-over');
const typeSelectionBtn = document.querySelectorAll('.selection-btn');
const reset = document.getElementById('reset');

ticTacToeBtn.addEventListener('click', () => {
  startScreen.classList.add('hide-screen');
  selectBoardSizeScreen.classList.add('show-screen');
});

startGameBtn.addEventListener('click', () => {
  selectBoardSizeScreen.classList.remove('show-screen');
  selectBoardSizeScreen.classList.add('hide-screen');
  gameBoardScreen.classList.add('show-screen');
  createDimensionalArray(arr);
  game();
});

let boardSize;

const arr = new Array();

function createDimensionalArray(arr) {
  boardSize = Number(selectBoardSize.value);
  for (let i = 0; i < boardSize; i++) {
    arr[i] = new Array();
    for (let j = 0; j < boardSize; j++) {
      createGameBoard(boardSize, i, j);
    }
  }
  arr[-1] = [];
  arr[-2] = [];
  arr[boardSize] = [];
  arr[boardSize + 1] = [];
}

function createGameBoard(boardSize, i, j) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.setAttribute('row', i);
  cell.setAttribute('col', j);
  gameBoard.append(cell);
  gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;
}

let type = undefined;

function game() {
  typeSelectionBtn.forEach((btn, index) =>
    btn.addEventListener('click', () => typeSelection(btn, index))
  );

  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) =>
    cell.addEventListener('click', () => {
      if (type == undefined) {
        alert('Выберите крестик или нолик!');
      } else if (type == 'zero' && !cell.innerHTML) {
        showImageInCell(cell, type);
        fillingArrayWithTypes(cell, arr);
        checkingEndGame(
          arr,
          cell,
          cells,
          type,
          gameBoardScreen,
          gameOverScreen
        );
        type = 'cross';
        addActiveClass(1);
      } else if (type == 'cross' && !cell.innerHTML) {
        showImageInCell(cell, type);
        fillingArrayWithTypes(cell, arr);
        checkingEndGame(
          arr,
          cell,
          cells,
          type,
          gameBoardScreen,
          gameOverScreen
        );
        type = 'zero';
        addActiveClass(0);
      }
    })
  );
}

function typeSelection(btn, index) {
  document.getElementById('selection-title').textContent = 'Текущий ход:';
  addActiveClass(index);
  typeSelectionBtn.forEach((btn) => btn.setAttribute('disabled', 'true'));
  type = btn.id;
  return type;
}

function addActiveClass(index) {
  circles.forEach((el) => {
    el.classList.remove('active');
  });
  circles[index].classList.add('active');
}

function showImageInCell(cell, type) {
  cell.innerHTML = `<img src="./images/${type}.png" alt="${type}" />`;
  cell.setAttribute('type', `${type}`);
}

function fillingArrayWithTypes(cell, arr) {
  const nameAtribute = cell.getAttribute('type');
  const row = Number(cell.getAttribute('row'));
  const col = Number(cell.getAttribute('col'));
  arr[row][col] = nameAtribute;
}

reset.onclick = () => {
  window.location.reload();
};
