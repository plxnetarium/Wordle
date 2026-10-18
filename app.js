/*-------------------------------- Constants --------------------------------*/




/*-------------------------------- Variables --------------------------------*/
let count = 0 


/*------------------------ Cached Element References ------------------------*/
const rowOneEl = document.querySelector('#row1');
const keyboardEl = document.querySelectorAll('.key');

console.log(keyboardEl)

/*-------------------------------- Functions --------------------------------*/
function rowOne() {
    for (let i = 0; i < rowOneEl.children.length; i++) {
        console.log(rowOneEl.children[i].textContent);
    }
}

function userInput(event){
    if (event.target.textContent !== "⌫" && event.target.textContent !== "Enter"){
        console.log(event.target.textContent)
        rowOneEl.children[count].textContent = event.target.textContent 
        count ++
    }

    if(event.target.textContent === "⌫" ){
        let i = count - 1
        rowOneEl.children[i].textContent = ''
        console.log(count)
        console.log(i)
        count --
    }

    if(event.target.textContent === "Enter"){
        if (count === 5) {
            console.log('You pressed enter')
        }
    }
}

function guess(){
    
}

/*----------------------------- Event Listeners -----------------------------*/

keyboardEl.forEach(button => button.addEventListener('click',userInput))
