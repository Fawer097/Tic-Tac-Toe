export function checkingEndGame(
  arr,
  cells,
  boardSize,
  gameBoardScreen,
  gameOverScreen
) {
  let winner;

  checkingDraw(cells, gameBoardScreen, gameOverScreen);

  for (let i in arr) {
    const arrayZero = arr[i].filter((arr) => arr == 'zero');
    const arrayCross = arr[i].filter((arr) => arr == 'cross');

    if (arrayZero.length == boardSize || arrayCross.length == boardSize) {
      winner = `${arr[i][i].toUpperCase()} WON!!!`;
      setTimeout(
        () => showGameOverScreen(winner, gameBoardScreen, gameOverScreen),
        300
      );
    }
  }

  for (let i in arr) {
    const arrayZero = arr.filter((arr) => arr[i] == 'zero');
    const arrayCross = arr.filter((arr) => arr[i] == 'cross');

    if (arrayZero.length == boardSize || arrayCross.length == boardSize) {
      winner = `${arr[i][i].toUpperCase()} WON!!!`;
      setTimeout(
        () => showGameOverScreen(winner, gameBoardScreen, gameOverScreen),
        300
      );
    }
  }

  if (
    (arr[0][2] == 'zero' && arr[1][1] == 'zero' && arr[2][0] == 'zero') ||
    (arr[0][2] == 'cross' && arr[1][1] == 'cross' && arr[2][0] == 'cross') ||
    (arr[0][0] == 'zero' && arr[1][1] == 'zero' && arr[2][2] == 'zero') ||
    (arr[0][0] == 'cross' && arr[1][1] == 'cross' && arr[2][2] === 'cross')
  ) {
    winner = `${arr[1][1].toUpperCase()} WON!!!`;
    setTimeout(
      () => showGameOverScreen(winner, gameBoardScreen, gameOverScreen),
      300
    );
  }
}

function checkingDraw(cells, gameBoardScreen, gameOverScreen) {
  const cellsArray = [...cells];

  const arr1 = cellsArray.filter((cell) => cell.innerHTML == '');

  if (!arr1.length) {
    const winner = 'A DRAW!!!';
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
