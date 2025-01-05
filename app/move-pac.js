import {
    scoreDisplay,
    lifesDisplay,
    resite,
    gameLoop,
    updatePositions
} from './start_game.js'

import { animationId, animationIdg } from './start_game.js'

let pacManRotation = 0;
let pacManPosition = { x: 0, y: 0 };
let pacManVelocity = { x: 0, y: 0 };
let score = 0;
export let ghost_dead = false;
let nextDirection = { velocity: { x: 0, y: 0 }, rotation: 0 }; // Track queued direction

let isPaused = false; // Updated variable naming for consistency
const pause = document.getElementById("pause")

pause.addEventListener("click", () => {
    if (!isPaused) {
        cancelAnimationFrame(animationIdg);

        cancelAnimationFrame(animationId);
        isMoving = false; // Stop movement
        isPaused = true; // Update state
        pause.textContent = "Continue"; // Update button text
        console.log("Game Paused");
    } else {
        isMoving = true; // Allow movement again
        isPaused = false; // Update state
        pause.textContent = "Pause";
        requestAnimationFrame(updatePositions);

        requestAnimationFrame(gameLoop);
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
    const ghosts = document.querySelectorAll(".ghost");

    // Store current position
    let currentPosition = { x: pacManPosition.x, y: pacManPosition.y };

    // Helper function to check collisions
    function GameOver() {
        for (const ghost of ghosts) {
            const ghostRect = ghost.getBoundingClientRect();
            const pacManRect = pacMan.getBoundingClientRect();
            if (
                pacManRect.left < ghostRect.right &&
                pacManRect.right > ghostRect.left &&
                pacManRect.top < ghostRect.bottom &&
                pacManRect.bottom > ghostRect.top
            ) {
                return true;
            }
        }
        return false;
    }
    // Temporarily move
    function checkCollision(position) {
        // Temporarily move Pac-Man to test collision
        if (!pacMan) {
            return
        }
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

    if (GameOver() && !ghost_dead) {
        pacMan.style.transform = `translate(0px, 0px) rotate(0deg)`;
        pacManPosition = { x: 0, y: 0 };
        pacManVelocity = { x: 0, y: 0 };
        ghosts.forEach((ghost) => {
            ghost.style.transform = `translate(0px, 0px)`;
        })
        resite()
        pacManRotation = 0;
        lifesDisplay.textContent -= 1;
        if (lifesDisplay.textContent == 0) {
            handleGameOver()
        }
        return;
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
        if (!pacMan) {
            return
        }
        pacMan.style.transform = `translate(${pacManPosition.x}px, ${pacManPosition.y}px) rotate(${pacManRotation}deg)`;

        // Check collectibles
        const pacManRect = pacMan.getBoundingClientRect();
        checkCollectibles(pacManRect);
        if (GameOver() && !ghost_dead) {
            pacMan.style.transform = `translate(0px, 0px) rotate(0deg)`;
            pacManPosition = { x: 0, y: 0 };
            pacManVelocity = { x: 0, y: 0 };
            ghosts.forEach((ghost) => {
                ghost.style.transform = `translate(0px, 0px)`;
            })
            resite()
            pacManRotation = 0;
            lifesDisplay.textContent -= 1;
            if (lifesDisplay.textContent == 0) {
                handleGameOver()
            }
            return;
        }
        return
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
        if (GameOver() && !ghost_dead) {
            pacMan.style.transform = `translate(0px, 0px) rotate(0deg)`;
            pacManPosition = { x: 0, y: 0 };
            pacManVelocity = { x: 0, y: 0 };
            ghosts.forEach((ghost) => {
                ghost.style.transform = `translate(0px, 0px)`;
            })
            resite()
            pacManRotation = 0;
            lifesDisplay.textContent -= 1;
            if (lifesDisplay.textContent == 0) {
               handleGameOver()
            }
            return;
        }
        return
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
            ghost_dead = true;
            const ghosts = document.querySelectorAll(".ghost");
            let ghost_afraid = setTimeout(() => {
                ghosts.forEach((ghost) => {
                    ghost.classList.remove("ghost_dead");
                })
                ghost_dead = false;
            }, 10000);
            ghosts.forEach((ghost) => {
                ghost.classList.add("ghost_dead");

            })
            // Collect power-pellet
            pellet.classList.remove("power-pellet");
            const prize = document.getElementById("prize");
            prize.play();
            score += 50;
            scoreDisplay.textContent = score;
        }
    })


    let pacDots = document.querySelectorAll(".pac-dot");
    if (pacDots) {
        if (pacDots.length === 0 ) {
            const death = document.getElementById("death");
            death.play();
        
            const gameOver = document.querySelectorAll(".grid > div");
            gameOver.forEach((cell) => {
                cell.remove();
            });
        
            const gameOverMessageContainer = document.querySelector(".grid");
            let message = document.createElement("h1");
            message.classList.add("game-over");
            message.textContent = "you win 🥳";
            gameOverMessageContainer.appendChild(message);
        
            const pause = document.getElementById("pause");
            pause.style.display = "none";
            return 
        }
        
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
                const eat_dots = document.getElementById("eat-dots");
                eat_dots.play();
                score += 10;
                scoreDisplay.textContent = score;
            }
        });
    }
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


function handleGameOver() {
    const death = document.getElementById("death");
    death.play();

    const gameOver = document.querySelectorAll(".grid > div");
    gameOver.forEach((cell) => {
        cell.remove();
    });

    const gameOverMessageContainer = document.querySelector(".grid");
    let message = document.createElement("h1");
    message.classList.add("game-over");
    message.textContent = "Game Over";
    gameOverMessageContainer.appendChild(message);

    const pause = document.getElementById("pause");
    pause.style.display = "none";
}
