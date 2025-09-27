// --- Seleção de Elementos ---
const startButton = document.getElementById("start-button");
const square = document.getElementById("square");
const square2 = document.getElementById("square2");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const gameArea = document.getElementById("game-area");

let score = 0;
let timeLeft = 30;
let gameInterval;

/** Move um elemento para uma posição aleatória dentro da área do jogo. */
function moveElementRandomly(element) {
    // Pega o tamanho da área do jogo
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    // Pega o tamanho do próprio elemento para um cálculo preciso do offset
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    // Calcula a posição aleatória, garantindo que o elemento não saia da área
    const randomY = Math.floor(Math.random() * (areaHeight - elementHeight));
    const randomX = Math.floor(Math.random() * (areaWidth - elementWidth));

    // Aplica a nova posição
    element.style.top = `${randomY}px`;
    element.style.left = `${randomX}px`;
    element.style.display = "block";
}

/** Inicia o jogo, resetando o estado e iniciando o timer. */
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = `Pontos: ${score}`;
    timerDisplay.textContent = `Timer: ${timeLeft}s`;
    
    startButton.disabled = true;

    moveElementRandomly(square);
    moveElementRandomly(square2);

    // Inicia o contador
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Timer: ${timeLeft}s`;

        if (timeLeft <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(gameInterval);
    square.style.display = "none";
    square2.style.display = "none";
    startButton.disabled = false;
    alert(`Fim de jogo! Sua pontuação foi de ${score}`);
}

function handleGoodSquareClick() {
    score++;
    scoreDisplay.textContent = `Pontos: ${score}`;
    moveElementRandomly(square);
    moveElementRandomly(square2);
}

// --- Event Listeners ---
startButton.addEventListener("click", startGame);
square.addEventListener("click", handleGoodSquareClick);
square2.addEventListener("click", gameOver); 