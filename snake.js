const playBoard = document.querySelector(".play-board");
const scoreVal = document.querySelector(".score .score-val");
const gameOverBox = document.querySelector(".game-over-box");
const gameOverScore = document.querySelector(".score-over-score");
const restartBtn = document.querySelector(".restart-btn");

let gameEnd = false;
let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let moveX = 0,
  moveY = 0;
let snakeBody = [];
let IntervalId;
let score = 0;
const createGame = () => {
  if (gameEnd) return EndGame();
  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    snakeBody.push([snakeX, snakeY]);
    score++;
    scoreVal.innerHTML = score;
    gameOverScore.innerHTML = score;
  }

  snakeX += moveX;
  snakeY += moveY;

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  snakeBody[0] = [snakeX, snakeY];

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameEnd = true;
  }

  let li = `<div class="food" style="grid-area: ${foodY} / ${foodX};"></div>`;
  for (let i = 0; i < snakeBody.length; i++) {
    li += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"></div>`;

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameEnd = true;
    }
  }
  playBoard.innerHTML = li;
};

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  if (e.classList.contains("ArrowLeft")) {
    moveX = -1;
    moveY = 0;
  } else if (e.classList.contains("ArrowUp")) {
    moveX = 0;
    moveY = -1;
  } else if (e.classList.contains("ArrowDown")) {
    moveX = 0;
    moveY = 1;
  } else if (e.classList.contains("ArrowRight")) {
    moveX = 1;
    moveY = 0;
  }
  createGame();
};

const EndGame = () => {
  clearInterval(IntervalId);
  gameOverBox.style.display = "flex";
};

restartBtn.addEventListener("click", () => {
  location.reload();
});

changeFoodPosition();
IntervalId = setInterval(createGame, 100);
createGame();

document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.keyCode === 37) {
    changeDirection(document.querySelector(".ArrowLeft"));
  } else if (event.key === "w" || event.keyCode === 38) {
    changeDirection(document.querySelector(".ArrowUp"));
  } else if (event.key === "s" || event.keyCode === 40) {
    changeDirection(document.querySelector(".ArrowDown"));
  } else if (event.key === "d" || event.keyCode === 39) {
    changeDirection(document.querySelector(".ArrowRight"));
  } else if (event.keyCode === 13) {
    restartBtn.click();
  }
});
