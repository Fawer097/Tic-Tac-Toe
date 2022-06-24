import { checkingEndGame } from './checkingEndGame.js';

const startGameBtn = document.getElementById('start-game-btn');
const startScreen = document.getElementById('start-screen');
const gameBoardScreen = document.getElementById('game-board-screen');
const gameBoard = document.getElementById('game-board');
const circles = document.querySelectorAll('.circle');
const gameOverScreen = document.getElementById('game-over');
const typeSelectionBtn = document.querySelectorAll('.selection-btn');
const reset = document.getElementById('reset');

startGameBtn.addEventListener('click', () => {
  startScreen.classList.add('hide-screen');
  gameBoardScreen.classList.add('show-screen');
  game();
});

const boardSize = 3;

const arr = new Array();
for (let i = 0; i < boardSize; i++) {
  arr[i] = new Array();
  for (let j = 0; j < boardSize; j++) {
    createGameBoard(boardSize, i, j);
  }
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

const cells = document.querySelectorAll('.cell');

let type = undefined;

function game() {
  typeSelectionBtn.forEach((btn, index) =>
    btn.addEventListener('click', () => typeSelection(btn, index))
  );

  cells.forEach((cell) =>
    cell.addEventListener('click', () => {
      if (type == undefined) {
        alert('Выберите крестик или нолик!');
      } else if (type == 'zero' && !cell.innerHTML) {
        showImageInCell(cell, type);
        fillArray(cell, arr);
        type = 'cross';
        addActiveClass(1);
        checkingEndGame(arr, cells, boardSize, gameBoardScreen, gameOverScreen);
      } else if (type == 'cross' && !cell.innerHTML) {
        showImageInCell(cell, type);
        fillArray(cell, arr);
        type = 'zero';
        addActiveClass(0);
        checkingEndGame(arr, cells, boardSize, gameBoardScreen, gameOverScreen);
      }
    })
  );
}

function typeSelection(btn, index) {
  document.getElementById('selection-title').textContent = 'Текущий ход:';
  addActiveClass(index);
  typeSelectionBtnDisable();
  type = btn.id;
  return type;
}

function addActiveClass(index) {
  circles.forEach((el) => {
    el.classList.remove('active');
  });
  circles[index].classList.add('active');
}

function typeSelectionBtnDisable() {
  typeSelectionBtn.forEach((btn) => btn.setAttribute('disabled', 'true'));
}

function showImageInCell(cell, type) {
  cell.innerHTML = `<img src="./images/${type}.png" alt="${type}" />`;
  cell.setAttribute('type', `${type}`);
}

function fillArray(cell, arr) {
  const nameAtribute = cell.getAttribute('type');
  const row = cell.getAttribute('row');
  const col = cell.getAttribute('col');
  arr[row][col] = nameAtribute;
}

reset.onclick = () => {
  window.location.reload();
};
