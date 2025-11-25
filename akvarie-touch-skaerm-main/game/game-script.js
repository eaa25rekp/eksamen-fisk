"use strict";

// Elementer
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const gameArea = document.getElementById("gameArea");
const scoreElement = document.getElementById("points");
const startMascot = document.getElementById("startMascot");

// Maskot animation
const mascotSound = new Audio("../audio/spil1Lyd.m4a");

if (startMascot) {
  // skift til gif når siden loader
  startMascot.src = "../img/talknemofish.gif";
  mascotSound.play();

  // skift tilbage til png når lyden er færdig
  mascotSound.addEventListener("ended", function () {
    startMascot.src = "../img/Nemo-fish.png";
  });
}

// Spil variabler
let score = 0;
let fishInterval;

// Fiske billeder
const fishImages = [
  "../img/BluefishDONE.gif",
  "../img/OrangefishDONE.gif",
  "../img/big-pufferfish-swim.gif",
  "../img/damsel-fish-swim.gif",
  "../img/flat-pufferfish-swim.gif",
  "../img/tuxedo-fish.gif",
];

const backgroundMusic = new Audio("../audio/meditation.mp3");

// Start spillet
startButton.addEventListener("click", function () {
  startScreen.style.display = "none";
  gameContainer.style.display = "block";
  playBackgroundMusic();
  startGame();
});

// Baggrundsmusik
function playBackgroundMusic() {
  backgroundMusic.volume = 0.1;
  backgroundMusic.play().catch((err) => console.log("Musik fejl:", err));
}

const clickSound = new Audio("../audio/bobler2.mp3");

// Lyd når man klikker på fisk
function playClickSound() {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.volume = 0.5;
    clickSound.play().catch((err) => {});
  }
}

// Start spil loop
function startGame() {
  // Spawn første fisk med det samme
  spawnFish();

  // Spawn ny fisk hvert 2. sekund
  fishInterval = setInterval(() => {
    spawnFish();
  }, 2000);
}

// Spawn en tilfældig fisk
function spawnFish() {
  // Vælg tilfældig fisk
  const randomFish = fishImages[Math.floor(Math.random() * fishImages.length)];

  // Tilfældig position (ikke helt ude ved kanterne)
  const randomX = Math.random() * (window.innerWidth - 200) + 50;
  const randomY = Math.random() * (window.innerHeight - 250) + 100;

  // Tilfældig størrelse (mellem 100px og 180px)
  const randomSize = Math.floor(Math.random() * 80) + 100;

  // Opret fisk element
  const fish = document.createElement("div");
  fish.className = "fish";
  fish.style.left = `${randomX}px`;
  fish.style.top = `${randomY}px`;
  fish.style.width = `${randomSize}px`;
  fish.style.height = `${randomSize}px`;

  // Tilføj fisk billede
  const fishImg = document.createElement("img");
  fishImg.src = randomFish;
  fishImg.alt = "fisk";
  fish.appendChild(fishImg);

  // Tilføj click event
  fish.addEventListener("click", function () {
    catchFish(fish);
  });

  // Tilføj til game area
  gameArea.appendChild(fish);

  // Fjern fisk efter 4 sekunder hvis ikke klikket
  setTimeout(() => {
    if (fish.parentElement) {
      fish.remove();
    }
  }, 4000);
}

// Når man fanger en fisk
function catchFish(fish) {
  // Tilføj point
  score += 1;
  scoreElement.textContent = score;

  // Afspil lyd
  playClickSound();

  // Vis point popup
  showPointPopup(fish);

  // Animér fisk væk
  fish.classList.add("caught");

  // Fjern fisk efter animation
  setTimeout(() => {
    fish.remove();
  }, 500);

  // Spawn ny fisk med det samme
  setTimeout(() => {
    spawnFish();
  }, 300);
}

// Vis +1 point popup
function showPointPopup(fish) {
  const popup = document.createElement("div");
  popup.className = "point-popup";
  popup.textContent = "+1";

  // Position ved fisken
  const rect = fish.getBoundingClientRect();
  popup.style.left = `${rect.left + rect.width / 2}px`;
  popup.style.top = `${rect.top}px`;

  document.body.appendChild(popup);

  // Fjern efter animation
  setTimeout(() => {
    popup.remove();
  }, 1000);
}
