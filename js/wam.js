console.log('Main loaded');

//functie voor het naam invoeren van de speler aan het begin van het spel
alert + prompt
let firstName;
firstName = prompt('What is you name?');
alert('Welcome ' + firstName + ',\n\nYou have entered the Whack a Mole game!' + '\n\nIn this game you gonna see a mole coming out of holes. The point of the game is to collect 150 point under 30 seconds to win the game.\n\nSo if your ready, press "Start" to begin.\nHave fun!');

//functie voor het ophalen van alle classes in html
const themeOne = document.querySelector('.theme-one');
const themeTwo = document.querySelector('.theme-two');
const startBtn = document.querySelector('.start-button');
const gameBoard = document.querySelector('.game-board');
let scoreName = document.querySelector('.player-class').innerHTML = firstName;
let player = document.querySelector('.player-score');
let gameTimer = document.querySelector('.game-timer');

//functie voor thema knoppen
themeOne.addEventListener('click', function () {
    document.body.style.setProperty('--background-color', '#B0E0E6');
    document.body.style.setProperty('--text-color', '#DAA520');
});

themeTwo.addEventListener('click', function () {
    document.body.style.setProperty('--background-color', '#404040');
    document.body.style.setProperty('--text-color', 'aqua');
});

//functie voor het starten van de game
startBtn.addEventListener('click', function () {
    startGame();
    startTimer();
    gridTiles();
    startBtn.disabled = true;
});

//variabelen voor de functie
let currentMoleTile;
let timer;
let gameTime = 60;
let score = 0;
let gridTwo = 3;
let gridThree = 4;
let gridFour = 5;
let moleStatus = 0;
let activeMole = false;

//functie voor grid op het bord in html
function gridTiles() {
    for (let i = 0; i < 9; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.querySelector(".game-board").appendChild(tile);
    }
    //functie voor het aanroepen van de mol binnen een bepaalde tijd
    setInterval(updateMole, 1000);
}

function clearGameBoard() {
    gameBoard.innerHTML = '';
}

function gridUpdateFourByFour() {
    clearGameBoard();
    for (let i = 0; i < 16; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.querySelector(".game-board").appendChild(tile);
    }
    document.querySelector(".game-board").style.gridTemplateColumns = 'repeat(4, 1fr)';
    document.querySelector(".game-board").style.gridTemplateRows = 'repeat(4, 1fr)';
}

function gridUpdateFiveByFive() {
    clearGameBoard();
    for (let i = 0; i < 25; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.querySelector(".game-board").appendChild(tile);
    }
    document.querySelector(".game-board").style.gridTemplateColumns = 'repeat(5, 1fr)';
    document.querySelector(".game-board").style.gridTemplateRows = 'repeat(5, 1fr)';
}

function gridUpdateSixBySix() {
    clearGameBoard();
    for (let i = 0; i < 36; i++) {

        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener('click', selectTile);
        document.querySelector(".game-board").appendChild(tile);
    }
    document.querySelector(".game-board").style.gridTemplateColumns = 'repeat(6, 1fr)';
    document.querySelector(".game-board").style.gridTemplateRows = 'repeat(6, 1fr)';
}

//functie mathrandom voor het random showen van de mol
function randomTile() {
    let number = 0;
    if (moleStatus == 4) {
        number = Math.floor(Math.random() * 16);
    } else if (moleStatus == 5) {
        number = Math.floor(Math.random() * 25);
    } else if (moleStatus == 6) {
        number = Math.floor(Math.random() * 36);
    } else {
        number = Math.floor(Math.random() * 9);
    }

    return number.toString();
}

///functie voor het updaten van de timer die in html is aangemaakt
function updateTimerDisplay() {
    gameTimer.textContent = gameTime;
}

//functie voor het starten van de timer
function startTimer() {
    timer = setInterval(function () {
        gameTime--;
        updateTimerDisplay();

        if (gameTime <= 0) {
            alert("Time is up! You didn't make it." + ' \n\nYou got ' + score + ' points out of the 150!' + " \n\nPlease refresh the page to restart the game!")
            endGame();
            clearInterval(timer);
        }
    }, 1000);
}

//functie voor de begin getallen van de speler
function startGame() {
    player.textContent = '0';
    activeMole = true;
}

//functie voor als je hebt gewonnen of hebt verloren
function endGame() {
    if (gameTime === 0) {
        clearInterval(updateMole);
    }
    activeMole = false;
    clearInterval(timer);
}

//functie voor de mole
function updateMole() {
    if (!activeMole) {
        return;
    }

    if (currentMoleTile) {
        currentMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = ("/Afbeeldingen/monty-mole.png");

    let number = randomTile();
    currentMoleTile = document.getElementById(number);
    currentMoleTile.appendChild(mole);
}

//functie voor het tellen van de scores als er op een mol wordt gedrukt
function selectTile() {
    if (!activeMole) {
        return;
    }

    let moleClicked = this == currentMoleTile;

    if (moleClicked) {
        score += 10;
        document.querySelector('.player-score').innerText = score.toString();
    } else {
        score -= 10;
        document.querySelector('.player-score').innerText = score.toString();
    }

    if (score === 50) {
        gridTwo = 4;
        moleStatus = 4;
        gridUpdateFourByFour();
    }

    if (score === 80) {
        gridThree = 5;
        moleStatus = 5;
        gridUpdateFiveByFive();
    }

    if (score === 100) {
        gridFour = 6;
        moleStatus = 6;
        gridUpdateSixBySix();
    }

    if (score === 150) {
        alert('Congratulations! ' + firstName + ',\n\nYou have won the game! you managed to get 150 points within 60 seconds!\n\nGood job!');
        activeMole = false;
        clearInterval(timer);
    }
}
