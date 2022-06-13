const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const display = document.querySelector('.display');
const resetButton = document.getElementById('reset');
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const XWon = 'Xwon'
const OWon = 'Owon'
const tie = 'tie'
let gameWon;
let isGameActive = true
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function changePlayer() {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerHTML = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

function checkTile(tile) {
    if (tile.innerText === 'X' || tile.innerText === 'O') { return false; } return true;
};

function userChoice(tile, i) {
    if (checkTile(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        board[i] = currentPlayer;
        console.log(board)
        checkResults();
        changePlayer();
    }
}

function checkResults() {
    gameWon = false;
    for (let i = 0; i <= 7; i++) { //map all conditions
        const winCondition = winningConditions[i]; //single condition that extends to 3 parts:
        const a = board[winCondition[0]];   //First(of condition array [0,1,2]) index number of tile which is [0, ...]
        const b = board[winCondition[1]];   //Second index number [.., 1,..]
        const c = board[winCondition[2]];   //Third index number [..., 2]
        if (a === '' || b === '' || c === '') { continue; } //continue is needed for if you want to check more than one tile
        if (a === b && b === c) { gameWon = true; break; } // Checks by winCondition wether each of 3 tiles is the same string ex.('X' or 'O')
    }
    if (gameWon) { endResult(currentPlayer === 'X' ? XWon : OWon); isGameActive = false; return; }
    if (!board.includes('')) endResult(tie)
}

function endResult(end) {
    switch (end) {
        case XWon:
            display.innerHTML = `<span class="playerX">X</span> Won the Game!`
            break;
        case OWon:
            display.innerHTML = `<span class="playerO">O</span> Won the Game!`
            break;
        case tie:
            display.innerHTML = `It's a tie!`
            break;
    }
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    display.innerHTML = `Player <span class="display-player playerX">X</span>'s turn`
    if (currentPlayer === 'O') changePlayer()
    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove(`playerX`);
        tile.classList.remove(`playerO`);
    })
}

tiles.forEach((tile, i) => {
    tile.addEventListener(('click'), () => userChoice(tile, i))
})
resetButton.addEventListener('click', resetBoard);
