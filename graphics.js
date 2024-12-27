var svgNS = "http://www.w3.org/2000/svg"; // SVG namespace
var svg = document.createElementNS(svgNS, "svg");
var SCALE = 10;
// Set attributes for the SVG
svg.setAttribute("width", "800");
svg.setAttribute("height", "600");
svg.setAttribute("style", "border: 1px solid black");
// Append to the body
document.body.appendChild(svg);
var boardRows = 40;
var boardColumns = 10;
var board = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 0], // bottom row
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // top of board
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // cushion in case of top out
];
var bag = ["I", "J", "L", "O", "S", "T", "Z"];
//Randomizer for the pieces. 
var COLORS = [
    [0, "#000000", "#222222"], //Black, empty
    [1, "#00FFFF", "#00DDDD"], //Light blue, I piece
    [2, "#0000FF", "#0000DD"], //Blue, J piece
    [3, "#FFAA00", "#DD8800"], //Orange, L piece
    [4, "#FFFF00", "#DDDD00"], //Yellow, O piece
    [5, "#00FF00", "#00DD00"], //Green, S piece
    [6, "#AA00AA", "#990099"], //Purple, T piece
    [7, "#FF0000", "#DD0000"], //Red, Z piece
    [8, "#AAAAAA", "#999999"] //Gray, garbage
];
//Colors of pieces
var gameBags = [];
var SRS = [
    [[0, 1], [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[1, 2], [0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    [[2, 3], [0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[3, 0], [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    [[0, 3], [0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
    [[3, 2], [0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
    [[2, 1], [0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
    [[1, 0], [0, 0], [1, 0], [1, -1], [0, 2], [1, 2]]
];
var SRSI = [
    [[0, 1], [0, 0], [-2, 0], [1, 0], [1, 2], [-2, -1]],
    [[1, 2], [0, 0], [2, 0], [-1, 0], [-1, 2], [2, -1]],
    [[2, 3], [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1]],
    [[3, 0], [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1]],
    [[1, 0], [0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
    [[2, 1], [0, 0], [-2, 0], [1, 0], [-2, 1], [1, -1]],
    [[3, 2], [0, 0], [1, 0], [-2, 0], [1, 2], [-2, -1]],
    [[0, 3], [0, 0], [-2, 0], [1, 0], [1, 2], [-2, -1]]
];
//first array = [start pos, end pos], all other arrays = tests, shift origin[x, y]
//let myObj = { size: 10, label: "Size 10 Object" };
var pieceData = {
    type: "",
    rotation: 0,
    xpos: 3,
    ypos: 24,
    movements: []
};
var playerStats = [
// score: 0,
// PPS: 0,
// APM: 0,
// wins: 0,
// b2b: 0,
// combo: 0
];
var ATTACKS = {
    single: 0,
    double: 1,
    triple: 2,
    tetris: 4,
    spin: 1,
    spinSingle: 2,
    spinDouble: 4,
    spinTriple: 6,
    spimTetris: 8,
    allClear: 8,
    combo: 0.5
};
function findIndex(value, array) {
    for (var x = 0; x < array.length; x++) {
        if (array[x][0] == value) {
            return x;
        }
    }
    return null;
}
var PIECES = [
    ["I",
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    ["J",
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2]
    ],
    ["L",
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0]
    ],
    ["O",
        [0, 0, 0, 0],
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0]
    ],
    ["S",
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0]],
    ["T",
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0]],
    ["Z",
        [0, 0, 0],
        [0, 7, 7],
        [7, 7, 0]
    ]
];
function drawSquare(x, y, size, color) {
    var rect = document.createElementNS(svgNS, "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", size);
    rect.setAttribute("height", size);
    rect.setAttribute("fill", color);
    svg.appendChild(rect);
}
function drawTile(x, y, size, color1, color2) {
    var tileGap = size / 10;
    drawSquare(x, y, size, color1);
    drawSquare(x + tileGap, y + tileGap, size - 2 * tileGap, color2);
    drawSquare(x + 2 * tileGap, y + 2 * tileGap, size - 4 * tileGap, color1);
}
function drawBoard(x, y) {
    //clearCanvas();
    for (var i = 0; i < boardRows; i++) {
        for (var j = 0; j < boardColumns; j++) {
            var tileColorIndex = findIndex(board[i][j], COLORS);
            if (tileColorIndex != null) {
                var tileColor1 = COLORS[tileColorIndex][1];
                var tileColor2 = COLORS[tileColorIndex][2];
                if (y + j * SCALE >= 0) {
                    if (i < 20 || tileColorIndex != 0) {
                        drawTile(y + j * SCALE, x + (boardRows - i) * SCALE, SCALE, tileColor1, tileColor2);
                    }
                }
            }
        }
    }
}
/*
function clearCanvas(){
    if (svg.parentNode!=null){svg.parentNode.replaceChild(svg.cloneNode(false), svg);}
}
*/
/*
function generateBag(){
    let randomBag: string [] = [];
    for(let i=0; i<bag.length; i++){
        //add randomizer
        let randomElem = 0;
        randomBag.push(bag[randomElem]);
        bag.splice(randomElem, 1);
    }
    bag = randomBag;
    console.log(randomBag);
    return randomBag;
}
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateBag(localBag) {
    var randomBag = [];
    while (bag.length > 0) {
        var randomNumber = getRandomInt(0, bag.length - 1);
        randomBag.push(bag[randomNumber]);
        localBag.splice(randomNumber, 1);
    }
    return randomBag;
    //generates the next 7 pieces in the next queue
}
drawBoard(50, 50);
console.log(generateBag(bag));
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            console.log('Up arrow pressed!');
            break;
        case 'ArrowDown':
            console.log('Down arrow pressed!');
            break;
        case 'ArrowLeft':
            console.log('Left arrow pressed!');
            break;
        case 'ArrowRight':
            console.log('Right arrow pressed!');
            break;
        case 'a':
            console.log('a pressed');
            break;
        case 'Enter':
            console.log('enter pressed!');
            var select = new Audio('./se_sys_ok.wav');
            select.volume = 0.5; // Set volume to 50%
            select.play();
            break;
    }
});
