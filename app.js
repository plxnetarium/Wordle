/*-------------------------------- Constants --------------------------------*/
const wordAnswers = [
    "apple", "beach", "brain", "bread", "brush",
    "candy", "chair", "child", "clock", "cloud",
    "dance", "dream", "dress", "drink", "earth",
    "every", "floor", "fresh", "fruit", "funny",
    "glass", "grape", "grass", "green", "happy",
    "heart", "horse", "house", "juice", "laugh",
    "lemon", "light", "lunch", "money", "mouse",
    "movie", "music", "night", "ocean", "paper",
    "phone", "pizza", "plant", "river", "sleep",
    "smile", "table", "tiger", "train", "water"]

const answer = wordAnswers[Math.floor(Math.random() * wordAnswers.length)];
const answerLetters = answer.split('');

console.log(wordAnswers)
console.log(answer)
console.log(answerLetters)

/*-------------------------------- Variables --------------------------------*/
let count = 0
let userWords = []
let currentRowIndex = 0;
let hasWon = false

/*------------------------ Cached Element References ------------------------*/
const rowOneEl = document.querySelector('#row1');
const keyboardEl = document.querySelectorAll('.key');
const rows = document.querySelectorAll('.row')
console.log(keyboardEl)

/*-------------------------------- Functions --------------------------------*/

/*
function rowOne() {
    for (let i = 0; i < rowOneEl.children.length; i++) {
        console.log(rowOneEl.children[i].textContent);
    }
} 
*/



function userInput(event) {
    if (hasWon) return;

    const currentRow = rows[currentRowIndex];
    if (!currentRow) return;


    if (event.target.textContent !== "⌫" && event.target.textContent !== "Enter" && count < currentRow.children.length) {
        console.log(event.target.textContent)
        currentRow.children[count].textContent = event.target.textContent
        count++
    }

    if (event.target.textContent === "⌫" && count > 0) {
        let i = count - 1
        currentRow.children[i].textContent = ''
        console.log(count)
        console.log(i)
        count--
    }

    if (event.target.textContent === "Enter" && count === 5) {
        console.log('enter')
        userWords = Array.from(currentRow.children, child => child.textContent)
        console.log(userWords)
        game()
        currentRowIndex++;
        count = 0;
    }
}

function game() {
    const currentRow = rows[currentRowIndex]
    for (let i = 0; i < userWords.length; i++) {
        const letter = userWords[i];
        const box = currentRow.children[i];
        if (letter.toLowerCase() === answerLetters[i].toLowerCase()) {
            box.classList.add('correct');
            console.log(letter, "is in the correct place 🟩");
        } else if (answerLetters.includes(letter.toLowerCase())) {
            box.classList.add('exists');
            console.log(letter, "is in the wrong place 🟨");
        } else {
            box.classList.add('wrong')
            console.log(answerLetters[i])
            console.log(letter, "is not in the answer ⬜");
        }
    }
    const guessedWord = userWords.join('').toLowerCase();

    if (guessedWord === answer) {
        hasWon = true;

        setTimeout(() => {
            Swal.fire({
                title: "You Won!",
                text: `The answer was : ${answer}`,
            });
        }, 100);
    }
}



/*----------------------------- Event Listeners -----------------------------*/

keyboardEl.forEach(button => button.addEventListener('click', userInput))
keyboardEl.forEach(button => button.addEventListener('keydown', userInput))

