// script.js
const cells = document.querySelectorAll('[data-cell]');
const winnerText = document.getElementById('winnerText');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle cell click
function handleClick(e) {
  const cell = e.target;

  if (!isGameActive || cell.classList.contains('taken')) return;

  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    winnerText.textContent = `${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  if (isDraw()) {
    winnerText.textContent = `It's a Draw!`;
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

// Check for a draw
function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('taken');
  });
}

// Restart the game
function restartGame() {
  currentPlayer = 'X';
  isGameActive = true;
  winnerText.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

// Add event listeners
cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});
restartButton.addEventListener('click', restartGame);
