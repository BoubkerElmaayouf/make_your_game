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
       movegostinky()
       movegostblinky()
       movegostpinky()
       movegostclyde()

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
   
function NextMoveGost() {
    const move = ['left', 'right','up','down']
     return move[Math.floor(move.length * Math.random())]
 }
 function checkCollision(X, Y,ghost) {
     const walls = document.querySelectorAll('.wall');
     ghost.style.transform = `translate(${X}px, ${Y}px)`;
     const ghostRect = ghost.getBoundingClientRect();
 
     for (const wall of walls) {
         const wallRect = wall.getBoundingClientRect();
         if (
             ghostRect.left < wallRect.right &&
             ghostRect.right > wallRect.left &&
             ghostRect.top < wallRect.bottom &&
             ghostRect.bottom > wallRect.top
         ) {
             return true;
         }
     }
     return false;
 }
 function movegostpinky() {
     const pinky = document.querySelector('.pinky');
     let speed = 1;
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 if (newX == 55  && newY == 0) {
     newY -= speed
 }else if (move === 'left') {
             newX -= speed;
         } else if (move === 'right') {
             newX += speed;
         } else if (move === 'up') {
             newY -= speed;
         } else if (move === 'down') {
             newY += speed;
         }
 
         if (!checkCollision(newX, newY,pinky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost();
         }
 
         pinky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostblinky() {
     const blinky = document.querySelector('.blinky');
     let speed = 1;
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == -59 && newY == 0) {
             newY -= speed
         }else if (move === 'left') {
             newX -= speed;
         } else if (move === 'right') {
             newX += speed;
         } else if (move === 'up') {
             newY -= speed;
         } else if (move === 'down') {
             newY += speed;
         }
 
         if (!checkCollision(newX, newY,blinky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost();
         }
 
         blinky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostinky() {
     const inky = document.querySelector('.inky');
     let speed = 1;
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == -55  && newY == -40) {
             newY -= speed
         }else  if (move === 'left') {
             newX -= speed;
         } else if (move === 'right') {
             newX += speed;
         } else if (move === 'up') {
             newY -= speed;
         } else if (move === 'down') {
             newY += speed;
         }
 
         if (!checkCollision(newX, newY,inky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost();
         }
 
         inky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostclyde() {
     const clyde = document.querySelector('.clyde');
     let speed = 1;
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == 55  && (newY == -40 || newY == 0)) {
             newY -= speed
         }else if (move === 'left') {
             newX -= speed;
         } else if (move === 'right') {
             newX += speed;
         } else if (move === 'up') {
             newY -= speed;
         } else if (move === 'down') {
             newY += speed;
         }
 
         if (!checkCollision(newX, newY,clyde)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost();
         }
 
         clyde.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }