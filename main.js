const lettersBox = document.querySelector(".letters-box");
const allLetters = [..."abcdefghijklmnopqrstuvwxyz"];

allLetters.forEach((letter, index) => {
  const button = document.createElement("a");
  lettersBox.appendChild(button);
  button.classList.add(`letter-${index + 1}`);
  button.textContent = letter.toUpperCase();
  button.addEventListener("click", () => {
    button.classList.add("clicked");
  });
});
