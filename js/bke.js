//Id's from html
let playerText = document.querySelector('.playerText');
let restartBtn = document.querySelector('.restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));


let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

//keeping the score
let player1Score = 0;
let player2Score = 0;

//variabelle X and O for both players
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

//invoer velden met naam
document.querySelector('.nameForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstNameInput = document.querySelector('.first-name');
    const lastNameInput = document.querySelector('.last-name');

    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;

    const displayNamesDiv = document.querySelector('.displayNames');

    if (firstName && lastName) {
        displayNamesDiv.innerHTML = `<p>Player X: ${firstName}</p><p>Player O: ${lastName}</p>`;
    } else {
        displayNamesDiv.innerHTML = '';
    }
});



//function for when you pres a box
function boxClicked(e) {
    const id = e.target.id

    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if (playerHasWon() !== false) {
            let winning_blocks = playerHasWon();

            let winnerName = currentPlayer === X_TEXT ? document.querySelector('.first-name').value : document.querySelector('.last-name').value;
            playerText.innerHTML = `${winnerName} has won!`;

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);

            // Deactivate further clicks
            boxes.forEach(box => box.removeEventListener('click', boxClicked));
            return;
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

//winning combo's
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//function player has won
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

//restart function
restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    startGame(); // Re-add event listeners
}


//explenation button
const explenationBtn = document.querySelector('.explanation');
explenationBtn.addEventListener('click', function () {
    alert('welcome to tic tac toe in this game you will play tic tac toe. The objective is to be the first to create a row of three of your symbols horizontally, vertically, or diagonally. The game ends when one player achieves this goal or when all the squares are filled without a winner, resulting in a draw.')
});

//home button
const homeBtn = document.querySelector('.home-button');

homeBtn.addEventListener('click', function () {
    window.location.href = '';
});

//Thema buttons
const themaButtonOne = document.querySelector('.thema-1');

themaButtonOne.addEventListener('click', function () {
    document.body.style.setProperty('--background-color', '#6B4D57');
});

const themaButtonTwo = document.querySelector('.thema-2');

themaButtonTwo.addEventListener('click', function () {
    document.body.style.setProperty('--background-color', '#F4B393');
});

const themaButtonThree = document.querySelector('.thema-3');

themaButtonThree.addEventListener('click', function () {
    document.body.style.setProperty('--background-color', '#8FC0A9');
});


startGame()


