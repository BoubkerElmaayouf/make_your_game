let animationId;
let pacManPosition = { x: 1, y: 1 }; // Initial position
let pacManVelocity = { x: 0, y: 0 }; // Movement direction
let score = 0;
let lifes = 3;
let startTime = Date.now();
const speed = 200; // Movement speed in milliseconds
let lastFrameTime = 0;

const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const lifesDisplay = document.getElementById("lifes");
const timeDisplay = document.getElementById("Time");

// Map layout
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

const width = 28;

function createGrid() {
    layout.forEach((cell, index) => {
        const square = document.createElement("div");
        switch(cell) {
            case 0:
                square.classList.add("pac-dot");
                break;
            case 1:
                square.classList.add("wall");
                break;
            case 2:
                square.classList.add("ghost-lair");
                break;
            case 3:
                square.classList.add("power-pellet");
                break;
            // case 4 is empty, no class needed
        }
        grid.appendChild(square);
    });
}

function movePacMan() {
    const squares = document.querySelectorAll(".grid div");
    const currentIndex = pacManPosition.y * width + pacManPosition.x;

    // Clear previous position
    squares[currentIndex].classList.remove("pac-man");

    // Calculate new position
    const newPosition = {
        x: pacManPosition.x + pacManVelocity.x,
        y: pacManPosition.y + pacManVelocity.y,
    };
    const newIndex = newPosition.y * width + newPosition.x;

    // Check for walls and ghost lair
    if (layout[newIndex] !== 1 && layout[newIndex] !== 2) {
        pacManPosition = newPosition;
    }

    // Update Pac-Man position
    const finalIndex = pacManPosition.y * width + pacManPosition.x;
    squares[finalIndex].classList.add("pac-man");

    // Check for collectibles
    checkCollectibles(squares, finalIndex);
}

function checkCollectibles(squares, index) {
    switch(layout[index]) {
        case 0: // pac-dot
            layout[index] = 4; // Mark as empty
            squares[index].classList.remove("pac-dot");
            score += 10;
            break;
        case 3: // power-pellet
            layout[index] = 4; // Mark as empty
            squares[index].classList.remove("power-pellet");
            score += 50;
            // Here you could add power pellet logic (making ghosts vulnerable)
            break;
    }
    scoreDisplay.textContent = score;
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
}

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastFrameTime;

    if (deltaTime >= speed) {
        movePacMan();
        updateTime();
        lastFrameTime = timestamp;
    }

    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
    score = 0;
    scoreDisplay.textContent = score;
    lifesDisplay.textContent = lifes;
    timeDisplay.textContent = 0;
    createGrid();
    const squares = document.querySelectorAll(".grid div");
    const startIndex = pacManPosition.y * width + pacManPosition.x;
    squares[startIndex].classList.add("pac-man");
    lastFrameTime = performance.now();
    animationId = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            pacManVelocity = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            pacManVelocity = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            pacManVelocity = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            pacManVelocity = { x: 1, y: 0 };
            break;
    }
});

startGame();