//your JS code here. If required.
let currentPlayer = 'x'; // 'x' goes first
let player1Name, player2Name;
let gameActive = true;
const board = ["", "", "", "", "", "", "", "", ""]; // Board state

const player1Input = document.getElementById('player-1');
const player2Input = document.getElementById('player-2');
const submitButton = document.getElementById('submit');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');
const gameBoard = document.getElementById('game-board');

submitButton.addEventListener('click', function () {
    player1Name = player1Input.value.trim();
    player2Name = player2Input.value.trim();

    if (player1Name && player2Name) {
        document.querySelector('.player-info').style.display = 'none';
        gameBoard.style.display = 'block';
        updateMessage();
    } else {
        alert('Please enter both player names!');
    }
});

cells.forEach(cell => {
    cell.addEventListener('click', function () {
        if (gameActive && !cell.textContent) {
            const cellIndex = parseInt(cell.id) - 1;
            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer === 'x' ? 'X' : 'O';
            cell.classList.add(currentPlayer);

            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer === 'x' ? player1Name : player2Name}, congratulations you won!`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                updateMessage();
            }
        }
    });
});

function updateMessage() {
    messageDiv.textContent = currentPlayer === 'x' ? `${player1Name}, you're up!` : `${player2Name}, you're up!`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
