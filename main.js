"use strict"
let gameStatus = document.getElementById("game-status"),
    reset = document.getElementById("reset-btn");
let turn = "X";
let cells = Array.from(document.querySelectorAll(".cell"));

let turnMessage = () => `It's player ${turn} turn`,
    winnerMessage = () => `Player ${turn} has won`,
    tieMessage = "it's a Tie !";

gameStatus.innerHTML = turnMessage();

function isCellEmpty(cell) {
    if (cell.innerHTML == "") return true;
    else return false;
}

function addMove(cell) {
    let index = cell.target.id.replace("cell", "");
    if (isCellEmpty(cells[index])) {
        cells[index].innerHTML = turn;
        cells[index].classList.add("filled");
    }
}

function changePlayer() {
    turn = (turn == "X") ? "O" : "X";
    gameStatus.innerHTML = turnMessage();
}

reset.onclick = function () {
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("filled");
    }
    turn = "X";
}

cells.forEach((cell) => cell.addEventListener('click', addMove));