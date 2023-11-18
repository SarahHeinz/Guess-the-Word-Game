const guessedLetter = document.querySelector(".guessed-letters");
const guessButton = document.querySelector (".guess");
const remainGuess = document.querySelector (".remaining");
const remainGuessSpan = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const playAgain = document.querySelector (".play-again");
const wordProgress = document.querySelector (".word-in-progress");
const letterInput = document.querySelector (".letter");

const word = "magnolia";

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    // create array
    const placeholderLetters = [];

    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    } 
    wordProgress.innerText = placeholderLetters.join("");
}
placeholder (word);

guessButton.addEventListener ("click", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
});