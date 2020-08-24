"use strict";
let modal = document.getElementById("modal"),
  gameStatus = document.getElementById("game-status"),
  playerX = document.getElementById("x-btn"),
  playerO = document.getElementById("o-btn"),
  reset = document.getElementById("reset-btn");
let currentPlayer = "",
  gameEnded = false,
  playersMoves = ["", "", "", "", "", "", "", "", ""];
let cells = Array.from(document.querySelectorAll(".cell"));

playerX.onclick = function () {
  playerPick("X");
};
playerO.onclick = function () {
  playerPick("O");
};

function playerPick(symbol) {
  currentPlayer = symbol;
  gameStatus.innerHTML = `It's player ${currentPlayer} turn`;
  modal.style.display = "none";
  cells.forEach((cell) => cell.addEventListener("click", addMove));
}

function isCellEmpty(cell) {
  if (cell.innerHTML == "") return true;
  else return false;
}

function addMove(cell) {
  let index = cell.target.id.replace("cell", "");
  if (isCellEmpty(cells[index])) {
    if (gameEnded) return;
    else {
      if (currentPlayer == "O") cells[index].classList.add("player-o");
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
  [2, 4, 6],
];

function CheckResult() {
  let gameWon = false;
  let winCells = [];
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
      winCells = winningCondition;
      break;
    }
  }
  if (gameWon) {
    gameEnded = true;
    cells.map((cell) => cell.classList.add("win-tie"));
    winCells.map((index) => cells[index].classList.add("winner"));
    confetti({
      particleCount: 500,
      spread: 90,
      origin: {
        y: 0.7,
      },
    });
    gameStatus.classList.add("winner-message");
    return (gameStatus.innerHTML = `Player ${currentPlayer} has won ! &#127881`);
  }
  if (!playersMoves.includes("")) {
    gameEnded = true;
    gameStatus.classList.add("tie");
    cells.map((cell) => cell.classList.add("win-tie"));
    return (gameStatus.innerHTML = "it's a Tie ! &#128577;");
  }
  changePlayer();
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  gameStatus.innerHTML = `It's player ${currentPlayer} turn`;
}

if ((playersMoves = ["", "", "", "", "", "", "", "", ""]))
  reset.disabled = true;

reset.onclick = function () {
  if (
    (!gameEnded && confirm("Data will be lost . Start a new game ?")) ||
    gameEnded
  ) {
    cells.map((cell) => {
      cell.innerHTML = "";
      cell.classList.remove("filled", "winner", "player-o", "win-tie");
    });
    gameEnded = false;
    modal.style.display = "block";
    gameStatus.classList.remove("winner-message", "tie");
    gameStatus.innerHTML = "";
    playersMoves = ["", "", "", "", "", "", "", "", ""];
    reset.disabled = true;
  }
};
