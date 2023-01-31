const input = document.querySelector(".input")
const hint = document.querySelector("#hint")
const remaining = document.querySelector("#remaining")
const wrong = document.querySelector("#wrong")
const btn = document.querySelector("button")
const typingInput = document.querySelector(".typing-input")

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function fetchWord() {
    let item = wordList[Math.floor(Math.random() * wordList.length)];
    word = item.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    hint.innerText = item.hint;
    remaining.innerText = maxGuesses;
    wrong.innerText = incorrectLetters;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        input.innerHTML = html;
    }
    incorrectLetters = []
    correctLetters = []
}
fetchWord();

function startGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    input.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        remaining.innerText = maxGuesses;
        wrong.innerText = incorrectLetters;
    }
    typingInput.value = "";
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return fetchWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                input.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}
btn.onclick = fetchWord
typingInput.oninput = startGame
input.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());