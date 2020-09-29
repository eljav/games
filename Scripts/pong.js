let canvas;
let canvasContext;

let ballX = 400;
let ballY = 300;
let ballSpeedX = 5;
let ballSpeedY = 4;
let paddle1Y = 300;
let paddle2Y = 300;
let player1Score = 0;
let player2Score = 0;
let showingWinScreen = false;

const WINNING_SCORE = 3;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;
const PADDLE_SEPARATION = 5;

let paddleSound = new sound("./Sounds/paddle.mp3");
let wallSound = new sound("./Sounds/wall.mp3");
let scoreSound = new sound("./Sounds/score.mp3");

window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext('2d');
	let framesPerSecond = 60;
	setInterval(function() {
		moveEverything();
		drawEverything();
	}, 1000/framesPerSecond);
	canvas.addEventListener('mousedown', handleMouseClick);
	canvas.addEventListener('mousemove', function(evt) {
		let mousePos = calculateMousePosition(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
	})
}

function handleMouseClick(evt) {
	if (showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		updateLeftScore();
		updateRightScore();
		showingWinScreen = false;
	}
}

function calculateMousePosition(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;
	let mouseX = evt.clientX - rect.left - root.scrollLeft;
	let mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	}
}

function ballReset() {
	if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
		showingWinScreen = true;
	}
	ballSpeedX = -ballSpeedX
	ballSpeedY = 4;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function computerMovement() {
	if (paddle2Y + PADDLE_HEIGHT / 2 < ballY - 35) {
		paddle2Y += 6;
	} else if (paddle2Y + PADDLE_HEIGHT / 2 > ballY + 35) {
		paddle2Y -= 6;
	}
}

function moveEverything() {
	if (showingWinScreen) {
		return;
	}
	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballX < 0 + PADDLE_WIDTH) {
		if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2); 
			ballSpeedY = deltaY * 0.35;
			paddleSound.play();
		} else {
			player2Score++;
			updateRightScore();
			scoreSound.play();
			ballReset();		
		}
	}
	if (ballX > canvas.width - PADDLE_WIDTH) {
		if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			let deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2); 
			ballSpeedY = deltaY * 0.35;
			paddleSound.play();
		}
		else {
			player1Score++;
			updateLeftScore();
			scoreSound.play();
			ballReset();
		}
	}
	if (ballY >= canvas.height || ballY <= 0) {
		ballSpeedY = -ballSpeedY;
		wallSound.play();
	}
}

function drawNet() {
	for (let i = 10; i < canvas.height; i += 40) {
		colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
	}
}

function drawEverything() {
	colorRect(0, 0, canvas.width, canvas.height, 'grey'); // background
	if (showingWinScreen) {
		canvasContext.fillStyle = 'white';
		let winner = player1Score >= WINNING_SCORE ? 'Left' : 'Right';
		canvasContext.fillText(winner + " player won!", 350, 300);
		canvasContext.fillText("Click to play again", 350, 500);
		return;
	}
	drawNet();
	colorRect(PADDLE_SEPARATION, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // player 1
	colorRect(canvas.width - PADDLE_WIDTH - PADDLE_SEPARATION, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white'); // player 2
	colorCircle(ballX, ballY, 15, 'white'); // ball
	//canvasContext.fillText(player1Score, 100, 100);
	//canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function colorRect(leftX, topY, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();
}

function updateLeftScore() {
	document.getElementById('left_score').innerHTML = player1Score;
}

function updateRightScore() {
	document.getElementById('right_score').innerHTML = player2Score;
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function() {
		this.sound.play();
	}
	this.stop = function() {
		this.sound.pause();
	}
}
