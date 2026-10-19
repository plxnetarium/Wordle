/*-------------------------------- Constants --------------------------------*/
import { wordAnswers } from './wordle-list.js';
console.log(wordAnswers);
const answer = wordAnswers[Math.floor(Math.random() * wordAnswers.length)];
const answerLetters = answer.split('');
const winSound = new Audio('./sounds/win.mp3');
winSound.volume = 0.5;
const loseSound = new Audio('./sounds/lose.mp3');
loseSound.volume = 0.5;
console.log(wordAnswers)
console.log(answer)
console.log(answerLetters)

/*-------------------------------- Variables --------------------------------*/
let count = 0
let userWords = []
let currentRowIndex = 0;
let hasWon = false
let winStreak = Number(localStorage.getItem('winStreak')) || 0;

/*------------------------ Cached Element References ------------------------*/
const rowOneEl = document.querySelector('#row1');
const keyboardEl = document.querySelectorAll('.key');
const rows = document.querySelectorAll('.row')
const themeToggle = document.querySelector('#darkBtn');
const winStreakEl = document.querySelector('#win-streak');
winStreakEl.textContent = winStreak;
console.log(keyboardEl)

/*-------------------------------- Functions --------------------------------*/

function updateKey(letter, status) {
    const key = document.querySelector(
        `.key[data-key="${letter.toUpperCase()}"]`
    );

    if (!key || key.classList.contains('correct')) return;
    if (key.classList.contains('exists') && status === 'wrong') return;

    key.classList.remove('wrong', 'exists');
    key.classList.add(status);
}

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

        setTimeout(() => {
            box.classList.add('flip');
            setTimeout(() => {

                if (letter.toLowerCase() === answerLetters[i].toLowerCase()) {
                    box.classList.add('correct');
                    updateKey(letter, 'correct');
                    console.log(letter, "is in the correct place 🟩");
                } else if (answerLetters.includes(letter.toLowerCase())) {
                    box.classList.add('exists');
                    updateKey(letter, 'exists');
                    console.log(letter, "is in the wrong place 🟨");
                } else {
                    box.classList.add('wrong');
                    updateKey(letter, 'wrong');
                    console.log(answerLetters[i])
                    console.log(letter, "is not in the answer ⬜");
                }

            }, 250);
        }, i * 500);
    }
    const guessedWord = userWords.join('').toLowerCase();

    if (guessedWord === answer) {
        hasWon = true;
        winStreak++;
        localStorage.setItem('winStreak', winStreak);
        winStreakEl.textContent = winStreak;

        setTimeout(() => {
            Swal.fire({
                title: "You Won",
                text: `The Answer was: ${answer}`,
                imageUrl: "https://media1.tenor.com/m/LedML6uF2-4AAAAC/cat-scuba-scuba.gif",
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Cats Dancing",
                didOpen: () => {
                    winSound.play();
                }
            });
        }, 2500);
    } else if (currentRowIndex === rows.length - 1) {
        winStreak = 0;
        localStorage.setItem('winStreak', winStreak);
        winStreakEl.textContent = winStreak;
        setTimeout(() => {
            Swal.fire({
                title: "You Lost",
                text: `You've used all your guesses. The Answer was: ${answer}`,
                imageUrl: 'https://media.tenor.com/I3WYELgcTVgAAAAi/cat-beats-cat-aggr-meme.gif',
                imageHeight: 200,
                imageWidth: 200,
                imageAlt: "Disappointed Cat",
                didOpen: () => {
                    loseSound.play();
                }
            });
        }, 2500);
    }
}



/*----------------------------- Event Listeners -----------------------------*/

keyboardEl.forEach(button => button.addEventListener('click', userInput))


document.addEventListener("keydown", function (event) {

    for (const button of keyboardEl) {
        button.textContent === event.key.toUpperCase() && (button.click());
        if (button.textContent === "Enter") {
            event.key === "Enter" && button.click();
        }
        else if (button.textContent === "⌫") {
            event.key === "Backspace" && button.click();
        }
    }
});

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Light mode';
    } else {
        themeToggle.textContent = 'Dark mode';
    }
});

