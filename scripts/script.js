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

const currentRandom = randNum();
console.log(currentRandom);

// Updates The Header Guide
function updateHeader(txt) {
  headerText.textContent = txt;
}

function updateScore(reset = false) {
  let roundScore = parseInt(score.textContent);

  if (reset) {
    highScore.textContent = roundScore;
    score.textContent = 0;
  } else {
    roundScore -= 1;
    score.textContent = roundScore;
  }
}

// Guide Judge
function checkStatus(status) {
  if (status === 0) {
    updateHeader("You Won!");
    updateScore(true);
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
  checkStatus(currentRandom - enterdNum);
});

resetBtn.addEventListener("click", () => {
  updateScore((resetAll = true));
});
