const lettersBox = document.querySelector(".letters-box");
const wordBox = document.querySelector(".word-box");
const resultMessage = document.querySelector(".result-message");
const playAgainBtn = document.querySelector(".play-again");
let allLetters = [..."abcdefghijklmnopqrstuvwxyz"];
let currentWord, currentWordLength, remainingWordLetters;
let hangmanDrawingParts = 8;
let wrongAttempts = 0;

fetch("database/words.json")
  .then((r) => r.json())
  .then((wordsArr) => {
    const currentWordObj =
      wordsArr[Math.floor(Math.random() * wordsArr.length)];
    currentWord = currentWordObj.word;
    currentWordLength = currentWord.length;
    remainingWordLetters = [...currentWord];
    console.log(currentWord); // for debugging
    document.querySelector("header .category-title").textContent =
      currentWordObj.category;
    document.body.style.visibility = "visible";
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "100%";
    setupLetterBox();
    setupWordBox();
    playAgainBtn.onclick = () => window.location.reload();
  })
  .catch((error) => console.log("Error: " + error));

function setupLetterBox() {
  allLetters.forEach((letter, index) => {
    const button = document.createElement("a");
    lettersBox.appendChild(button);
    button.classList.add(`letter-${index + 1}`);
    button.textContent = letter.toUpperCase();
    button.addEventListener("click", () => setupLetterButton(button));
  });
}

function setupWordBox() {
  for (let i = 0; i < currentWord.length; i++) {
    const p = document.createElement("p");
    wordBox.appendChild(p);
    p.classList.add(`letter-${i + 1}`);
    if (currentWord[i] === " ") p.classList.add("space");
  }
}

function setupLetterButton(button) {
  if (
    /^[# ]+$/.test(remainingWordLetters.join("")) ||
    wrongAttempts === hangmanDrawingParts
  ) {
    return;
  }
  let correctLetter = false;
  button.classList.add("clicked");
  [...currentWord].forEach((char, index) => {
    if (button.textContent === char.toUpperCase()) {
      correctLetter = true;
      remainingWordLetters.splice(index, 1, "#");
      document.querySelector(`.word-box .letter-${index + 1}`).textContent =
        char.toUpperCase();
    }
  });
  if (!correctLetter) {
    wrongAttempts++;
    const drawingPart = document.querySelector(`.part-${wrongAttempts}`);
    drawingPart.style.visibility = "visible";
    drawingPart.style.opacity = "100%";
  }
  if (/^[# ]+$/.test(remainingWordLetters.join(""))) {
    resultMessage.textContent = "You Did It, well done!";
    lettersBox.classList.add("end");
    playAgainBtn.style.visibility = "visible";
  } else if (wrongAttempts === hangmanDrawingParts) {
    resultMessage.innerHTML = `Nice try, genius. The word was: <span>${currentWord}</span>`;
    lettersBox.classList.add("end");
    playAgainBtn.style.visibility = "visible";
  }
}
