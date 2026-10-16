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
    
    console.log(event.target.textContent)
    rowOneEl.children[count].textContent = event.target.textContent 
    count ++








    if(event.target.textContent === "⌫" ){
        rowOneEl.children[count-1].textContent = ''
    }
}

/*----------------------------- Event Listeners -----------------------------*/

keyboardEl.forEach(button => button.addEventListener('click',userInput))
