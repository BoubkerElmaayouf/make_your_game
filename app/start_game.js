import {
    movePacMan,
    ghost_dead,
} from "./move-pac.js";

let startTime = Date.now();
export const scoreDisplay = document.getElementById("score");
export const lifesDisplay = document.getElementById("lifes");
export const timeDisplay = document.getElementById("Time");
export let ghostPositions = {
    pinky: { x: 0, y: 0 },
    inky: { x: 0, y: 0 },
    blinky: { x: 0, y: 0 },
    clyde: { x: 0, y: 0 }
};

let lifes = 3;
let lastFrameTime = 0;
export let animationId;
const speed = 50; // Movement speed in pixels per frame
let speedghost = 2;
let score = 0;
export let animationIdg

export function resite() {
    Object.keys(ghostPositions).forEach(ghost => ghostPositions[ghost] = { x: 0, y: 0 });
}

export function gameLoop(timestamp) {
    const deltaTime = timestamp - lastFrameTime;

    if (deltaTime >= speed) {
        movePacMan();
        updateTime();
        lastFrameTime = timestamp;
    }

    animationId = requestAnimationFrame(gameLoop);
}

export function startGame() {
    scoreDisplay.textContent = score;
    lifesDisplay.textContent = lifes;
    timeDisplay.textContent = 0;


    const pattern = document.getElementById("pattern");
    pattern.style.display = "none";

    lastFrameTime = performance.now();
    animationIdg = requestAnimationFrame(updatePositions);
    animationId = requestAnimationFrame(gameLoop);

}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
}

function getRandomMove(previousMove) {
    const oppositeMoves = {
        left: ['up', 'down'],
        right: ['up', 'down'],
        up: ['left', 'right'],
        down: ['left', 'right']
    };

    return previousMove ? oppositeMoves[previousMove][Math.floor(Math.random() * 2)] : ['left', 'right', 'up', 'down'][Math.floor(Math.random() * 4)];
}

function checkCollision(x, y, ghost) {
    const walls = document.querySelectorAll('.wall');
    ghost.style.transform = `translate(${x}px, ${y}px)`;
    const ghostRect = ghost.getBoundingClientRect();

    return Array.from(walls).some(wall => {
        const wallRect = wall.getBoundingClientRect();
        return (
            ghostRect.left < wallRect.right &&
            ghostRect.right > wallRect.left &&
            ghostRect.top < wallRect.bottom &&
            ghostRect.bottom > wallRect.top
        );
    });
}

function isGhostDead(ghost) {
    const pacMan = document.querySelector('.pac-man');
    const ghostRect = ghost.getBoundingClientRect();
    const pacManRect = pacMan.getBoundingClientRect();

    return (
        pacManRect.left < ghostRect.right &&
        pacManRect.right > ghostRect.left &&
        pacManRect.top < ghostRect.bottom &&
        pacManRect.bottom > ghostRect.top
    );
}

export let ghostMoves = {
    pinky: null,
    inky: null,
    blinky: null,
    clyde: null,
};

export function updatePositions() {
    const ghostNames = Object.keys(ghostPositions);

    ghostNames.forEach((ghostName) => {

        const ghost = document.querySelector(`.${ghostName}`);
        if (!ghost) {
            return
        }
        let move = ghostMoves[ghostName] || getRandomMove(); // Use the ghost's last move or get a new one.

        let { x, y } = ghostPositions[ghostName];

        switch (move) {
            case 'left': x -= speedghost; break;
            case 'right': x += speedghost; break;
            case 'up': y -= speedghost; break;
            case 'down': y += speedghost; break;
        }

        if (!checkCollision(x, y, ghost)) {
            ghostPositions[ghostName] = { x, y };
            ghostMoves[ghostName] = move; // Save the successful move.
        } else {
            ghostMoves[ghostName] = getRandomMove(move); // Get a new move if collision occurs.
        }

        if (isGhostDead(ghost) && ghost_dead) {
            ghostPositions[ghostName] = { x: 0, y: 0 };
        }

        ghost.style.transform = `translate(${ghostPositions[ghostName].x}px, ${ghostPositions[ghostName].y}px)`;
    });

    animationIdg = requestAnimationFrame(updatePositions);
}
