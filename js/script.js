const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const remainGuess = document.querySelector(".remaining");
const remainGuessSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const wordProgress = document.querySelector(".word-in-progress");
const letterInput = document.querySelector(".letter");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const selectRandomWord = Math.floor(Math.random() * wordArray.length);
    word = wordArray[selectRandomWord].trim();
    placeholder(word);
};
getWord();

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter!";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from a-z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already have guessed this letter.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuessedLetters();
        updateRemainingGuesses(guess);
        updateWordProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

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

const updateRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, this word does not contain ${guess}. Try again!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Congrats! The word contains the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Oh no! There are no guesses left. The word was <span class="highlight">${word}</span>.`;
        startOver();
    }
    else if (remainingGuesses === 1) {
        remainGuessSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainGuessSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correct! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainGuess.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersElement.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    remainGuessSpan.innerText = `You have ${remainingGuesses} guesses.`;
  getWord();
    
    guessButton.classList.remove("hide");
    remainGuess.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgain.classList.add("hide");
});
