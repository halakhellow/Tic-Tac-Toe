"use strict";
let modal = document.getElementById("modal"),
  title = document.getElementById("title"),
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
  title.classList.add("animation");
  cells.forEach((cell) => cell.addEventListener("click", addMove));
}

function isCellEmpty(cell) {
  return cell.innerHTML === "";
}

function addMove(cell) {
  let index = cell.target.id.replace("cell", "");
  if (isCellEmpty(cells[index])) {
    if (gameEnded) return;
    else {
      if (currentPlayer === "O") cells[index].classList.add("player-o");
      cells[index].innerHTML = currentPlayer;
      cells[index].classList.add("filled");
      playersMoves[index] = currentPlayer;
      reset.disabled = false;
      checkWinner();
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

function checkWinner() {
  let gameWon = false;
  let winCells = [];
  winningConditions.map((condition) => {
    let arr = [
      playersMoves[condition[0]],
      playersMoves[condition[1]],
      playersMoves[condition[2]],
    ];
    if (arr.every((element) => element === arr[0]) && arr[0] !== "") {
      gameWon = true;
      winCells = condition;
    }
  });
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
  changePlayer();
  if (!playersMoves.includes("")) tieResult();
}

function tieResult() {
  gameEnded = true;
  gameStatus.classList.add("tie");
  cells.map((cell) => cell.classList.add("win-tie"));
  return (gameStatus.innerHTML = "it's a Tie ! &#128577;");
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
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
    title.classList.remove("animation");
    gameStatus.classList.remove("winner-message", "tie");
    gameStatus.innerHTML = "";
    playersMoves = ["", "", "", "", "", "", "", "", ""];
    reset.disabled = true;
  }
};
