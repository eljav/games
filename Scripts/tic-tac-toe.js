let canvas;
let canvasContext;
let squareSize = 180;
let squareSeparation = 20;
let x;
let y;
let xImage = document.getElementById("x");
let yImage = document.getElementById("y");

let board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	let framesPerSecond = 60;
	setInterval(function() {

	}, 1000/framesPerSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	drawGrid();
}

function handleMouseClick(evt) {
	x = calculateMousePosition(evt).x;
	y = calculateMousePosition(evt).y;
	board[x, y] = 'X';
	canvasContext.drawImage(xImage, (squareSize + squareSeparation) * x + 25 , (squareSize + squareSeparation) * y + 25)
	console.log(board)
}

function calculateMousePosition(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	let mouseY = evt.clientY - rect.top - root.scrollTop;
	if (mouseY <= 200)
		y = 0;
	else if (mouseY > 200 && mouseY <= 400)
		y = 1;
	else if (mouseY > 400)
		y = 2;
	if (mouseX <= 200)
		x = 0;
	else if (mouseX > 200 && mouseX <= 400)
		x = 1;
	else if (mouseX > 400)
		x = 2;
	return {
		x: x,
		y: y
	}
}

function drawGrid() {
	canvasContext.fillStyle = "white";
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			canvasContext.fillRect(i*(squareSize + squareSeparation) + 10, j*(squareSize + squareSeparation) + 10, squareSize, squareSize);
		}
	}
}

function checkWinner() {

}