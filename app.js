var height = 6; //guesses
var width = 5; // word length

var row = 0; // these are the guesses
var col = 0; // the letter for the attempt

window.onload = function(){
    init()
}

function init(){
    for(let r = 0 ; r< height; r++){
        for(let c = 0; c< width; c++){
            let tile =document.createElement('span')
            tile.id = r.toString + "-" +c.toString
            document.getElementById("2-3")
            title.classList.add('title')
        
        }
    }
}