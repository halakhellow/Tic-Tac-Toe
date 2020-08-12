"use strict"
let gameStatus = document.getElementById("game-status"),
    reset = document.getElementById("reset-btn");
let turn = "X";
let cells = Array.from(document.querySelectorAll(".cell"));

let turnMessage = `It's Player ${turn} Turn`,
    winnerMessage = `Player ${turn} has won`,
    drawMessage = "it's a draw !";

gameStatus.innerHTML = turnMessage;

function isCellEmpty(cell) {
    if (cell.innerHTML == "") return true;
    else return false;
}

function addMove(cell) {
    let index = cell.target.id.replace("cell", "");
    if (isCellEmpty(cells[index])) {
        cells[index].innerHTML = turn;
        cells[index].classList.add("filled");
        if (turn == "X") turn = "O";
        else if (turn == "O") turn = "X";
    }
}

cells.forEach((cell) => cell.addEventListener('click', addMove));

function CheckWinner() {

}

reset.onclick = function () {
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = "";
        cells[i].classList.remove("filled");
    }
    turn = "X";
}