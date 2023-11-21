const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const remainGuess = document.querySelector(".remaining");
const remainGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const wordProgress = document.querySelector(".word-in-progress");
const letterInput = document.querySelector(".letter");

const word = "magnolia";
const guessedLetters = [];

// Display our symbols as placeholders for the chosen word's letters
const placeholder = function (word) {
    // create array
    const placeholderLetters = [];

    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message paragraph
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        // We've got a letter! Let's guess!
        makeGuess(guess);
    }
    letterInput.value = "";
});

// Validate Player Input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    // empty input?
    if (input.length === 0) {
        message.innerText = "Please enter a letter!";
        // more then 1 letter?
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter.";
        // something else then a letter?
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from a-z.";
        // one single letter!
    } else {
        return input;
    }
};

// Capture Input
const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already have guessed this letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateWordProgress(guessedLetters);
    }
};

// Create a Function to Show the Guessed Letter
const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

// Create a Function to Update the Word in Progress
const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordProgress.innerText = revealWord.join("");
    checkWin();
};

// Create a Function to Check If the Player Won
const checkWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML= `<p class="highlight">You guessed the word correct! Congrats!</p>`;
    }
};