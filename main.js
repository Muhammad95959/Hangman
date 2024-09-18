const lettersBox = document.querySelector(".letters-box");
const wordBox = document.querySelector(".word-box");

fetch("database/words.json")
  .then((r) => r.json())
  .then((wordsArr) => {
    const currentWordObj =
      wordsArr[Math.floor(Math.random() * wordsArr.length)];
    document.querySelector("header .category-title").textContent =
      currentWordObj.category;
    document.body.style.transition = "opacity 1s";
    document.body.style.opacity = "100%";
    setupLetterBox();
    const currentWord = currentWordObj.word;
    setupWordBox(currentWord);
  })
  .catch((error) => console.log("Error: " + error));

function setupLetterBox() {
  [..."abcdefghijklmnopqrstuvwxyz"].forEach((letter, index) => {
    const button = document.createElement("a");
    lettersBox.appendChild(button);
    button.classList.add(`letter-${index + 1}`);
    button.textContent = letter.toUpperCase();
    button.addEventListener("click", () => {
      button.classList.add("clicked");
    });
  });
}

function setupWordBox(currentWord) {
  for (let i = 0; i < currentWord.length; i++) {
    const p = document.createElement("p");
    wordBox.appendChild(p);
    p.classList.add(`letter-${i + 1}`);
    if (currentWord[i] === " ") p.classList.add("space");
  }
}
