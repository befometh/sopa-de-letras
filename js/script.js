const inputs = document.querySelectorAll("input");
const table = document.querySelector("#sopa");
const creator = document.querySelector("#btnCreator");
const adder = document.querySelector("#btnAdder");
const inverser = document.querySelectorAll(".inverser");
var wordSearcher = [];
var backup = [];
var list =  [];
const abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "Ñ", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
class Letter {
    constructor(letter, crd) {
        this.letter = letter;
        this.crd = crd;
    }
    get getLetter() {
        return this.letter;
    }
    get getCoord() {
        return this.crd;
    }
    set setLetter(letter) {
        this.letter = letter;
    }
    set setCoord(crd) {
        this.crd = crd;
    }
}

createTable = () => {
    let x = parseInt(inputs[0].value)
    let y = parseInt(inputs[1].value)

    try {
        wordSearcher = new Array(x);
        backup = new Array(x);
        for (let i = 0; i < x; i++) {
            wordSearcher[i] = new Array(y);
            backup[i] = new Array(y);
            for (let j = 0; j < y; j++) {
                wordSearcher[i][j] = 0;
                backup[i][j] = false;
            }
        }
        arrayRandomizer();
        graphicTable();
        creator.style.display = "none";
        adder.style.display = "block";
    }
    catch (error) {
        alert("Ingrese un valor válido");
        console.log(error);
    }

}

wordsAdd = () => {
    try{
        let words = inputs[2].value.split(" ");
        let letters = new Array(words.length);
        for(let i=0;i<letters.length;i++){
            letters[i]=words[i].split("");
        }
        wordsBuilder(arr);
    }catch(error){
        console.log(error);
    }
}

function wordsBuilder(arr){
    let max = 2;
    let listCoord = new Array(arr.length);
    if(inputs[3].checked){
        max +=2
    }
        for(i=0;i<arr.length;i++){
            if(inputs[4].checked){
                max+=2;
            }
            let randomizer = Math.floor(Math.random*max);
            switch (randomizer){
            case 0:
                isHorizontal(arr[i]);
            break;
            case 1:
                    
            break;
            case 2:
                
            break;
            case 3:

            break;
        }
    }
}

function isHorizontal(word){
    let straight = 0;
    let temp = new Array(word.length);
    let y;
    let firstX;
    if(inputs[4].checked){
        straight = Math.floor(Math.random())
    }
    y = Math.floor(Math.random()*backup[0].length)
    switch (straight)
    {
        case 0:
            firstX = Math.floor(Math.random()*backup.length-word.length-1)
            for(let i=0;i<word.length;i++){
                temp[i] = compareCell(word[i],firstX+i,y);
                if(temp[i][0]==false){
                    return isHorizontal(word);
                }
            }
        break;
        case 1:
            firstX = word.length+Math.floor(Math.random()*backup.length-word.length-1);
            for (let i=word.length-1;i>-1;i--){
                temp[i] = compareCell(word[word.lenght-1-i],firstX-i,y);
            }            
        break;
    }
}

function compareCell(letter,x,y){
    let value;
    if(backup[x][y]){
        if(wordSearcher[x][y]==letter){
            value=true;
        }
        else{
            return [false];
        }
    }
    else{
        value=true;
    }
    return [value,x,y];
}


arrayRandomizer = () => {
    for (let i = 0; i < wordSearcher.length; i++) {
        for (let j = 0; j < wordSearcher[i].length; j++) {
            wordSearcher[i][j] = abc[Math.floor(Math.random() * 26)]
        }
    }
}

function showInverser(){
    console.log(inputs[3].checked)
    if(inputs[3].checked){
        for(let i=0;i<inverser.length;i++){
            inverser[i].style.display = "block";
        }
    }
    else{
        for(let i=0;i<inverser.length;i++){
            inverser[i].style.display = "none";
        }
    }
}

graphicTable = () => {
    writer = "<table class='mx-auto'>"
    for (let i = 0; i < wordSearcher.length; i++) {
        writer += "<tr>";
        for (let j = 0; j < wordSearcher[i].length; j++) {
            writer += `<td class="border-1 py-1 px-2 text-center">${wordSearcher[i][j]}</td>`
        }
        writer += "</tr>";
    }
    writer += "</table>"
    console.log(backup);
    table.innerHTML = writer;
}