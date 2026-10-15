var height = 6; //guesses
var width = 5; // word length

var row = 0; // these are the guesses
var col = 0; // the letter for the attempt

window.onload = function(){
    init()
}

function init(){
    for(let r = 0 ; r< height; r++){ // this creates rows
        for(let c = 0; c< width; c++){ // this creates columns
            let tile =document.createElement('span') //this helps in making a tile
            tile.id = r.toString + "-" +c.toString //this is giving tile a unique ID
            tile.classList.add('title') //this is adding a css class
            tile.innerText = 'P'
            document.getElementById('board').appendChild(tile)
        
        }
    }
}