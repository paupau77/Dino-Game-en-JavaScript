const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverDiv = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');
let isJumping = false;
let score = 0;
let gameInterval;
let isGameOver = false;
function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  let position = 0;
  const jumpHeight = 100;
  const upInterval = setInterval(() => {
    if (position >= jumpHeight) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 10;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}
function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  if (
    dinoRect.right > obstacleRect.left + 5 &&
    dinoRect.left < obstacleRect.right - 5 &&
    dinoRect.bottom > obstacleRect.top + 5 &&
    dinoRect.top < obstacleRect.bottom - 5
  ) {
    return true;
  }
  return false;
}
function updateScore() {
  if (isGameOver) return;
  score++;
  scoreDisplay.textContent = score.toString().padStart(2, '0');
}
function startGame() {
  score = 0;
  scoreDisplay.textContent = '00';
  gameOverDiv.classList.add('hidden');
  obstacle.style.animationPlayState = 'running';
  isGameOver = false;
  gameInterval = setInterval(() => {
    if (checkCollision()) {
      endGame();
    } else {
      updateScore();
    }
  }, 100);
}
function endGame() {
  clearInterval(gameInterval);
  obstacle.style.animationPlayState = 'paused';
  gameOverDiv.classList.remove('hidden');
  isGameOver = true;
}
document.addEventListener('keydown', e => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    jump();
  }
});
restartBtn.addEventListener('click', () => {
  dino.style.bottom = '0px';
  startGame();
});
startGame();