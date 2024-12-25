import {
    scoreDisplay,
    lifesDisplay,
} from './start_game.js'
let pacManRotation = 0;
const pacManPosition = { x: 0, y: 0 };
let pacManVelocity = { x: 0, y: 0 };
let score = 0

export function movePacMan() {
    const walls = document.querySelectorAll(".wall");
    const pacMan = document.querySelector(".pac-man");
    const ghostLair = document.querySelector(".ghost-lair"); // Fixed selector syntax

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

    // Check for wall collisions and ghost lair collision
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


let isRotating = false;
let currentDirection = 0;
let isMoving = false;

document.addEventListener("keydown", (e) => {
    // if (key)
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

// function stopPacMan() {
//     pacManVelocity = { x: 0, y: 0 };
//     isMoving = false;
// }

// startGame();
