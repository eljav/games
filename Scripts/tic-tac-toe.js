let canvas;
let canvasContext;
let squareSize = 180;
let squareSeparation = 20;
let x;
let y;
let xImage = new Image();
xImage.src = "Images/x.png"
let oImage = new Image();
oImage.src = "Images/o.png"
let gameOver = false;
var redWins = 0;
var blueWins = 0;

let scores = {
	'X': -10,
	0: 0,
	'O': 10
}

let board = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
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
	if (!this.gameOver) {
		x = calculateMousePosition(evt).x;
		y = calculateMousePosition(evt).y;
		if (board[x][y] == 0) {
			board[x][y] = 'X';
			canvasContext.drawImage(xImage, (squareSize + squareSeparation) * x + 25, (squareSize + squareSeparation) * y + 25);
			if (checkWinner() == 'X') {
				// not happening
			}
			if (!this.gameOver) {
				let move = bestMove();
				canvasContext.drawImage(oImage, (squareSize + squareSeparation) * move[0] + 25, (squareSize + squareSeparation) * move[1] + 25);
				board[move[0]][move[1]] = 'O';
				if (checkWinner() == 'O') {
					increaseScore();
					this.gameOver = true;
				}
				else if (checkWinner() == 0) {
					this.gameOver = true;
				}
			}
		}
	} else {
		board = [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		];
		this.gameOver = false;
		drawGrid();
	}
}

function increaseScore() {
	this.blueWins += 1;
	document.getElementById('blueScore').innerHTML = this.blueWins;
	console.log(this.blueWins)
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
			canvasContext.fillRect(i * (squareSize + squareSeparation) + 10, j * (squareSize + squareSeparation) + 10, squareSize, squareSize);
		}
	}
}

function checkWinner() {
	let tie = true;
	for (let i = 0; i < 3; i++) {
		if (board[i][0] != 0) {
			if (board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
				return board[i][0];
			}
		}
	}
	for (let i = 0; i < 3; i++) {
		if (board[0][i] != 0) {
			if (board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
				return board[0][i];
			}
		}
	}
	if (board[0][0] != 0) {
		if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
			return board[0][0];
		}
	}
	if (board[2][0] != 0) {
		if (board[2][0] == board[1][1] && board[2][0] == board[0][2]) {
			return board[2][0];
		}
	}
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == 0) {
				tie = false;
			}
		}
	}
	if (tie) {
		return 0;
	}
}

function bestMove() {
	let bestScore = -10;
	let move = [0, 0];
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[i][j] == 0) {
				board[i][j] = 'O';
				let score = minimax(board, 0, false);
				board[i][j] = 0;
				if (score > bestScore) {
					bestScore = score;
					move = [i, j];
				}
			}
		}
	}
	return move;
}

function minimax(board, depth, isMaximizing) {
	result = checkWinner()
	if (result != null) {
		let score = scores[result];
		return score;
	}
	if (isMaximizing) {
		let maxEvaluation = -10;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == 0) {
					board[i][j] = 'O';
					score = minimax(board, depth + 1, false);
					board[i][j] = 0;
					maxEvaluation = Math.max(score, maxEvaluation);
				}
			}
		}
		return maxEvaluation;
	}
	else {
		let minEvaluation = 10;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board[i][j] == 0) {
					board[i][j] = 'X';
					score = minimax(board, depth + 1, true);
					board[i][j] = 0;
					minEvaluation = Math.min(score, minEvaluation);
				}
			}
		}
		return minEvaluation;
	}
}
