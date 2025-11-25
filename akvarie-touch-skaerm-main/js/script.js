"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // informations overlay

  // Informations overlay - Cille
  const fishInfo = [
    {
      className: "pufpuf",
      navn: "Kuglefisk",
      leveTid: "5-10 år",
      funFact: "Kuglefisken har en sjov bedsteven: delfinen!",
    },

    {
      className: "tuxie",
      navn: "Damselfish",
      leveTid: "5-7 år",
      funFact:
        "Damselfish er nogle kloge fisk der passer alger ligesom en bondemand passer majs",
    },

    {
      className: "diskus",
      navn: "Diskusfisk",
      leveTid: "8-12 år",
      funFact:
        "Diskusfisken kaldes for kongen af akvariet på grund af dens strålende farver",
    },

    {
      className: "orangy",
      navn: "Afrikanske Juvel Cichlide",
      leveTid: "7-15 år",
      funFact:
        "Den Afrikanske Juvel Cichlide er ikke altid en strålende orange. I visse sæsoner er en mørke grøn",
    },

    {
      className: "thereHorse",
      navn: "Søheste",
      leveTid: "4 år",
      funFact:
        "Søheste findes i over 11 farver alt efter området de lever i, deres humør og deres race",
    },
  ];

  const getFishfacts = document.getElementById("fishfacts");

  function showFishfacts(html) {
    if (getFishfacts) {
      getFishfacts.innerHTML = html;
      getFishfacts.classList.add("is-visible");
      setTimeout(function () {
        getFishfacts.classList.remove("is-visible");
      }, 8000);
    }
  }

  fishInfo.forEach((fish) => {
    document.querySelectorAll("." + fish.className).forEach((elem) => {
      elem.addEventListener("click", () => {
        const fishDetails = `
               <span class="fish-name">${fish.navn}</span>
               <div><span class="info-label">Levetid:</span> <span class="info-content">${fish.leveTid}</span></div>
               <div><span class="info-label">Fun fact:</span> <span class="info-content">${fish.funFact}</span></div>
               `;
        showFishfacts(fishDetails);
      });
    });
  });

  //Bagrundsmusik - Cille

  const mediBackgroundMusic = document.getElementById("medi-backgroundMusic");

  function playMediBackgroundMusic() {
    mediBackgroundMusic.volume = 0.4;
    mediBackgroundMusic
      .play()
      .catch((err) => console.log("Playback failed:", err));
    document.removeEventListener("click", playMediBackgroundMusic);
  }

  // Prøv at afspille med det samme
  playMediBackgroundMusic();

  // Hvis det ikke virker, afspil ved første klik
  document.addEventListener("click", playMediBackgroundMusic, { once: true });

  // Nemo intro
  const nemoIntro = document.getElementById("nemoIntro");
  const introSound = new Audio("audio/introLyd.m4a");

  // når man klikker på nemo afspilles lyden (lavet som click da det ikke virkede med autoplay men optimalt havde vi brugt autoplay)
  nemoIntro.addEventListener("click", function () {
    introSound.play();

    // fade out og fjern intro efter 9 sekunder
    setTimeout(function () {
      nemoIntro.classList.add("fade-out");
      setTimeout(function () {
        nemoIntro.remove();
      }, 1000); // vent 1 sekund på fade out animation
    }, 9000);
  });

  // Menu functionality
  const spilMenuBtn = document.getElementById("spilMenuBtn");
  const gameMenu = document.getElementById("gameMenu");
  const closeMenuBtn = document.getElementById("closeMenu");
  const menuMascot = document.getElementById("menuMascot");

  const menuSound = new Audio("audio/menuLyd.m4a");

  // åbner menu når man klikker på spil menu knappen:)
  if (spilMenuBtn && gameMenu) {
    spilMenuBtn.addEventListener("click", function () {
      gameMenu.classList.add("active");

      // skift til gif og afspil lyd
      if (menuMascot) {
        menuMascot.src = "img/talknemofish.gif";
        menuSound.play();

        // skift tilbage til png når lyden er færdig
        menuSound.addEventListener("ended", function () {
          menuMascot.src = "img/Nemo-fish.png";
        });
      }
    });
  }

  // lukker menu når man klikker på kryds
  if (closeMenuBtn && gameMenu) {
    closeMenuBtn.addEventListener("click", function () {
      gameMenu.classList.remove("active");
    });
  }

  //lukker menuen når man klikker udenfor menu conntet
  if (gameMenu) {
    gameMenu.addEventListener("click", function (e) {
      if (e.target === gameMenu) {
        gameMenu.classList.remove("active");
      }
    });
  }
  const tang = document.getElementById("seaweed");

  const tangSound = new Audio();
  tangSound.src = "audio/gudLyd.mp3";

  const tang2Image = new Image();
  // preload tang2 billedet
  tang2Image.src = "img/tang2.png";

  if (tang) {
    tang.addEventListener("click", function () {
      // skift mellem tang1.png og tang2.png
      if (tang.src.includes("tang1.png")) {
        tang.src = "img/tang2.png";
        tangSound.play();
      } else {
        tang.src = "img/tang1.png";
      }
    });
  }

  const mus = document.getElementById("seashell-closed");

  const musOpen = new Image();
  musOpen.src = "img/musOpen.png";

  const musSound = new Audio();
  musSound.src = "audio/burp-kort.mp3";

  // funktion til at lave bobler fra muslingen
  function createShellBubbles() {
    // Funktionen her laver mellem 0-8 bobler
    for (let i = 0; i < 8; i++) {
      setTimeout(function () {
        const bubble = document.createElement("div");
        bubble.className = "shell-bubble";

        // lidt tilfældig position så de ikke alle kommer fra samme sted
        const randomOffset = Math.random() * 40 - 20;
        bubble.style.left = 80 + randomOffset + "px";

        // lidt tilfældig størrelse
        const randomSize = 10 + Math.random() * 15;
        bubble.style.width = randomSize + "px";
        bubble.style.height = randomSize + "px";

        // lidt tilfældig delay i animation
        bubble.style.animationDelay = Math.random() * 0.3 + "s";

        document.body.appendChild(bubble);

        // fjern boblen efter animation er færdig
        setTimeout(function () {
          bubble.remove();
        }, 2500);
      }, i * 100); // delay mellem hver boble
    }
  }

  if (mus) {
    mus.addEventListener("click", function () {
      // skift mellem musLuk.png og musOpen.png
      if (mus.src.includes("musLuk.png")) {
        mus.src = "img/musOpen.png";
        musSound.play();
        createShellBubbles(); // lav bobler når muslingen åbner
      } else {
        mus.src = "img/musLuk.png";
      }
    });
  }

  // De 3 const her, er fordi vi har 3 foreskellige puffer fish i vores HTML :`-)
  const puffish = document.getElementById("puffish");
  const puffish2 = document.getElementById("puffish2");
  const puffish3 = document.getElementById("puffish3");

  const bigPufferImage = new Image();
  bigPufferImage.src = "img/big-pufferfish-swim.gif";

  //oppustnings lyd
  const poofSound = new Audio();
  poofSound.src = "audio/poof.wav";

  // Prut til purt fisk når den bliver lille
  const puffSound = new Audio();
  puffSound.src = "audio/prut.mp3";

  if (puffish) {
    puffish.addEventListener("click", function () {
      // skift mellem flat og big pufferfish
      if (puffish.src.includes("flat-pufferfish-swim.gif")) {
        puffish.src = "img/big-pufferfish-swim.gif";
        poofSound.play();
      } else {
        puffish.src = "img/flat-pufferfish-swim.gif";
        puffSound.play();
      }
    });
  }

  if (puffish2) {
    puffish2.addEventListener("click", function () {
      // skift mellem flat og big pufferfish
      if (puffish2.src.includes("flat-pufferfish-swim.gif")) {
        puffish2.src = "img/big-pufferfish-swim.gif";
        poofSound.play();
      } else {
        puffish2.src = "img/flat-pufferfish-swim.gif";
        puffSound.play();
      }
    });
  }

  if (puffish3) {
    puffish3.addEventListener("click", function () {
      // skift mellem flat og big pufferfish
      if (puffish3.src.includes("flat-pufferfish-swim.gif")) {
        puffish3.src = "img/big-pufferfish-swim.gif";
        poofSound();
      } else {
        puffish3.src = "img/flat-pufferfish-swim.gif";
        puffSound.play();
      }
    });
  }

  // Diverse animationer - Cille

  const magicSound = new Audio();
  magicSound.src = "audio/Transformation.wav";

  function toggleTux(tuxieToggle) {
    const tuxDam = tuxieToggle.currentTarget;

    if (tuxDam.src.includes("tuxedo-fish.gif")) {
      tuxDam.src = "img/damsel-fish-swim.gif";
    } else {
      tuxDam.src = "img/tuxedo-fish.gif";
    }

    magicSound.play();
  }

  document.querySelectorAll(".tuxie").forEach((tuxieDiv) => {
    tuxieDiv.addEventListener("click", toggleTux);
  });

  const orangies = document.querySelectorAll(".orangy");
  const bobbles = new Audio();
  bobbles.src = "audio/bobler1.mp3";

  orangies.forEach((orangy) => {
    orangy.addEventListener("click", () => {
      orangy.style.animationDuration = "1s";
      bobbles.play();

      setTimeout(() => {
        orangy.style.animationDuration = "";
      }, 7000);
    });
  });

  const discusFish = document.querySelectorAll(".diskus");
  const spinSound = new Audio();
  spinSound.src = "audio/spinny.wav";

  discusFish.forEach((diskus) => {
    diskus.addEventListener("click", function () {
      if (diskus.classList.contains("lefty")) {
        diskus.classList.add("spin-left");
        setTimeout(() => diskus.classList.remove("spin-left"), 2100);
      } else {
        diskus.classList.add("spin-right");
        setTimeout(() => diskus.classList.remove("spin-right"), 2100);
      }

      spinSound.play();
    });
  });

  const seahorses = document.querySelectorAll(".thereHorse");
  const neigh = new Audio();
  neigh.src = "audio/seahorseLyd.mp3";

  seahorses.forEach((thereHorse) => {
    thereHorse.addEventListener("click", function () {
      if (thereHorse.classList.contains("righty")) {
        thereHorse.classList.add("seahorseHop2");
        setTimeout(() => thereHorse.classList.remove("seahorseHop2"), 2100);
      } else {
        thereHorse.classList.add("seahorseHop");
        setTimeout(() => thereHorse.classList.remove("seahorseHop"), 2100);
      }
      neigh.play();
    });
  });
});
