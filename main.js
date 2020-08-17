"use strict"
let gameStatus = document.getElementById("game-status"),
    reset = document.getElementById("reset-btn");
let currentPlayer = "X",
    gameEnded = false,
    playersMoves = ["", "", "", "", "", "", "", "", ""];
let cells = Array.from(document.querySelectorAll(".cell"));

gameStatus.innerHTML = `It's player ${currentPlayer} turn`;

function isCellEmpty(cell) {
    if (cell.innerHTML == "") return true;
    else return false;
}

function addMove(cell) {
    let index = cell.target.id.replace("cell", "");
    if (isCellEmpty(cells[index])) {
        if (gameEnded) return;
        else {
            cells[index].innerHTML = currentPlayer;
            cells[index].classList.add("filled");
            playersMoves[index] = currentPlayer;
            reset.disabled = false;
            CheckResult();
        }
    } else {
        cells[index].classList.add("filled-cell-click");
        setTimeout(function () {
            cells[index].classList.remove("filled-cell-click");
        }, 1000);
    }
}

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function CheckResult() {
    let gameWon = false;
    for (let i = 0; i < 8; i++) {
        let winningCondition = winningConditions[i];
        let a = playersMoves[winningCondition[0]],
            b = playersMoves[winningCondition[1]],
            c = playersMoves[winningCondition[2]];

        if (a == "" || b == "" || c == "") {
            continue;
        }
        if (a === b && b === c) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        gameEnded = true;
        return (gameStatus.innerHTML = `Player ${currentPlayer} has won`);
    }
    if (!playersMoves.includes("")) {
        gameEnded = true;
        return (gameStatus.innerHTML = "it's a Tie !");
    }
    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer == "X" ? "O" : "X";
    gameStatus.innerHTML = `It's player ${currentPlayer} turn`;
}

if (playersMoves = ["", "", "", "", "", "", "", "", ""]) reset.disabled = true;

reset.onclick = function () {
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("filled");
    }
    currentPlayer = "X";
    gameEnded = false;
    gameStatus.innerHTML = `It's player ${currentPlayer} turn`;
    playersMoves = ["", "", "", "", "", "", "", "", ""];
    reset.disabled = true;
}

cells.forEach((cell) => cell.addEventListener('click', addMove));