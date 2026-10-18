/*-------------------------------- Constants --------------------------------*/
const wordAnswers = ['yummy', 'apple', 'words']
const answer = wordAnswers[Math.floor(Math.random() * wordAnswers.length)];
const answerLetters = answer.split('');

 console.log(wordAnswers)
 console.log(answer)
 console.log(answerLetters)

/*-------------------------------- Variables --------------------------------*/
let count = 0
let userWords = []

/*------------------------ Cached Element References ------------------------*/
const rowOneEl = document.querySelector('#row1');
const keyboardEl = document.querySelectorAll('.key');
const rows = document.querySelectorAll('.row')
console.log(keyboardEl)

/*-------------------------------- Functions --------------------------------*/




function rowOne() {
    for (let i = 0; i < rowOneEl.children.length; i++) {
        console.log(rowOneEl.children[i].textContent);
    }
}

function userInput(event) {
    if (event.target.textContent !== "⌫" && event.target.textContent !== "Enter") {
        console.log(event.target.textContent)
        rowOneEl.children[count].textContent = event.target.textContent
        count++
    }

    if (event.target.textContent === "⌫") {
        let i = count - 1
        rowOneEl.children[i].textContent = ''
        console.log(count)
        console.log(i)
        count--
    }

    if (event.target.textContent === "Enter" && count === 5) {
        console.log('enter')
        userWords = Array.from(rowOneEl.children, child => child.textContent)
        console.log(userWords)
        game()
    }
}

function game() {
    for (let i = 0; i < userWords.length; i++) {
        const letter = userWords[i];
        const box = rowOneEl.children[i];
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

}

/*----------------------------- Event Listeners -----------------------------*/

keyboardEl.forEach(button => button.addEventListener('click', userInput))
