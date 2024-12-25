// import {ghostMove} from './script.js'
import { createGrid} from "./create_grid.js";
import { movePacMan } from "./move-pac.js";

let startTime = Date.now();
export const scoreDisplay = document.getElementById("score");
export const lifesDisplay = document.getElementById("lifes");
export const  timeDisplay = document.getElementById("Time");
let lifes = 3;
let lastFrameTime = 0;
let animationId;
const speed = 50; // Movement speed in pixels per frame


let score = 0;

function gameLoop(timestamp) {
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
    //    ghostMove()
    //    createGrid();
       const pattern = document.getElementById("pattern");
       pattern.style.display = "none"
       // pacMan.style.transform = `translate( ${pacManPosition.x}px, ${pacManPosition.y}px)`;
       lastFrameTime = performance.now();
       animationId = requestAnimationFrame(gameLoop);
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
}
   
