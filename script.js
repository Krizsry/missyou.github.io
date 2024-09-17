"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 5;
const MOVE_YES_BUTTON_AFTER_CLICKS = 5;
const NUM_BUTTON_CLONES = 10;

let play = true;
let noCount = 0;

yesButton.disabled = true;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;

    if (noCount === 1) {
      yesButton.disabled = false;
    }

    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();

    if (noCount >= MOVE_YES_BUTTON_AFTER_CLICKS) {
      createButtonClones();
    }

    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "Yayyy!! :3";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");

  const yesSound = new Audio('hi.mp3');
  yesSound.play();

  // Remove all cloned buttons
  const buttonContainers = document.querySelectorAll(".button-container");
  buttonContainers.forEach(container => container.remove());
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  const newFontSize = fontSize * 1.6;

  yesButton.style.fontSize = `${newFontSize}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "Misclicked?",
    "Pookie please",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
  ];

  const messageIndex = Math.min(noCount, messages.length - 1);
  return messages[messageIndex];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}

function createButtonClones() {
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  document.body.appendChild(buttonContainer);

  const buttonSize = Math.min(window.innerWidth / NUM_BUTTON_CLONES, window.innerHeight / NUM_BUTTON_CLONES);
  
  for (let i = 0; i < NUM_BUTTON_CLONES; i++) {
    const buttonClone = yesButton.cloneNode(true);
    buttonClone.classList.add("btn--clone");
    buttonClone.style.position = "absolute";
    buttonClone.style.width = `${buttonSize}px`;
    buttonClone.style.height = `${buttonSize}px`;
    buttonClone.style.fontSize = `${buttonSize / 4}px`;
    buttonClone.style.display = "flex";
    buttonClone.style.alignItems = "center";
    buttonClone.style.justifyContent = "center";
    buttonContainer.appendChild(buttonClone);
    positionButtonClone(buttonClone, buttonSize);

    buttonClone.addEventListener("click", handleYesClick);
  }
}

function positionButtonClone(buttonClone, buttonSize) {
  const maxWidth = window.innerWidth - buttonSize;
  const maxHeight = window.innerHeight - buttonSize;

  const randomX = Math.random() * maxWidth;
  const randomY = Math.random() * maxHeight;

  buttonClone.style.left = `${randomX}px`;
  buttonClone.style.top = `${randomY}px`;
}
