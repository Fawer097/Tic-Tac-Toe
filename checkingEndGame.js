export function checkingEndGame(
  arr,
  cell,
  cells,
  type,
  gameBoardScreen,
  gameOverScreen
) {
  let winner;

  checkingDraw(cells, gameBoardScreen, gameOverScreen);

  const row = Number(cell.getAttribute('row'));
  const col = Number(cell.getAttribute('col'));

  if (
    (arr[row][col + 1] == type && arr[row][col - 1] == type) ||
    (arr[row][col + 1] == type && arr[row][col + 2] == type) ||
    (arr[row][col - 1] == type && arr[row][col - 2] == type) ||
    (arr[row + 1][col] == type && arr[row - 1][col] == type) ||
    (arr[row + 1][col] == type && arr[row + 2][col] == type) ||
    (arr[row - 1][col] == type && arr[row - 2][col] == type) ||
    (arr[row - 1][col + 1] == type && arr[row + 1][col - 1] == type) ||
    (arr[row - 1][col + 1] == type && arr[row - 2][col + 2] == type) ||
    (arr[row + 1][col - 1] == type && arr[row + 2][col - 2] == type) ||
    (arr[row - 1][col - 1] == type && arr[row + 1][col + 1] == type) ||
    (arr[row - 1][col - 1] == type && arr[row - 2][col - 2] == type) ||
    (arr[row + 1][col + 1] == type && arr[row + 2][col + 2] == type)
  ) {
    winner = `${arr[row][col].toUpperCase()} WON!!!`;
    setTimeout(
      () => showGameOverScreen(winner, gameBoardScreen, gameOverScreen),
      300
    );
  }
}

function checkingDraw(cells, gameBoardScreen, gameOverScreen) {
  const cellsArray = [...cells];

  const filterArray = cellsArray.filter((cell) => !cell.innerHTML);

  if (filterArray.length == 0) {
    const winner = 'A DRAW!';
    setTimeout(
      () => showGameOverScreen(winner, gameBoardScreen, gameOverScreen),
      300
    );
  }
}

function showGameOverScreen(winner, gameBoardScreen, gameOverScreen) {
  gameBoardScreen.classList.remove('show-screen');
  gameBoardScreen.classList.add('hide-screen');
  gameOverScreen.classList.add('show-screen');
  const winnerName = document.getElementById('winner-name');
  winnerName.textContent = winner;
}
