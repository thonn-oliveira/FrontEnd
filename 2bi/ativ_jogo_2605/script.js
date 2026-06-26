const solution = "TERMO";
const maxAttempts = 6;
const wordSize = 5;

const words = ["TERMO", "LIVRO", "CAMPO", "JOGOS", "FESTA", "MUNDO", "PLACA", "FORCA"];

let currentRow = 0;
let currentCol = 0;
let currentGuess = "";
let gameOver = false;

const board = document.getElementById("board");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

function createBoard() {
  board.innerHTML = "";

  for (let row = 0; row < maxAttempts; row++) {
    const rowElement = document.createElement("div");
    rowElement.className = "row";

    for (let col = 0; col < wordSize; col++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.setAttribute("aria-label", `Linha ${row + 1}, letra ${col + 1}`);
      rowElement.appendChild(tile);
    }

    board.appendChild(rowElement);
  }
}

function createKeyboard() {
  keyboard.innerHTML = "";

  keys.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.className = "keyboard-row";

    row.forEach((key) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = key === "Backspace" ? "Apagar" : key;
      button.dataset.key = key;
      button.className = key.length > 1 ? "key key-wide" : "key";
      button.addEventListener("click", () => handleKey(key));
      rowElement.appendChild(button);
    });

    keyboard.appendChild(rowElement);
  });
}

function handleKey(key) {
  if (gameOver) return;

  if (key === "Enter") {
    submitGuess();
    return;
  }

  if (key === "Backspace") {
    removeLetter();
    return;
  }

  if (/^[A-Z]$/.test(key)) {
    addLetter(key);
  }
}

function addLetter(letter) {
  if (currentCol >= wordSize) return;

  currentGuess += letter;
  getTile(currentRow, currentCol).textContent = letter;
  getTile(currentRow, currentCol).classList.add("filled");
  currentCol++;
  setMessage("");
}

function removeLetter() {
  if (currentCol <= 0) return;

  currentCol--;
  currentGuess = currentGuess.slice(0, -1);
  const tile = getTile(currentRow, currentCol);
  tile.textContent = "";
  tile.className = "tile";
}

function submitGuess() {
  if (currentGuess.length < wordSize) {
    setMessage("Digite uma palavra com 5 letras.");
    shakeRow();
    return;
  }

  if (!words.includes(currentGuess)) {
    setMessage("Palavra fora da lista.");
    shakeRow();
    return;
  }

  revealGuess();

  if (currentGuess === solution) {
    gameOver = true;
    setMessage("Parabens, voce acertou!");
    restartButton.hidden = false;
    return;
  }

  currentRow++;
  currentCol = 0;
  currentGuess = "";

  if (currentRow === maxAttempts) {
    gameOver = true;
    setMessage(`Fim de jogo. A palavra era ${solution}.`);
    restartButton.hidden = false;
  }
}

function revealGuess() {
  const solutionLetters = solution.split("");
  const guessLetters = currentGuess.split("");
  const statuses = Array(wordSize).fill("absent");

  guessLetters.forEach((letter, index) => {
    if (letter === solutionLetters[index]) {
      statuses[index] = "correct";
      solutionLetters[index] = "";
      guessLetters[index] = "";
    }
  });

  guessLetters.forEach((letter, index) => {
    if (!letter) return;

    const foundIndex = solutionLetters.indexOf(letter);
    if (foundIndex !== -1) {
      statuses[index] = "present";
      solutionLetters[foundIndex] = "";
    }
  });

  statuses.forEach((status, index) => {
    const tile = getTile(currentRow, index);
    const letter = currentGuess[index];
    tile.classList.add(status);
    updateKeyboard(letter, status);
  });
}

function updateKeyboard(letter, status) {
  const key = keyboard.querySelector(`[data-key="${letter}"]`);
  if (!key) return;

  const priority = { absent: 1, present: 2, correct: 3 };
  const currentStatus = key.dataset.status;

  if (!currentStatus || priority[status] > priority[currentStatus]) {
    key.dataset.status = status;
    key.classList.remove("absent", "present", "correct");
    key.classList.add(status);
  }
}

function getTile(row, col) {
  return board.children[row].children[col];
}

function setMessage(text) {
  message.textContent = text;
}

function shakeRow() {
  const row = board.children[currentRow];
  row.classList.remove("shake");
  void row.offsetWidth;
  row.classList.add("shake");
}

function restartGame() {
  currentRow = 0;
  currentCol = 0;
  currentGuess = "";
  gameOver = false;
  restartButton.hidden = true;
  setMessage("");
  createBoard();
  createKeyboard();
}

document.addEventListener("keydown", (event) => {
  const key = event.key === "Backspace" || event.key === "Enter"
    ? event.key
    : event.key.toUpperCase();

  handleKey(key);
});

restartButton.addEventListener("click", restartGame);

createBoard();
createKeyboard();
