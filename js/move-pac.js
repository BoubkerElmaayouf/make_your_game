import {
    scoreDisplay,
    lifesDisplay,
} from './start_game.js'
let pacManRotation = 0;
const pacManPosition = { x: 0, y: 0 };
let pacManVelocity = { x: 0, y: 0 };
let score = 0;
let currentDirection = null; // Track current direction
let nextDirection = null; // Track queued direction

export function movePacMan() {
    const walls = document.querySelectorAll(".wall");
    const pacMan = document.querySelector(".pac-man");
    const ghostLair = document.querySelector(".ghost-lair"); // Fixed selector syntax

    // Store the current position
    let currentPosition = { x: pacManPosition.x, y: pacManPosition.y };

    // Calculate new position
    const newPosition = {
        x: currentPosition.x + pacManVelocity.x,
        y: currentPosition.y + pacManVelocity.y,
    };

    // Temporarily move Pac-Man to check for collisions
    pacMan.style.transform = `translate(${newPosition.x}px, ${newPosition.y}px) rotate(${pacManRotation}deg)`;
    const pacManRect = pacMan.getBoundingClientRect();

    // Reset to current position
    pacMan.style.transform = `translate(${currentPosition.x}px, ${currentPosition.y}px) rotate(${pacManRotation}deg)`;

    // Check for collisions
    let collision = false;

    // Check ghost lair collision first
    if (ghostLair) {
        const ghostLairRect = ghostLair.getBoundingClientRect();
        if (
            pacManRect.left < ghostLairRect.right &&
            pacManRect.right > ghostLairRect.left &&
            pacManRect.top < ghostLairRect.bottom &&
            pacManRect.bottom > ghostLairRect.top
        ) {
            collision = true;
        }
    }

    // Check wall collisions if no ghost lair collision
    if (!collision) {
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
    }

    if (!collision) {
        // Update the position if no collision
        pacManPosition.x = newPosition.x;
        pacManPosition.y = newPosition.y;
        pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${pacManRotation}deg)`;
    
        // Check collectibles at new position
        checkCollectibles(pacManRect);
    } else if (nextDirection) {
        // Apply queued direction if the current direction is blocked
        pacManVelocity = nextDirection.velocity;
        pacManRotation = nextDirection.rotation;
        rotatePacMan(nextDirection.rotation);
        nextDirection = null; // Clear queued direction
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
}

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
        case " ":
            pacManVelocity = { x: 0, y: 0 };
            isMoving = false;
            break;
    }
});


function queueDirection(velocity, rotation) {
    if (isOppositeDirection(velocity, pacManVelocity)) {
        pacManVelocity = velocity;
        pacManRotation = rotation;
        rotatePacMan(rotation);
    } else {
        nextDirection = { velocity, rotation };
    }
}

function isOppositeDirection(newVelocity, currentVelocity) {
    return (
        newVelocity.x === -currentVelocity.x ||
        newVelocity.y === -currentVelocity.y ||
        newVelocity.x === -currentVelocity.x ||
        newVelocity.y === -currentVelocity.y
    );
}

function rotatePacMan(degrees) {
    const pacMan = document.querySelector(".pac-man");
    pacManRotation = degrees;
    pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${degrees}deg)`;
}


// function stopPacMan() {
//     pacManVelocity = { x: 0, y: 0 };
//     isMoving = false;
// }

// startGame();
