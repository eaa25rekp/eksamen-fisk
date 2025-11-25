"use strict";

const dodger = document.getElementById("dodger");
const scoreElement = document.getElementById("points");
let score = 0;
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startknap");
const startMascot = document.getElementById("startMascot");

// Maskot animation
const mascotSound = new Audio("../audio/spil2Lyd.m4a");

if (startMascot) {
  // skift til gif når siden loader
  startMascot.src = "../img/talknemofish.gif";
  mascotSound.play();

  // skift tilbage til png når lyden er færdig
  mascotSound.addEventListener("ended", function () {
    startMascot.src = "../img/Nemo-fish.png";
  });
}

const backgroundMusic = new Audio("../audio/meditation.mp3");
const coinSound = new Audio("../audio/escape.wav");
const gameoverSound = new Audio("../audio/gameover_sound.m4a");


// Funktion til at starte baggrundsmusik
function playBackgroundMusic() {
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
}

// Funktion til at stoppe baggrundsmusik
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

// Start spillet når knappen klikkes
startButton.addEventListener("click", function () {
  startScreen.style.display = "none";
  playBackgroundMusic();
});

// Sæt fisken som baggrundsbillede
dodger.style.backgroundImage = "url('../img/scubamand.png')";

// Funktion til at tjekke kollision med forhindringer (koraller)
function checkStructureCollision() {
  const dodgerRect = dodger.getBoundingClientRect();
  const structures = document.getElementsByClassName("structure");

  for (let structure of structures) {
    const structureRect = structure.getBoundingClientRect();
    if (
      dodgerRect.left < structureRect.right &&
      dodgerRect.right > structureRect.left &&
      dodgerRect.top < structureRect.bottom &&
      dodgerRect.bottom > structureRect.top
    ) {
      return true; // Kollision med koral
    }
  }
  return false;
}

// Funktion til at tjekke om fisken har fanget maden
function checkCollision() {
  const dodgerRect = dodger.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  // Tjek først for kollision med koraller
  if (checkStructureCollision()) {
    showGameOver();
    return;
  }

  // Tjek kollision med normal mad
  if (
    dodgerRect.left < coinRect.right &&
    dodgerRect.right > coinRect.left &&
    dodgerRect.top < coinRect.bottom &&
    dodgerRect.bottom > coinRect.top
  ) {
    // Collision detected!
    score += 10;
    scoreElement.textContent = score;
    playCoinSound();

    // Vis +10 notifikation
    try {
      const gameEl = document.getElementById("game");
      const notif = document.createElement("span");
      notif.className = "pickup-notif small";
      notif.textContent = "+10";
      const gameRect = gameEl.getBoundingClientRect();
      const left = coinRect.left - gameRect.left;
      const bottom = gameRect.bottom - coinRect.bottom;
      notif.style.left = `${left}px`;
      notif.style.bottom = `${bottom}px`;
      gameEl.appendChild(notif);
      setTimeout(() => {
        notif.classList.add("fade-out");
        setTimeout(() => notif.remove(), 600);
      }, 400);
    } catch (e) {
      // ignore positioning errors
    }
    moveCoinToNewPosition();
  }
}

// Flyt mad til ny tilfældig position
function moveCoinToNewPosition() {
  const gameWidth = 360;
  const gameHeight = 360;
  const randomX = Math.floor(Math.random() * gameWidth);
  const randomY = Math.floor(Math.random() * gameHeight);

  coin.style.left = `${randomX}px`;
  coin.style.bottom = `${randomY}px`;
}

// Lyd funktioner
function playMovement() {
  const movement = new Audio("../audio/bobler2.mp3");
  if (movement) {
    movement.currentTime = 0;
    movement.play().catch((err) => {});
  }
}

function playGameOverSound() {
  if (gameoverSound) {
    gameoverSound.currentTime = 0;
    gameoverSound.play().catch((err) => {});
  }
}

function playCoinSound() {
  const coinSound = document.getElementById("coinSound");
  if (coinSound) {
    coinSound.currentTime = 0;
    coinSound.play().catch((err) => {});
  }
}

// Game Over skærm
function showGameOver() {
  const gameOverScreen = document.getElementById("gameOverScreen");
  const finalScoreElement = document.getElementById("finalScore");
  finalScoreElement.textContent = score;
  gameOverScreen.style.display = "flex";
  playGameOverSound();
  stopBackgroundMusic();
}

// Genstart spillet
function resetGame() {
  score = 0;
  scoreElement.textContent = "0";
  dodger.style.bottom = "180px";
  dodger.style.left = "180px";
  moveCoinToNewPosition();
  document.getElementById("gameOverScreen").style.display = "none";
}

// Event listeners
document.getElementById("restartButton").addEventListener("click", resetGame);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") moveDodgerLeft();
  if (event.key === "ArrowRight") moveDodgerRight();
  if (event.key === "ArrowUp") moveDodgerUp();
  if (event.key === "ArrowDown") moveDodgerDown();
});

// Bevægelse funktioner
function moveDodgerLeft() {
  const left = parseInt(dodger.style.left.replace("px", ""), 10);
  if (left > 0) {
    dodger.style.left = `${left - 5}px`;
    dodger.style.transform = "scaleX(-1)";
    playMovement();
    checkCollision();
  } else {
    showGameOver();
  }
}

function moveDodgerRight() {
  const left = parseInt(dodger.style.left.replace("px", ""), 10);
  if (left < 360) {
    dodger.style.left = `${left + 5}px`;
    dodger.style.transform = "scaleX(1)";
    playMovement();
    checkCollision();
  } else {
    showGameOver();
  }
}

function moveDodgerUp() {
  const bottom = parseInt(dodger.style.bottom.replace("px", ""), 10);
  if (bottom < 360) {
    dodger.style.bottom = `${bottom + 5}px`;
    dodger.style.transform = "rotate(-90deg)";
    playMovement();
    checkCollision();
  } else {
    showGameOver();
  }
}

function moveDodgerDown() {
  const bottom = parseInt(dodger.style.bottom.replace("px", ""), 10);
  if (bottom > 0) {
    dodger.style.bottom = `${bottom - 5}px`;
    dodger.style.transform = "rotate(90deg)";
    playMovement();
    checkCollision();
  } else {
    showGameOver();
  }
}

resetGame();
