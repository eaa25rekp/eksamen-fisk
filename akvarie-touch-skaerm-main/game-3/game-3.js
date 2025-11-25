// hent alle HTML elementer jeg skal bruge
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const gameContainer = document.getElementById("gameContainer");
const fishContainer = document.getElementById("fishContainer");
const scoreElement = document.getElementById("score");
const winScreen = document.getElementById("winScreen");
const finalScoreElement = document.getElementById("finalScore");
const playAgainBtn = document.getElementById("playAgainBtn");
const blueBucket = document.getElementById("blueBucket");
const orangeBucket = document.getElementById("orangeBucket");
const startMascot = document.getElementById("startMascot");

// Maskot animation
const mascotSound = new Audio("../audio/spil3Lyd.m4a");

if (startMascot) {
  // skift til gif når siden loader
  startMascot.src = "../img/talknemofish.gif";
  mascotSound.play();

  // skift tilbage til png når lyden er færdig
  mascotSound.addEventListener("ended", function () {
    startMascot.src = "../img/Nemo-fish.png";
  });
}

// lyd til når man dropper fisk
const coinSound = new Audio("../audio/bobler2.mp3");
const wrongSound = new Audio("../audio/wrong.wav");

// variabler til spillet
let score = 0;
let fishSorted = 0;
let totalFish = 10;
let draggedFish = null;

// lav alle fiskene
function createFish() {
  fishContainer.innerHTML = "";

  for (let i = 0; i < totalFish; i++) {
    const fish = document.createElement("div");
    fish.className = "fish";

    // vælg tilfældig fisk, blå eller orange
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
      fish.dataset.color = "blue";
      fish.innerHTML = '<img src="../img/BluefishDONE.gif" alt="blå fisk">';
    } else {
      fish.dataset.color = "orange";
      fish.innerHTML =
        '<img src="../img/OrangefishDONE.gif" alt="orange fisk">';
    }

    // sæt fisken et tilfældigt sted
    const randomLeft = Math.random() * 80;
    const randomTop = Math.random() * 60;
    fish.style.left = randomLeft + "%";
    fish.style.top = randomTop + "%";

    // gør fisken draggable
    fish.draggable = true;

    // når jeg starter med at trække fisken
    fish.addEventListener("dragstart", function () {
      draggedFish = fish;
      fish.style.opacity = "0.5";
    });

    // når jeg stopper med at trække
    fish.addEventListener("dragend", function () {
      fish.style.opacity = "1";
    });

    fishContainer.appendChild(fish);
  }
}

// når jeg trækker over en spand
blueBucket.addEventListener("dragover", function (event) {
  event.preventDefault();
  blueBucket.classList.add("hover");
});

orangeBucket.addEventListener("dragover", function (event) {
  event.preventDefault();
  orangeBucket.classList.add("hover");
});

// når jeg forlader en spand
blueBucket.addEventListener("dragleave", function () {
  blueBucket.classList.remove("hover");
});

orangeBucket.addEventListener("dragleave", function () {
  orangeBucket.classList.remove("hover");
});

// når jeg slipper fisken i blå spand
blueBucket.addEventListener("drop", function (event) {
  event.preventDefault();
  blueBucket.classList.remove("hover");

  const fishColor = draggedFish.dataset.color;

if (fishColor === "blue") {
  // korrekt!
  coinSound.play();
  score = score + 1;
  scoreElement.textContent = score;
  draggedFish.remove();
  fishSorted = fishSorted + 1;
} else {
  // forkert farve
  wrongSound.play();
}

// tjek om alle fisk er sorteret
if (fishSorted === totalFish) {
  setTimeout(showWinScreen, 500);
}
});

// når jeg slipper fisken i orange spand
orangeBucket.addEventListener("drop", function (event) {
  event.preventDefault();
  orangeBucket.classList.remove("hover");

  const fishColor = draggedFish.dataset.color;

if (fishColor === "orange") {
  // korrekt!
  coinSound.play();
  score = score + 1;
  scoreElement.textContent = score;
  draggedFish.remove();
  fishSorted = fishSorted + 1;
} else {
  // forkert farve
  wrongSound.play();
}

// tjek om alle fisk er sorteret
if (fishSorted === totalFish) {
  setTimeout(showWinScreen, 500);
}
});

const winMusic = new Audio();
winMusic.src = "../audio/victory.wav";

function playWinMusic() {
  winMusic.volume = 0.1;
  winMusic.play().catch((err) => console.log("Musik fejl:", err));
}

// vis sejrs-skærm
function showWinScreen() {
  finalScoreElement.textContent = score;
  winScreen.classList.add("show");
  winMusic.play();
}

// nulstil spillet
function resetGame() {
  score = 0;
  fishSorted = 0;
  scoreElement.textContent = 0;
  winScreen.classList.remove("show");
  createFish();
}

const backgroundMusic = new Audio();
backgroundMusic.src = "../audio/meditation.mp3";

function playBackgroundMusic() {
  backgroundMusic.volume = 0.1;
  backgroundMusic.play().catch((err) => console.log("Musik fejl:", err));
}

// start spillet
function startGame() {
  startScreen.style.display = "none";
  gameContainer.style.display = "flex";
  playBackgroundMusic();
  createFish();
}

// event listeners - hvad sker der når man klikker
startButton.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", resetGame);
