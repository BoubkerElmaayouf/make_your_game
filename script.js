let animationId;
const pacManPosition = { x: 0, y: 0 };
let pacManVelocity = { x: 0, y: 0 };

let score = 0;
let lifes = 3;
let startTime = Date.now();
const speed = 50; // Movement speed in pixels per frame
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
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
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
                console.log(index);
                if (index === 347 || index === 352 || index === 408 || index === 403) {
                    square.classList.add("ghost");
                    if (index === 347) square.classList.add("pinky");
                    if (index === 352) square.classList.add("blinky");
                    if (index === 408) square.classList.add("inky");
                    if (index === 403) square.classList.add("clyde");
                }
                break;
            case 3:
                square.classList.add("power-pellet");
                break;
            case 5:
                square.classList.add("pac-man");
                break;
            // case 4 is empty, no class needed
        }
        grid.appendChild(square);
    });
    
}
let pacManRotation = 0;

function movePacMan() {
    const walls = document.querySelectorAll(".wall");
    const pacMan = document.querySelector(".pac-man");
    
    // Store the current position
    let currentPosition = {
        x: pacManPosition.x,
        y: pacManPosition.y
    };

    // Calculate new position
    const newPosition = {
        x: currentPosition.x + pacManVelocity.x,
        y: currentPosition.y + pacManVelocity.y
    };

    // Temporarily move Pac-Man to check for collisions
    pacMan.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px) rotate(${pacManRotation}deg)`;
    const pacManRect = pacMan.getBoundingClientRect();

    // Reset to current position
    pacMan.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${pacManRotation}deg)`;

    // Check for wall collisions
    let collision = false;
    for (const wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        if (
            pacManRect.left < wallRect.right &&
            pacManRect.right > wallRect.left &&
            pacManRect.top < wallRect.bottom &&
            pacManRect.bottom > wallRect.top
        ) {
            collision = true;
            break;
        }
    }

    if (!collision) {
        // Update the position if no collision
        pacManPosition.x = newPosition.x;
        pacManPosition.y = newPosition.y;
        pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${pacManRotation}deg)`;
        
        // Check collectibles at new position
        checkCollectibles(pacManRect);
    }
}

function checkCollectibles(pacManRect) {
    const powerPellets = document.querySelectorAll(".power-pellet");
    powerPellets.forEach((pellet) => {
        const pelletRect = pellet.getBoundingClientRect();
        if (
            pacManRect.left < pelletRect.right &&
            pacManRect.right > pelletRect.left &&
            pacManRect.top < pelletRect.bottom &&
            pacManRect.bottom > pelletRect.top
        ) {
            // Collect power-pellet
            pellet.classList.remove("power-pellet");
            score += 50;
            scoreDisplay.textContent = score;
        }
    });
    
    const pacDots = document.querySelectorAll(".pac-dot");
    pacDots.forEach((dot) => {
        const dotRect = dot.getBoundingClientRect();
        if (
            pacManRect.left < dotRect.right &&
            pacManRect.right > dotRect.left &&
            pacManRect.top < dotRect.bottom &&
            pacManRect.bottom > dotRect.top
        ) {
            // Collect pac-dot
            dot.classList.remove("pac-dot");
            score += 10;
            scoreDisplay.textContent = score;
        }
    });
    let pacManVelocity = 5  

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
     const pacMan = document.querySelector(".pac-man")

    // pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px)`;
    lastFrameTime = performance.now();
    animationId = requestAnimationFrame(gameLoop);
}

let isRotating = false;

let currentDirection = 0;
let isMoving = false;

document.addEventListener("keydown", (e) => {
    
    switch (e.key) {
        case "ArrowUp":
            if (currentDirection !== -90) {
                currentDirection = -90;
                rotatePacMan(-90);
            }
            pacManVelocity = { x: 0, y: -5 };
            isMoving = true;
            break;
        case "ArrowDown":
            if (currentDirection !== 90) {
                currentDirection = 90;
                rotatePacMan(90);
            }
            pacManVelocity = { x: 0, y: 5 };
            isMoving = true;
            break;
        case "ArrowLeft":
            if (currentDirection !== 180) {
                currentDirection = 180;
                rotatePacMan(180);
            }
            pacManVelocity = { x: -5, y: 0 };
            isMoving = true;
            break;
        case "ArrowRight":
            if (currentDirection !== 0) {
                currentDirection = 0;
                rotatePacMan(0);
            }
            pacManVelocity = { x: 5, y: 0 };
            isMoving = true;
            break;
        case " ":
            pacManVelocity = { x: 0, y: 0 };
            isMoving = false;
            break;
    }
});

function rotatePacMan(degrees) {
    const pacMan = document.querySelector(".pac-man");
    pacManRotation = degrees;
    pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${degrees}deg)`;
}

function stopPacMan() {
    pacManVelocity = { x: 0, y: 0 };
    isMoving = false;
}


startGame();