import {
    scoreDisplay,
    lifesDisplay,
} from './start_game.js'

let pacManRotation = 0;
let pacManPosition = { x: 0, y: 0 };
let pacManVelocity = { x: 0, y: 0 };
let score = 0;
// let currentDirection = null; // Track current direction
let nextDirection = {velocity : { x :0 , y : 0 } , rotation : 0}; // Track queued direction

let isPaused = false; // Updated variable naming for consistency
const pause = document.getElementById("pause")

pause.addEventListener("click", () => {
    if (!isPaused) {
        pacManVelocity = { x: 0, y: 0 }; // Stop Pac-Man
        isMoving = true; // Stop movement
        isPaused = true; // Update state
        pause.textContent = "Continue"; // Update button text
        console.log("Game Paused");
    } else {
        isMoving = true; // Allow movement again
        isPaused = false; // Update state
        pause.textContent = "Pause"; // Update button text
        console.log("Game Resumed");
    }
});

export function movePacMan() {
    if (isPaused || !isMoving) {
        return; // Stop movement if the game is paused or not moving
    }

    const walls = document.querySelectorAll(".wall");
    const pacMan = document.querySelector(".pac-man");
    const ghostLairs = document.querySelectorAll(".ghost-lair");

    // Store current position
    let currentPosition = { x: pacManPosition.x, y: pacManPosition.y };

    // Helper function to check collisions
    function checkCollision(position) {
        // Temporarily move Pac-Man to test collision
        pacMan.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${pacManRotation}deg)`;
        const pacManRect = pacMan.getBoundingClientRect();

        // Reset position
        pacMan.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${pacManRotation}deg)`;

        // Check ghost lair collision
        for (const ghostLair of ghostLairs) {
            const ghostLairRect = ghostLair.getBoundingClientRect();
            if (
                pacManRect.left < ghostLairRect.right &&
                pacManRect.right > ghostLairRect.left &&
                pacManRect.top < ghostLairRect.bottom &&
                pacManRect.bottom > ghostLairRect.top
            ) {
                return true;
            }
        }

        // Check wall collisions
        for (const wall of walls) {
            const wallRect = wall.getBoundingClientRect();
            if (
                pacManRect.left < wallRect.right &&
                pacManRect.right > wallRect.left &&
                pacManRect.top < wallRect.bottom &&
                pacManRect.bottom > wallRect.top
            ) {
                return true;
            }
        }

        return false;
    }

    // Calculate new position for next direction
    const nextPosition = {
        x: currentPosition.x + nextDirection.velocity.x,
        y: currentPosition.y + nextDirection.velocity.y,
    };

    // Check if next direction is valid
    if (!checkCollision(nextPosition)) {
        // Move in the next direction
        pacManPosition = nextPosition;
        pacManVelocity = nextDirection.velocity;
        pacManRotation = nextDirection.rotation;
        pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${pacManRotation}deg)`;

        // Check collectibles
        const pacManRect = pacMan.getBoundingClientRect();
        checkCollectibles(pacManRect);
        return;
    }

    // Calculate new position for current direction
    const currentDirectionPosition = {
        x: currentPosition.x + pacManVelocity.x,
        y: currentPosition.y + pacManVelocity.y,
    };

    // Check if current direction is valid
    if (!checkCollision(currentDirectionPosition)) {
        // Keep moving in the current direction
        pacManPosition = currentDirectionPosition;
        pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${pacManRotation}deg)`;

        // Check collectibles
        const pacManRect = pacMan.getBoundingClientRect();
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
            const prize  = document.getElementById("prize");
            prize.play();
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
            const eat_dots  = document.getElementById("eat-dots");
            eat_dots.play();
            score += 10;
            scoreDisplay.textContent = score;
        }
    });
    // let pacManVelocity = 5  

}

let isMoving = true

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            queueDirection({ x: 0, y: -5 }, -90);
            break;
        case "ArrowDown":
            queueDirection({ x: 0, y: 5 }, 90);
            break;
        case "ArrowLeft":
            queueDirection({ x: -5, y: 0 }, 180);
            break;
        case "ArrowRight":
            queueDirection({ x: 5, y: 0 }, 0);
            break;
    }
});


function queueDirection(velocity, rotation) {
        nextDirection = { velocity, rotation }
}


