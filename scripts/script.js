const headerText = document.getElementById("header__title--text");
const score = document.querySelector(".scoreboard--score > span");
const highScore = document.querySelector(".scoreboard--highscore > span");
const input = document.getElementById("game__body--input");
const checkBtn = document.getElementById("game__body--check");
const resetBtn = document.getElementById("game__body--reset");

// Random Number Generator
function randNum() {
  return Math.trunc(Math.random() * 50) + 1;
}

// Takes User Input
function takeInput() {
  return parseInt(input.value);
}

let currentRandom = randNum();

// Updates The Header Guide
function updateHeader(txt) {
  headerText.textContent = txt;
}

function updateScore() {
  let roundScore = parseInt(score.textContent);

  roundScore -= 1;
  score.textContent = roundScore;
}

function updateHighScore(reset) {
  if (reset) {
    highScore.textContent = 0;
    input.value = "";
    updateHeader("Guess my Number");
    blockInput(false);
  } else {
    highScore.textContent = score.textContent;
  }

  currentRandom = randNum();
  score.textContent = 20;
}

function resetAnimation(add) {
  if (add) {
    resetBtn.classList.add("neon-animation");
  } else {
    resetBtn.classList.remove("neon-animation");
  }
}

function isLost() {
  resetAnimation(true);
  updateHighScore(true);
  updateHeader("Loser! Loser! Loser!");
  score.textContent = 20;
  blockInput(true);
}

function blockInput(block) {
  if (block) {
    input.setAttribute("disabled", true);
  } else {
    input.removeAttribute("disabled");
  }
}

// Guide Judge
function checkStatus(status) {
  if (status === 0) {
    updateHeader("You Won!");
    updateScore();
    updateHighScore(false);
    resetAnimation(true);
  } else if (status <= -20 || status >= 20) {
    updateHeader("Too Far Away");
    updateScore();
  } else if (status <= -10 || status >= 10) {
    updateHeader("Far");
    updateScore();
  } else if (status <= -5 || status >= 5) {
    updateHeader("Close");
    updateScore();
  } else if (status <= -1 || status >= 1) {
    updateHeader("Too Close");
    updateScore();
  }
}

checkBtn.addEventListener("click", () => {
  const enterdNum = takeInput();

  if (parseInt(score.textContent) === 1) {
    isLost();
  } else {
    checkStatus(currentRandom - enterdNum);
  }
});

resetBtn.addEventListener("click", () => {
  updateHighScore(true);
  resetAnimation(false);
});
